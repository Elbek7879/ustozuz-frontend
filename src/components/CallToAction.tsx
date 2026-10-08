import Link from "next/link";
import { ArrowRight, GraduationCap } from "lucide-react";

// Footer oldidagi yakuniy chaqiruv: talaba bo'lish yoki ustoz bo'lish
export default function CallToAction() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-16 md:py-20">
      <div className="relative overflow-hidden rounded-[2rem] bg-gray-950 px-6 py-12 md:px-16 md:py-16">
        <div className="pointer-events-none absolute -top-24 -left-24 w-96 h-96 rounded-full bg-indigo-600/40 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 right-0 w-[28rem] h-[28rem] rounded-full bg-purple-600/30 blur-3xl" />

        <div className="relative grid lg:grid-cols-[1.4fr_1fr] gap-10 items-center">
          <div>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
              O&apos;rganishni{" "}
              <span className="bg-gradient-to-r from-indigo-300 to-purple-300 bg-clip-text text-transparent">
                bugun
              </span>{" "}
              boshlang
            </h2>
            <p className="mt-4 text-gray-300 text-lg max-w-xl">
              Ro&apos;yxatdan o&apos;ting, o&apos;zingizga yoqqan kursni tanlang va birinchi darsni hoziroq
              o&apos;ting.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 mt-8">
              <Link
                href="/royxatdan-otish"
                className="group inline-flex items-center justify-center gap-2 bg-white text-gray-900 font-semibold px-6 py-3.5 rounded-xl hover:bg-indigo-50 transition"
              >
                Bepul ro&apos;yxatdan o&apos;tish
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <Link
                href="/kurslar"
                className="inline-flex items-center justify-center bg-white/10 text-white font-semibold px-6 py-3.5 rounded-xl ring-1 ring-white/20 hover:bg-white/15 transition"
              >
                Kurslarni ko&apos;rish
              </Link>
            </div>
          </div>

          <Link
            href="/ustoz-bolish"
            className="group block rounded-3xl bg-white/5 ring-1 ring-white/15 backdrop-blur p-7 hover:bg-white/10 transition"
          >
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <p className="mt-5 text-xl font-bold text-white">Ustoz bo&apos;ling</p>
            <p className="mt-2 text-sm text-gray-300 leading-relaxed">
              Bilimingizni minglab talabalar bilan ulashing va har bir sotilgan kursdan daromad oling.
            </p>
            <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-amber-300">
              Batafsil
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
