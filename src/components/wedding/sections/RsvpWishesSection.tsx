import { AnimatePresence, motion } from "motion/react";
import { Check, Send } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { silk, viewportOnce } from "@/lib/motion-variants";
import { cn } from "@/lib/utils";
import {
  BatikPattern,
  CornerOrnament,
  MelatiField,
  OrnamentalDivider,
} from "../JavaneseOrnaments";
import { OrnateButton, SectionTitle } from "../primitives";

type Attendance = "hadir" | "ragu" | "tidak";

type Wish = {
  id: number;
  name: string;
  attendance: Attendance;
  guests: number;
  message: string;
};

const ATTENDANCE_LABEL: Record<Attendance, string> = {
  hadir: "Insya Allah Hadir",
  ragu: "Masih Ragu",
  tidak: "Belum Bisa Hadir",
};

const INITIAL_WISHES: Wish[] = [
  {
    id: 1,
    name: "Keluarga Wirasmara",
    attendance: "hadir",
    guests: 2,
    message:
      "Sugeng pinanggih ing dinten kabagyan. Mugi tansah rukun, ayem, lan tentrem dumugi kaken-kaken ninen-ninen.",
  },
  {
    id: 2,
    name: "Dwi & Ratna",
    attendance: "hadir",
    guests: 2,
    message:
      "Barakallahu lakuma. Selamat menempuh hidup baru, semoga menjadi keluarga yang sakinah mawaddah warahmah.",
  },
  {
    id: 3,
    name: "Bayu Kusuma",
    attendance: "ragu",
    guests: 1,
    message:
      "Turut berbahagia untuk kalian berdua. Semoga selalu diliputi kebaikan dan keberkahan.",
  },
];

export function RsvpWishesSection() {
  const [wishes, setWishes] = useState<Wish[]>(INITIAL_WISHES);
  const [name, setName] = useState("");
  const [attendance, setAttendance] = useState<Attendance>("hadir");
  const [guests, setGuests] = useState(1);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<{ name?: string; message?: string }>({});
  const [shake, setShake] = useState(0);
  const [success, setSuccess] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const next: { name?: string; message?: string } = {};
    if (name.trim().length < 2) next.name = "Mohon isi nama Anda.";
    if (message.trim().length < 4) next.message = "Mohon tuliskan ucapan atau doa.";
    setErrors(next);
    if (Object.keys(next).length) {
      setShake((s) => s + 1);
      return;
    }

    setWishes((prev) => [
      {
        id: Date.now(),
        name: name.trim(),
        attendance,
        guests,
        message: message.trim(),
      },
      ...prev,
    ]);
    setSuccess(true);
    toast.success("Matur nuwun, konfirmasi Anda telah kami terima.");
    setName("");
    setMessage("");
    setGuests(1);
    window.setTimeout(() => setSuccess(false), 2600);
  };

  return (
    <section
      aria-label="Konfirmasi kehadiran dan ucapan"
      className="relative isolate overflow-hidden surface-paper paper-grain vignette-paper px-5 py-20 sm:px-8 sm:py-28"
    >
      <BatikPattern variant="truntum" opacity={0.05} className="mask-fade-edges" />
      <MelatiField count={5} tone="sogan" className="opacity-35" />

      <div className="relative mx-auto max-w-3xl">
        <SectionTitle
          eyebrow="Konfirmasi Rawuh"
          title="Rawuh & Pangestu"
          subtitle="Mangga paring pawartos rawuh panjenengan — mohon konfirmasi kehadiran dan sampaikan doa untuk kami."
        />

        <motion.form
          onSubmit={submit}
          key={shake}
          animate={
            Object.keys(errors).length && shake
              ? { x: [0, -8, 8, -5, 5, 0] }
              : { x: 0 }
          }
          transition={{ duration: 0.45 }}
          initial={false}
          className="relative mt-16 border border-gold/40 bg-ivory/95 px-5 py-10 shadow-ornate sm:px-10 sm:py-12"
        >
          <div aria-hidden="true" className="absolute -left-2 -top-2 size-9 text-gold/70">
            <CornerOrnament />
          </div>
          <div aria-hidden="true" className="absolute -right-2 -bottom-2 size-9 text-gold/70">
            <CornerOrnament flipX flipY />
          </div>

          <div className="space-y-6">
            <Field label="Nama" error={errors.name}>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nama lengkap Anda"
                aria-invalid={Boolean(errors.name)}
                className="w-full border-b border-gold/35 bg-transparent px-1 py-2.5 font-sans text-sm text-java-brown transition-colors placeholder:text-muted-clay/60 focus:border-gold focus:outline-none"
              />
            </Field>

            <fieldset>
              <legend className="font-sans text-[0.55rem] tracking-royal uppercase text-sogan">
                Konfirmasi Kehadiran
              </legend>
              <div className="mt-3 flex flex-wrap gap-2">
                {(Object.keys(ATTENDANCE_LABEL) as Attendance[]).map((key) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setAttendance(key)}
                    aria-pressed={attendance === key}
                    className={cn(
                      "border px-4 py-2 font-sans text-[0.55rem] tracking-wide-sm uppercase transition-all duration-500",
                      attendance === key
                        ? "border-gold bg-gold/12 text-java-brown"
                        : "border-gold/30 text-muted-clay hover:border-gold/60",
                    )}
                  >
                    {ATTENDANCE_LABEL[key]}
                  </button>
                ))}
              </div>
            </fieldset>

            <Field label="Jumlah Tamu">
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={() => setGuests((g) => Math.max(1, g - 1))}
                  aria-label="Kurangi jumlah tamu"
                  className="size-9 border border-gold/40 text-sogan transition-colors hover:border-gold"
                >
                  −
                </button>
                <span className="font-display text-2xl text-java-brown">{guests}</span>
                <button
                  type="button"
                  onClick={() => setGuests((g) => Math.min(10, g + 1))}
                  aria-label="Tambah jumlah tamu"
                  className="size-9 border border-gold/40 text-sogan transition-colors hover:border-gold"
                >
                  +
                </button>
              </div>
            </Field>

            <Field label="Ucapan & Doa" error={errors.message}>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
                placeholder="Tuliskan ucapan dan doa untuk kami"
                aria-invalid={Boolean(errors.message)}
                className="w-full resize-none border border-gold/30 bg-transparent px-3 py-3 font-sans text-sm text-java-brown transition-colors placeholder:text-muted-clay/60 focus:border-gold focus:outline-none"
              />
            </Field>

            <div className="flex justify-center pt-2">
              <OrnateButton type="submit" tone="solid" ariaLabel="Kirim konfirmasi kehadiran">
                <AnimatePresence mode="wait" initial={false}>
                  {success ? (
                    <motion.span
                      key="ok"
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={silk(0.4)}
                      className="flex items-center gap-2"
                    >
                      <Check className="size-3.5" /> Terkirim
                    </motion.span>
                  ) : (
                    <motion.span
                      key="send"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-2"
                    >
                      <Send className="size-3.5" strokeWidth={1.5} /> Kirim Konfirmasi
                    </motion.span>
                  )}
                </AnimatePresence>
              </OrnateButton>
            </div>
          </div>
        </motion.form>

        {/* Wishes */}
        <div className="mt-20">
          <SectionTitle eyebrow="Ucapan & Doa" title="Kidung Pangestu" />
          <div className="mt-10 max-h-[28rem] space-y-4 overflow-y-auto pr-1 no-scrollbar">
            <AnimatePresence initial={false}>
              {wishes.map((wish) => (
                <motion.article
                  key={wish.id}
                  layout
                  initial={{ opacity: 0, y: 26, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  viewport={viewportOnce}
                  transition={silk(0.7)}
                  className="relative overflow-hidden border border-gold/30 bg-ivory/90 px-5 py-5 paper-grain"
                >
                  <BatikPattern variant="kawung" opacity={0.05} />
                  <div className="relative flex flex-wrap items-center justify-between gap-2">
                    <h3 className="font-serif text-sm tracking-wide-sm text-java-brown">
                      {wish.name}
                    </h3>
                    <span className="border border-gold/40 px-2.5 py-1 font-sans text-[0.48rem] tracking-wide-sm uppercase text-sogan">
                      {ATTENDANCE_LABEL[wish.attendance]} · {wish.guests} tamu
                    </span>
                  </div>
                  <p className="relative mt-3 font-sans text-[0.76rem] leading-relaxed text-muted-clay">
                    {wish.message}
                  </p>
                </motion.article>
              ))}
            </AnimatePresence>
          </div>
          <OrnamentalDivider className="mt-10" />
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string | undefined;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="font-sans text-[0.55rem] tracking-royal uppercase text-sogan">
        {label}
      </span>
      <div className="mt-3">{children}</div>
      <AnimatePresence>
        {error ? (
          <motion.span
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-2 block font-sans text-[0.62rem] text-destructive"
          >
            {error}
          </motion.span>
        ) : null}
      </AnimatePresence>
    </label>
  );
}
