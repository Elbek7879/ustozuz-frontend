"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, TrendingUp } from "lucide-react";

const topics = [
  {
    title: "Sun'iy intellekt",
    desc: "AI vositalari bilan ishlashni o'rganing va ish jarayonlaringizni tezlashtiring.",
    trend: "Dasturlash",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80",
    href: `/kurslar?qidiruv=${encodeURIComponent("intellekt")}`,
  },
  {
    title: "UI/UX dizayn",
    desc: "Qulay va chiroyli ilovalar hamda saytlar dizaynini noldan o'rganing.",
    trend: "Dizayn",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80",
    href: `/kurslar?kategoriya=${encodeURIComponent("Dizayn")}`,
  },
  {
    title: "Python",
    desc: "Eng mashhur dasturlash tillaridan birini boshlang'ich darajadan o'rganing.",
    trend: "Dasturlash",
    image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&q=80",
    href: `/kurslar?qidiruv=Python`,
  },
  {
    title: "Raqamli marketing",
    desc: "Ijtimoiy tarmoqlar va reklama orqali biznesingizni rivojlantiring.",
    trend: "Biznes",
    image: "https://images.unsplash.com/photo-1533750349088-cd871a92f312?w=800&q=80",
    href: `/kurslar?kategoriya=${encodeURIComponent("Biznes")}`,
  },
  {
    title: "Ingliz tili",
    desc: "Nutq va grammatikani tajribali ustozlar bilan mustahkamlang.",
    trend: "Tillar",
    image: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=800&q=80",
    href: `/kurslar?kategoriya=${encodeURIComponent("Tillar")}`,
  },
];

export default function TopicsCarousel() {
  const ref = useRef<HTMLDivElement>(null);

  function scroll(dir: "left" | "right") {
    ref.current?.scrollBy({
      left: dir === "left" ? -540 : 540,
      behavior: "smooth",
    });
  }

  return (
    <div className="relative">
      <div
        ref={ref}
        className="flex gap-5 overflow-x-auto snap-x snap-mandatory scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
      >
        {topics.map((t) => (
          <Link
            key={t.title}
            href={t.href}
            className="group shrink-0 snap-start w-[85%] sm:w-[520px] border border-gray-200 rounded-xl overflow-hidden bg-white hover:shadow-md transition"
          >
            <div className="relative h-32 overflow-hidden">
              <Image
                src={t.image}
                alt={t.title}
                fill
                sizes="520px"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-5">
              <h3 className="font-bold text-gray-900 text-lg">{t.title}</h3>
              <p className="text-sm text-gray-600 mt-2 line-clamp-2">{t.desc}</p>
              <p className="flex items-center gap-2 text-xs text-gray-500 mt-5">
                <TrendingUp className="w-4 h-4 text-emerald-600" />
                <span>
                  <span className="text-indigo-700 font-medium">{t.trend}</span>{" "}
                  kategoriyasida mashhur
                </span>
              </p>
            </div>
          </Link>
        ))}
      </div>

      <button
        onClick={() => scroll("left")}
        aria-label="Chapga"
        className="hidden md:flex absolute -left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white border border-gray-200 shadow-md items-center justify-center hover:bg-gray-50"
      >
        <ChevronLeft className="w-5 h-5 text-gray-700" />
      </button>
      <button
        onClick={() => scroll("right")}
        aria-label="O'ngga"
        className="hidden md:flex absolute -right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white border border-gray-200 shadow-md items-center justify-center hover:bg-gray-50"
      >
        <ChevronRight className="w-5 h-5 text-gray-700" />
      </button>
    </div>
  );
}