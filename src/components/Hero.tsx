"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import CertificateModal from "@/components/CertificateModal";

const slides = [
  {
    title: "Dasturlashni noldan o'rganing",
    desc: "Veb va mobil ilovalar yaratishni professional ustozlardan o'rganing.",
    cta: "Kurslarni ko'rish",
    href: "/kurslar?kategoriya=Dasturlash",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=700&q=80",
    gradient: "from-indigo-900 via-indigo-700 to-purple-700",
  },
  {
    title: "Sertifikat bilan CV'ingizni mustahkamlang",
    desc: "Har bir kursni tugatib, ish beruvchilar ishonadigan sertifikat qo'lga kiriting.",
    cta: "Sertifikatlarni ko'rish",
    action: "modal" as const,
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=700&q=80",
    gradient: "from-emerald-900 via-teal-700 to-emerald-600",
  },
  {
    title: "Bilimingizni ulashing, ustoz bo'ling",
    desc: "O'z kursingizni yarating va minglab talabalarga tajribangizni o'rgating.",
    cta: "Ustoz bo'lish",
    href: "/ustoz-bolish",
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=700&q=80",
    gradient: "from-orange-900 via-amber-700 to-orange-500",
  },
  {
    title: "Dizayn ko'nikmalarini rivojlantiring",
    desc: "UI/UX va grafik dizaynni amaliy loyihalar orqali chuqur o'rganing.",
    cta: "Dizayn kurslari",
    href: "/kurslar?kategoriya=Dizayn",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=700&q=80",
    gradient: "from-pink-900 via-rose-700 to-pink-600",
  },
  {
    title: "Chet tilini ishonch bilan gapiring",
    desc: "Ingliz va rus tillarini tajribali ustozlar bilan tez va samarali o'rganing.",
    cta: "Til kurslari",
    href: "/kurslar?kategoriya=Tillar",
    image: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=700&q=80",
    gradient: "from-sky-900 via-cyan-700 to-sky-600",
  },
  {
    title: "Biznesingizni raqamli dunyoga olib chiqing",
    desc: "Marketing va SMM strategiyalarini real amaliyot orqali egallang.",
    cta: "Biznes kurslari",
    href: "/kurslar?kategoriya=Biznes",
    image: "https://images.unsplash.com/photo-1533750349088-cd871a92f312?w=700&q=80",
    gradient: "from-violet-900 via-purple-700 to-fuchsia-600",
  },
];

export default function Hero() {
  const [showCertificate, setShowCertificate] = useState(false);
  const loopedSlides = [...slides, ...slides];

  return (
    <section className="relative bg-gray-50 py-8 overflow-hidden">
      <div className="relative group">
        <div className="flex gap-5 w-max animate-marquee-hero group-hover:[animation-play-state:paused] motion-reduce:animate-none px-6">
          {loopedSlides.map((slide, i) => (
            <div
              key={`${slide.title}-${i}`}
              className="relative shrink-0 w-[320px] sm:w-[420px] md:w-[520px] h-[360px] md:h-[400px] rounded-3xl overflow-hidden"
            >
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                sizes="520px"
                priority={i === 0}
                className="object-cover"
              />
              <div className={`absolute inset-0 bg-gradient-to-r ${slide.gradient} opacity-90`} />

              <div className="relative h-full flex items-center px-8 md:px-10">
                <div className="max-w-xs">
                  <h1 className="text-xl md:text-2xl font-bold text-white leading-tight">
                    {slide.title}
                  </h1>
                  <p className="mt-3 text-white/85 text-sm">{slide.desc}</p>

                  {slide.action === "modal" ? (
                    <button
                      onClick={() => setShowCertificate(true)}
                      className="inline-block mt-5 bg-white text-gray-900 font-semibold px-5 py-2.5 rounded-md hover:bg-gray-100 text-sm"
                    >
                      {slide.cta}
                    </button>
                  ) : (
                    <Link
                      href={slide.href!}
                      className="inline-block mt-5 bg-white text-gray-900 font-semibold px-5 py-2.5 rounded-md hover:bg-gray-100 text-sm"
                    >
                      {slide.cta}
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-gray-50 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-gray-50 to-transparent" />
      </div>

      {showCertificate && (
        <CertificateModal onClose={() => setShowCertificate(false)} />
      )}
    </section>
  );
}