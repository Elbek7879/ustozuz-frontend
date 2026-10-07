import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

const topics = [
  {
    title: "Sun'iy intellekt",
    desc: "AI vositalari bilan ishlashni o'rganing",
    href: "/kurslar?kategoriya=Dasturlash",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=500&q=80",
  },
  {
    title: "IT sertifikatlari",
    desc: "Tan olingan bilim va ko'nikmalarni tasdiqlang",
    href: "/kurslar",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=500&q=80",
  },
  {
    title: "Ma'lumotlar tahlili",
    desc: "Raqamlar ortidagi haqiqatni tushunishni o'rganing",
    href: "/kurslar?kategoriya=Biznes",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&q=80",
  },
];

export default function CareerSkills() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <div className="grid md:grid-cols-[1fr_2fr] gap-8 items-center">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 leading-snug">
            Karyera va hayotingiz{" "}
            <span className="italic font-serif">uchun muhim</span>{" "}
            ko&apos;nikmalarni o&apos;rganing
          </h2>
          <p className="text-gray-500 text-sm mt-4">
            UstozUz sizga o&apos;zgaruvchan mehnat bozorida talab yuqori
            bo&apos;lgan ko&apos;nikmalarni tezda shakllantirishga va
            martabangizni rivojlantirishga yordam beradi.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {topics.map((topic) => (
            <Link
              key={topic.title}
              href={topic.href}
              className="group relative rounded-xl overflow-hidden h-64 block"
            >
              <Image
                src={topic.image}
                alt={topic.title}
                fill
                sizes="260px"
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

              <div className="absolute bottom-0 left-0 right-0 bg-white m-3 rounded-lg p-4 flex items-center justify-between">
                <div>
                  <p className="font-semibold text-gray-900 text-sm">
                    {topic.title}
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">{topic.desc}</p>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-700 shrink-0 ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}