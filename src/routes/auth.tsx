import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { z } from "zod";

import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/auth")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Masuk Pengelola — Undangan Amany & Dio" },
      {
        name: "description",
        content: "Halaman masuk pengelola untuk mengelola kehadiran, doa, dan pembagian undangan.",
      },
      { property: "og:title", content: "Masuk Pengelola — Undangan Amany & Dio" },
      {
        property: "og:description",
        content: "Halaman masuk pengelola undangan pernikahan Amany & Dio.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AuthPage,
});

const schema = z.object({
  email: z.string().trim().email({ message: "Email tidak valid" }).max(255),
  password: z.string().min(6, { message: "Kata sandi minimal 6 karakter" }).max(72),
});

function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"masuk" | "daftar">("masuk");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");

  useEffect(() => {
    void supabase.auth.getUser().then(({ data }) => {
      if (data.user) void navigate({ to: "/dashboard", replace: true });
    });
  }, [navigate]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setInfo("");
    const parsed = schema.safeParse({ email, password });
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Data tidak valid");
      return;
    }
    setBusy(true);
    try {
      if (mode === "daftar") {
        const { data, error: signUpError } = await supabase.auth.signUp({
          email: parsed.data.email,
          password: parsed.data.password,
          options: { emailRedirectTo: window.location.origin + "/auth" },
        });
        if (signUpError) throw signUpError;
        if (!data.session) {
          setInfo("Akun dibuat. Silakan cek email Anda untuk konfirmasi, lalu masuk.");
          return;
        }
      } else {
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email: parsed.data.email,
          password: parsed.data.password,
        });
        if (signInError) throw signInError;
      }
      await supabase.rpc("claim_admin");
      await navigate({ to: "/dashboard", replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Gagal masuk");
    } finally {
      setBusy(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F4EBDD] px-5 py-16">
      <div className="w-full max-w-sm border border-[#C7A35A]/50 bg-white/70 px-6 py-10 shadow-lg">
        <p className="text-center font-sans text-[0.55rem] tracking-[0.35em] uppercase text-[#8A5A35]">
          Dashboard Pengelola
        </p>
        <h1 className="mt-3 text-center font-serif text-2xl text-[#5A3825]">
          {mode === "masuk" ? "Masuk" : "Daftar Akun"}
        </h1>

        <form onSubmit={submit} className="mt-8 space-y-5">
          <label className="block">
            <span className="font-sans text-[0.55rem] tracking-[0.25em] uppercase text-[#8A5A35]">
              Email
            </span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              className="mt-2 w-full border-b border-[#C7A35A]/50 bg-transparent px-1 py-2 text-sm text-[#5A3825] focus:border-[#C7A35A] focus:outline-none"
            />
          </label>
          <label className="block">
            <span className="font-sans text-[0.55rem] tracking-[0.25em] uppercase text-[#8A5A35]">
              Kata Sandi
            </span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete={mode === "masuk" ? "current-password" : "new-password"}
              className="mt-2 w-full border-b border-[#C7A35A]/50 bg-transparent px-1 py-2 text-sm text-[#5A3825] focus:border-[#C7A35A] focus:outline-none"
            />
          </label>

          {error ? <p className="text-xs text-red-700">{error}</p> : null}
          {info ? <p className="text-xs text-[#8A5A35]">{info}</p> : null}

          <button
            type="submit"
            disabled={busy}
            className="w-full border border-[#C7A35A] bg-[#5A3825] px-5 py-3 font-sans text-[0.6rem] tracking-[0.25em] uppercase text-[#F4EBDD] transition-opacity disabled:opacity-50"
          >
            {busy ? "Memproses…" : mode === "masuk" ? "Masuk" : "Daftar"}
          </button>
        </form>

        <button
          type="button"
          onClick={() => {
            setMode(mode === "masuk" ? "daftar" : "masuk");
            setError("");
            setInfo("");
          }}
          className="mt-6 w-full text-center font-sans text-[0.6rem] tracking-wide uppercase text-[#8A5A35] underline"
        >
          {mode === "masuk" ? "Belum punya akun? Daftar" : "Sudah punya akun? Masuk"}
        </button>
      </div>
    </main>
  );
}
