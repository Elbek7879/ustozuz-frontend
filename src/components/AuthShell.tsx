import Image from "next/image";
import { CheckCircle2, Quote } from "lucide-react";
import Header from "@/components/Header";

export const authInputClass =
  "w-full border border-gray-300 rounded-xl px-4 py-3 text-sm bg-white placeholder:text-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition";

export const authButtonClass =
  "w-full bg-indigo-700 text-white font-semibold py-3 rounded-xl hover:bg-indigo-800 active:scale-[0.99] disabled:opacity-60 transition";

const benefits = [
  "Tajribali ustozlardan amaliy kurslar",
  "O'zingizga qulay vaqtda, istalgan qurilmadan",
  "Kursni tugatgach — shaxsiy sertifikat",
];

// Kirish, ro'yxatdan o'tish va parolni tiklash sahifalari uchun umumiy ko'rinish
export default function AuthShell({ children }: { children: React.ReactNode }) {
  return (
    <main>
      <Header />

      <section className="flex-1 grid lg:grid-cols-2">
        <div className="hidden lg:flex relative overflow-hidden flex-col justify-between bg-gradient-to-br from-indigo-700 via-indigo-600 to-purple-700 p-12 xl:p-16 text-white">
          <div className="pointer-events-none absolute -top-32 -right-32 w-96 h-96 rounded-full bg-white/10 blur-2xl" />
          <div className="pointer-events-none absolute -bottom-40 -left-20 w-[28rem] h-[28rem] rounded-full bg-purple-400/20 blur-3xl" />

          <div className="relative">
            <h2 className="text-4xl xl:text-5xl font-extrabold leading-tight tracking-tight max-w-md">
              Bilim — eng yaxshi sarmoya
            </h2>
            <p className="mt-4 text-indigo-100 text-lg max-w-md">
              O&apos;zbekistondagi tajribali ustozlar bilan yangi kasb va ko&apos;nikmalarni egallang.
            </p>

            <ul className="mt-10 space-y-4">
              {benefits.map((b) => (
                <li key={b} className="flex items-center gap-3 text-indigo-50">
                  <CheckCircle2 className="w-5 h-5 text-emerald-300 shrink-0" />
                  {b}
                </li>
              ))}
            </ul>
          </div>

          <figure className="relative mt-12 rounded-2xl bg-white/10 backdrop-blur-sm ring-1 ring-white/20 p-6 max-w-md">
            <Quote className="w-6 h-6 text-indigo-200" />
            <blockquote className="mt-3 text-sm leading-relaxed text-indigo-50">
              Darslar tushunarli va amaliy topshiriqlarga boy edi. Uch oy ichida birinchi
              loyihamni yakunlab, ishga topshira oldim.
            </blockquote>
            <figcaption className="mt-5 flex items-center gap-3">
              <Image
                src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&h=80&fit=crop&q=80"
                alt=""
                width={40}
                height={40}
                className="w-10 h-10 rounded-full object-cover ring-2 ring-white/40"
              />
              <div>
                <p className="text-sm font-semibold">Madina Karimova</p>
                <p className="text-xs text-indigo-200">Frontend dasturchi</p>
              </div>
            </figcaption>
          </figure>
        </div>

        <div className="flex items-center justify-center px-6 py-12 sm:py-16 bg-white">
          <div className="w-full max-w-md">{children}</div>
        </div>
      </section>
    </main>
  );
}
