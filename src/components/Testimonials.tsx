import Image from "next/image";
import { Star, Quote } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";

const reviews = [
  {
    name: "Madina Karimova",
    role: "Frontend dasturchi",
    course: "Frontend dasturlash: noldan mutaxassisgacha",
    text: "Darslar tushunarli va amaliy topshiriqlarga boy edi. Uch oy ichida birinchi loyihamni yakunlab, ishga topshira oldim.",
    rating: 5,
    photo: "photo-1544005313-94ddf0286df2",
  },
  {
    name: "Bobur Yusupov",
    role: "Marketing mutaxassisi",
    course: "Raqamli marketing va SMM",
    text: "Nazariya kam, real misollar ko'p. O'rgangan strategiyalarimni shu haftaning o'zida ishda sinab ko'rdim va natija bo'ldi.",
    rating: 5,
    photo: "photo-1507003211169-0a1dd7228f2d",
  },
  {
    name: "Dilfuza Rahimova",
    role: "Talaba",
    course: "Ingliz tili: nutq va grammatika",
    text: "Telefondan istalgan vaqtda o'qish mumkinligi juda qulay. Nutqim sezilarli yaxshilandi, sertifikat ham oldim.",
    rating: 5,
    photo: "photo-1494790108377-be9c29b29330",
  },
];

export default function Testimonials() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-16 md:py-24">
      <SectionHeading
        align="center"
        eyebrow="Fikrlar"
        title="Talabalarimiz nima deydi"
        subtitle="UstozUz orqali yangi ko'nikma egallaganlarning haqiqiy tajribasi"
      />

      <div className="grid md:grid-cols-3 gap-6">
        {reviews.map((r, i) => {
          const featured = i === 1;
          return (
            <figure
              key={r.name}
              className={`relative rounded-3xl p-7 flex flex-col transition-all duration-300 hover:-translate-y-1 ${
                featured
                  ? "bg-gradient-to-br from-indigo-700 to-purple-700 text-white shadow-xl shadow-indigo-200 md:-translate-y-3 md:hover:-translate-y-4"
                  : "bg-white ring-1 ring-gray-200 hover:shadow-xl"
              }`}
            >
              <Quote className={`w-10 h-10 ${featured ? "text-white/30" : "text-indigo-100"}`} />

              <div className="flex gap-0.5 mt-4">
                {Array.from({ length: 5 }).map((_, s) => (
                  <Star
                    key={s}
                    className={`w-4 h-4 ${s < r.rating ? "fill-amber-400 text-amber-400" : "text-gray-300"}`}
                  />
                ))}
              </div>

              <blockquote
                className={`mt-4 text-[15px] leading-relaxed flex-1 ${featured ? "text-indigo-50" : "text-gray-700"}`}
              >
                {r.text}
              </blockquote>

              <figcaption
                className={`flex items-center gap-3 mt-7 pt-6 border-t ${featured ? "border-white/20" : "border-gray-100"}`}
              >
                <Image
                  src={`https://images.unsplash.com/${r.photo}?w=96&h=96&fit=crop&q=80`}
                  alt={r.name}
                  width={48}
                  height={48}
                  className={`w-12 h-12 rounded-full object-cover ring-2 ${featured ? "ring-white/40" : "ring-indigo-100"}`}
                />
                <div className="min-w-0">
                  <p className={`font-semibold text-sm ${featured ? "text-white" : "text-gray-900"}`}>{r.name}</p>
                  <p className={`text-xs ${featured ? "text-indigo-200" : "text-gray-500"}`}>{r.role}</p>
                  <p
                    className={`text-xs font-medium mt-0.5 line-clamp-1 ${featured ? "text-white/90" : "text-indigo-700"}`}
                  >
                    {r.course}
                  </p>
                </div>
              </figcaption>
            </figure>
          );
        })}
      </div>
    </section>
  );
}
