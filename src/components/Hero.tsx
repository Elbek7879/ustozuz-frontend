import Image from "next/image";
import Link from "next/link";
import { Award, PlayCircle, Sparkles, Star, Users } from "lucide-react";
import HeroSearch from "@/components/HeroSearch";
import { getPublicStats } from "@/lib/api";
import { formatNumber } from "@/lib/format";

const avatars = [
  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&h=80&fit=crop&q=80",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&q=80",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&q=80",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&q=80",
];

export default async function Hero() {
  const stats = await getPublicStats();

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-indigo-50/80 via-white to-white">
      {/* Fondagi yumshoq rangli dog'lar */}
      <div className="pointer-events-none absolute -top-24 -left-24 w-96 h-96 rounded-full bg-indigo-200/40 blur-3xl" />
      <div className="pointer-events-none absolute top-20 right-0 w-96 h-96 rounded-full bg-purple-200/40 blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-6 pt-12 pb-16 md:pt-16 md:pb-24 grid lg:grid-cols-[1.1fr_1fr] gap-12 items-center">
        <div>
          <span className="inline-flex items-center gap-2 text-xs font-semibold text-indigo-700 bg-indigo-100/80 px-3 py-1.5 rounded-full">
            <Sparkles className="w-3.5 h-3.5" />
            O&apos;zbek tilidagi onlayn ta&apos;lim platformasi
          </span>

          <h1 className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900 leading-[1.1]">
            O&apos;zbekistondagi eng yaxshi{" "}
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              ustozlardan
            </span>{" "}
            o&apos;rganing
          </h1>

          <p className="mt-5 text-lg text-gray-600 max-w-xl leading-relaxed">
            Dasturlash, dizayn, biznes va tillar bo&apos;yicha amaliy kurslar. O&apos;zingizga
            qulay vaqtda o&apos;rganing va tugatgach sertifikat oling.
          </p>

          <HeroSearch />

          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
            <div className="flex items-center gap-3">
              <div className="flex -space-x-3">
                {avatars.map((src) => (
                  <Image
                    key={src}
                    src={src}
                    alt=""
                    width={40}
                    height={40}
                    className="w-10 h-10 rounded-full object-cover ring-2 ring-white"
                  />
                ))}
              </div>
              <div className="text-sm leading-tight">
                <p className="font-bold text-gray-900">{formatNumber(stats.totalStudents)}+</p>
                <p className="text-gray-500">talaba o&apos;qimoqda</p>
              </div>
            </div>

            <div className="h-10 w-px bg-gray-200 hidden sm:block" />

            <div className="text-sm leading-tight">
              <p className="font-bold text-gray-900 flex items-center gap-1">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                {stats.avgRating.toFixed(1)}
              </p>
              <p className="text-gray-500">o&apos;rtacha reyting</p>
            </div>

            <div className="h-10 w-px bg-gray-200 hidden sm:block" />

            <div className="text-sm leading-tight">
              <p className="font-bold text-gray-900">{formatNumber(stats.totalCourses)}+</p>
              <p className="text-gray-500">amaliy kurs</p>
            </div>
          </div>
        </div>

        {/* O'ng tomon: rasm va ustida suzib turgan kartochkalar */}
        <div className="relative hidden lg:block">
          <div className="absolute inset-6 rounded-[2.5rem] bg-gradient-to-br from-indigo-500 to-purple-600 rotate-3" />
          <div className="relative aspect-[4/5] max-h-[520px] w-full rounded-[2.5rem] overflow-hidden shadow-2xl">
            <Image
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=900&q=80"
              alt="Birgalikda o'rganayotgan talabalar"
              fill
              priority
              sizes="(max-width: 1280px) 45vw, 560px"
              className="object-cover"
            />
          </div>

          <div className="absolute -left-10 top-14 bg-white rounded-2xl shadow-xl p-4 flex items-center gap-3 animate-float">
            <div className="w-11 h-11 rounded-xl bg-emerald-50 flex items-center justify-center">
              <Award className="w-6 h-6 text-emerald-600" />
            </div>
            <div>
              <p className="text-sm font-bold text-gray-900">Sertifikat berildi!</p>
              <p className="text-xs text-gray-500">Python bilan sun&apos;iy intellekt</p>
            </div>
          </div>

          <div className="absolute -right-6 bottom-20 bg-white rounded-2xl shadow-xl p-4 w-60 animate-float-delay-1">
            <div className="flex items-center gap-2">
              <PlayCircle className="w-5 h-5 text-indigo-600" />
              <p className="text-sm font-semibold text-gray-900">Bugungi dars</p>
            </div>
            <p className="text-xs text-gray-500 mt-1">React bilan birinchi ilova</p>
            <div className="mt-3 h-2 rounded-full bg-gray-100 overflow-hidden">
              <div className="h-full w-3/4 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500" />
            </div>
            <p className="text-[11px] text-gray-400 mt-1.5">Kurs 75% tugallandi</p>
          </div>

          <Link
            href="/ustoz-bolish"
            className="absolute -left-4 bottom-8 bg-white rounded-full shadow-lg pl-2 pr-4 py-2 flex items-center gap-2 text-sm font-medium text-gray-800 hover:text-indigo-700 animate-float-delay-2"
          >
            <span className="w-8 h-8 rounded-full bg-amber-50 flex items-center justify-center">
              <Users className="w-4 h-4 text-amber-600" />
            </span>
            {formatNumber(stats.totalInstructors)}+ tajribali ustoz
          </Link>
        </div>
      </div>
    </section>
  );
}
