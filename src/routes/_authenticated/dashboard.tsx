import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Toaster, toast } from "sonner";

import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/_authenticated/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard Undangan — Amany & Dio" },
      {
        name: "description",
        content:
          "Kelola konfirmasi kehadiran, ucapan & doa, serta bagikan undangan personal ke daftar tamu.",
      },
      { property: "og:title", content: "Dashboard Undangan — Amany & Dio" },
      {
        property: "og:description",
        content: "Kelola kehadiran, doa, dan pembagian undangan pernikahan Amany & Dio.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Dashboard,
});

type Rsvp = {
  id: string;
  name: string;
  attendance: string;
  guests: number;
  message: string;
  created_at: string;
};

type Guest = {
  id: string;
  name: string;
  phone: string | null;
  sent: boolean;
  created_at: string;
};

const LABEL: Record<string, string> = {
  hadir: "Insya Allah Hadir",
  ragu: "Masih Ragu",
  tidak: "Belum Bisa Hadir",
};

const SITE_URL = "https://amanydio.lovable.app";

function inviteLink(name: string, base: string) {
  return `${base.replace(/\/+$/, "")}/?to=${encodeURIComponent(name)}`;
}

function normalizePhone(raw: string) {
  const digits = raw.replace(/[^\d]/g, "");
  if (!digits) return "";
  if (digits.startsWith("62")) return digits;
  if (digits.startsWith("0")) return "62" + digits.slice(1);
  return digits;
}

function downloadCsv(filename: string, rows: string[][]) {
  const csv = rows
    .map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(","))
    .join("\r\n");
  const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

function Dashboard() {
  const navigate = useNavigate();
  const [tab, setTab] = useState<"rsvp" | "tamu">("rsvp");
  const [rsvps, setRsvps] = useState<Rsvp[]>([]);
  const [guests, setGuests] = useState<Guest[]>([]);
  const [loading, setLoading] = useState(true);
  const [bulk, setBulk] = useState("");
  const [base, setBase] = useState(SITE_URL);

  const load = useCallback(async () => {
    setLoading(true);
    const [{ data: r }, { data: g }] = await Promise.all([
      supabase.from("rsvp_entries").select("*").order("created_at", { ascending: false }),
      supabase.from("guest_invites").select("*").order("created_at", { ascending: true }),
    ]);
    setRsvps((r ?? []) as Rsvp[]);
    setGuests((g ?? []) as Guest[]);
    setLoading(false);
  }, []);

  useEffect(() => {
    void supabase.rpc("claim_admin").then(() => load());
    if (typeof window !== "undefined" && !window.location.hostname.includes("localhost")) {
      setBase(window.location.origin);
    }
  }, [load]);

  const stats = useMemo(() => {
    const total = rsvps.length;
    const hadir = rsvps.filter((r) => r.attendance === "hadir");
    return {
      total,
      hadir: hadir.length,
      ragu: rsvps.filter((r) => r.attendance === "ragu").length,
      tidak: rsvps.filter((r) => r.attendance === "tidak").length,
      orang: hadir.reduce((s, r) => s + r.guests, 0),
    };
  }, [rsvps]);

  const signOut = async () => {
    await supabase.auth.signOut();
    await navigate({ to: "/auth", replace: true });
  };

  const removeRsvp = async (id: string) => {
    const { error } = await supabase.from("rsvp_entries").delete().eq("id", id);
    if (error) {
      toast.error("Gagal menghapus data.");
      return;
    }
    setRsvps((prev) => prev.filter((r) => r.id !== id));
    toast.success("Data dihapus.");
  };

  const exportRsvp = () => {
    downloadCsv("kehadiran-dan-doa.csv", [
      ["Waktu", "Nama", "Kehadiran", "Jumlah Tamu", "Ucapan & Doa"],
      ...rsvps.map((r) => [
        new Date(r.created_at).toLocaleString("id-ID"),
        r.name,
        LABEL[r.attendance] ?? r.attendance,
        String(r.guests),
        r.message,
      ]),
    ]);
  };

  const exportGuests = () => {
    downloadCsv("daftar-tamu-undangan.csv", [
      ["Nama Tamu", "Nomor WhatsApp", "Sudah Dibagikan", "Tautan Undangan"],
      ...guests.map((g) => [
        g.name,
        g.phone ?? "",
        g.sent ? "Ya" : "Belum",
        inviteLink(g.name, base),
      ]),
    ]);
  };

  const addBulk = async () => {
    const rows = bulk
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line) => {
        const parts = line.split(/[,;\t|]/);
        const name = (parts[0] ?? "").trim().slice(0, 100);
        const phone = normalizePhone(parts[1] ?? "");
        return { name, phone: phone || null };
      })
      .filter((row) => row.name.length >= 2);

    if (!rows.length) {
      toast.error("Belum ada nama tamu yang valid.");
      return;
    }
    const { error } = await supabase.from("guest_invites").insert(rows);
    if (error) {
      toast.error("Gagal menyimpan daftar tamu.");
      return;
    }
    setBulk("");
    toast.success(`${rows.length} tamu ditambahkan.`);
    await load();
  };

  const markSent = async (guest: Guest, sent: boolean) => {
    await supabase.from("guest_invites").update({ sent }).eq("id", guest.id);
    setGuests((prev) => prev.map((g) => (g.id === guest.id ? { ...g, sent } : g)));
  };

  const removeGuest = async (id: string) => {
    await supabase.from("guest_invites").delete().eq("id", id);
    setGuests((prev) => prev.filter((g) => g.id !== id));
  };

  const shareWhatsapp = (guest: Guest) => {
    const link = inviteLink(guest.name, base);
    const text = `Assalamu'alaikum, ${guest.name}.\n\nDengan penuh rasa syukur, kami mengundang Anda untuk menghadiri pernikahan kami, Amany & Dio.\n\nDetail undangan dapat dilihat di tautan berikut:\n${link}\n\nMerupakan suatu kehormatan apabila Anda berkenan hadir dan memberikan doa restu.\n\nTerima kasih.`;
    const phone = normalizePhone(guest.phone ?? "");
    const url = phone
      ? `https://wa.me/${phone}?text=${encodeURIComponent(text)}`
      : `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank", "noopener,noreferrer");
    void markSent(guest, true);
  };

  const copyAllLinks = async () => {
    const text = guests.map((g) => `${g.name}: ${inviteLink(g.name, base)}`).join("\n");
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Semua tautan undangan disalin.");
    } catch {
      toast.error("Gagal menyalin.");
    }
  };

  return (
    <main className="min-h-screen bg-[#F4EBDD] px-4 py-10 sm:px-8">
      <Toaster position="top-center" />
      <div className="mx-auto max-w-5xl">
        <header className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-sans text-[0.55rem] tracking-[0.35em] uppercase text-[#8A5A35]">
              Dashboard Pengelola
            </p>
            <h1 className="mt-2 font-serif text-3xl text-[#5A3825]">Amany &amp; Dio</h1>
          </div>
          <button
            onClick={signOut}
            className="border border-[#C7A35A] px-4 py-2 font-sans text-[0.55rem] tracking-[0.2em] uppercase text-[#8A5A35]"
          >
            Keluar
          </button>
        </header>

        <section className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-5">
          {[
            ["Total Konfirmasi", stats.total],
            ["Hadir", stats.hadir],
            ["Masih Ragu", stats.ragu],
            ["Tidak Hadir", stats.tidak],
            ["Perkiraan Orang", stats.orang],
          ].map(([label, value]) => (
            <div key={String(label)} className="border border-[#C7A35A]/45 bg-white/60 px-4 py-4">
              <p className="font-sans text-[0.5rem] tracking-[0.2em] uppercase text-[#8A5A35]">
                {label}
              </p>
              <p className="mt-2 font-serif text-2xl text-[#5A3825]">{value}</p>
            </div>
          ))}
        </section>

        <nav className="mt-8 flex gap-2">
          {(["rsvp", "tamu"] as const).map((key) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              className={`border px-4 py-2 font-sans text-[0.55rem] tracking-[0.2em] uppercase ${
                tab === key
                  ? "border-[#C7A35A] bg-[#C7A35A]/20 text-[#5A3825]"
                  : "border-[#C7A35A]/40 text-[#8A5A35]"
              }`}
            >
              {key === "rsvp" ? "Kehadiran & Doa" : "Bagikan Undangan"}
            </button>
          ))}
        </nav>

        {loading ? (
          <p className="mt-10 font-sans text-xs text-[#8A5A35]">Memuat data…</p>
        ) : tab === "rsvp" ? (
          <section className="mt-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="font-serif text-xl text-[#5A3825]">Data Kehadiran &amp; Doa</h2>
              <button
                onClick={exportRsvp}
                disabled={!rsvps.length}
                className="border border-[#C7A35A] bg-[#5A3825] px-4 py-2 font-sans text-[0.55rem] tracking-[0.2em] uppercase text-[#F4EBDD] disabled:opacity-40"
              >
                Export CSV
              </button>
            </div>

            <div className="mt-4 overflow-x-auto border border-[#C7A35A]/40 bg-white/60">
              <table className="w-full min-w-[720px] text-left">
                <thead>
                  <tr className="border-b border-[#C7A35A]/40 font-sans text-[0.5rem] tracking-[0.2em] uppercase text-[#8A5A35]">
                    <th className="px-4 py-3">Waktu</th>
                    <th className="px-4 py-3">Nama</th>
                    <th className="px-4 py-3">Kehadiran</th>
                    <th className="px-4 py-3">Tamu</th>
                    <th className="px-4 py-3">Ucapan &amp; Doa</th>
                    <th className="px-4 py-3" />
                  </tr>
                </thead>
                <tbody>
                  {rsvps.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-4 py-8 text-center text-xs text-[#8A5A35]">
                        Belum ada konfirmasi kehadiran.
                      </td>
                    </tr>
                  ) : (
                    rsvps.map((r) => (
                      <tr key={r.id} className="border-b border-[#C7A35A]/20 text-[#5A3825]">
                        <td className="px-4 py-3 text-[0.7rem] text-[#8A5A35]">
                          {new Date(r.created_at).toLocaleString("id-ID")}
                        </td>
                        <td className="px-4 py-3 text-sm font-semibold">{r.name}</td>
                        <td className="px-4 py-3 text-[0.7rem]">
                          {LABEL[r.attendance] ?? r.attendance}
                        </td>
                        <td className="px-4 py-3 text-sm">{r.guests}</td>
                        <td className="max-w-xs px-4 py-3 text-[0.75rem]">{r.message}</td>
                        <td className="px-4 py-3">
                          <button
                            onClick={() => void removeRsvp(r.id)}
                            className="font-sans text-[0.55rem] uppercase text-red-700 underline"
                          >
                            Hapus
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </section>
        ) : (
          <section className="mt-6 space-y-8">
            <div className="border border-[#C7A35A]/40 bg-white/60 px-5 py-6">
              <h2 className="font-serif text-xl text-[#5A3825]">Tambah Tamu Massal</h2>
              <p className="mt-2 font-sans text-[0.7rem] text-[#8A5A35]">
                Satu tamu per baris, format: <em>Nama, 08123456789</em>. Nomor boleh dikosongkan.
              </p>
              <textarea
                value={bulk}
                onChange={(e) => setBulk(e.target.value)}
                rows={6}
                placeholder={"Bapak Rezki Suryana, 081234567890\nIbu Sri Wahyuni, 08987654321"}
                className="mt-4 w-full resize-none border border-[#C7A35A]/40 bg-transparent px-3 py-3 text-sm text-[#5A3825] focus:border-[#C7A35A] focus:outline-none"
              />
              <label className="mt-4 block">
                <span className="font-sans text-[0.5rem] tracking-[0.2em] uppercase text-[#8A5A35]">
                  Alamat undangan
                </span>
                <input
                  value={base}
                  onChange={(e) => setBase(e.target.value)}
                  className="mt-2 w-full border-b border-[#C7A35A]/40 bg-transparent px-1 py-2 text-sm text-[#5A3825] focus:border-[#C7A35A] focus:outline-none"
                />
              </label>
              <div className="mt-5 flex flex-wrap gap-3">
                <button
                  onClick={() => void addBulk()}
                  className="border border-[#C7A35A] bg-[#5A3825] px-4 py-2 font-sans text-[0.55rem] tracking-[0.2em] uppercase text-[#F4EBDD]"
                >
                  Simpan Daftar Tamu
                </button>
                <button
                  onClick={() => void copyAllLinks()}
                  disabled={!guests.length}
                  className="border border-[#C7A35A] px-4 py-2 font-sans text-[0.55rem] tracking-[0.2em] uppercase text-[#8A5A35] disabled:opacity-40"
                >
                  Salin Semua Tautan
                </button>
                <button
                  onClick={exportGuests}
                  disabled={!guests.length}
                  className="border border-[#C7A35A] px-4 py-2 font-sans text-[0.55rem] tracking-[0.2em] uppercase text-[#8A5A35] disabled:opacity-40"
                >
                  Export CSV
                </button>
              </div>
            </div>

            <div className="overflow-x-auto border border-[#C7A35A]/40 bg-white/60">
              <table className="w-full min-w-[720px] text-left">
                <thead>
                  <tr className="border-b border-[#C7A35A]/40 font-sans text-[0.5rem] tracking-[0.2em] uppercase text-[#8A5A35]">
                    <th className="px-4 py-3">Nama Tamu</th>
                    <th className="px-4 py-3">WhatsApp</th>
                    <th className="px-4 py-3">Tautan Personal</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3" />
                  </tr>
                </thead>
                <tbody>
                  {guests.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-4 py-8 text-center text-xs text-[#8A5A35]">
                        Belum ada daftar tamu.
                      </td>
                    </tr>
                  ) : (
                    guests.map((g) => (
                      <tr key={g.id} className="border-b border-[#C7A35A]/20 text-[#5A3825]">
                        <td className="px-4 py-3 text-sm font-semibold">{g.name}</td>
                        <td className="px-4 py-3 text-[0.72rem]">{g.phone ?? "—"}</td>
                        <td className="max-w-[260px] truncate px-4 py-3 text-[0.7rem] text-[#8A5A35]">
                          <a href={inviteLink(g.name, base)} target="_blank" rel="noreferrer">
                            {inviteLink(g.name, base)}
                          </a>
                        </td>
                        <td className="px-4 py-3 text-[0.65rem]">
                          {g.sent ? "Terkirim" : "Belum"}
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex flex-wrap gap-3">
                            <button
                              onClick={() => shareWhatsapp(g)}
                              className="border border-[#C7A35A] px-3 py-1.5 font-sans text-[0.5rem] tracking-[0.15em] uppercase text-[#5A3825]"
                            >
                              Kirim WA
                            </button>
                            <button
                              onClick={async () => {
                                await navigator.clipboard.writeText(inviteLink(g.name, base));
                                toast.success("Tautan disalin.");
                              }}
                              className="font-sans text-[0.5rem] uppercase text-[#8A5A35] underline"
                            >
                              Salin
                            </button>
                            <button
                              onClick={() => void removeGuest(g.id)}
                              className="font-sans text-[0.5rem] uppercase text-red-700 underline"
                            >
                              Hapus
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
