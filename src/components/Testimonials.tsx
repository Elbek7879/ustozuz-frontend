import { Star, Quote } from "lucide-react";

const reviews = [
  {
    name: "Madina Karimova",
    role: "Frontend dasturchi",
    course: "Frontend dasturlash: noldan mutaxassisgacha",
    text: "Darslar tushunarli va amaliy topshiriqlarga boy edi. Uch oy ichida birinchi loyihamni yakunlab, ishga topshira oldim.",
    rating: 5,
    gradient: "from-indigo-500 to-purple-500",
  },
  {
    name: "Bobur Yusupov",
    role: "Marketing mutaxassisi",
    course: "Raqamli marketing va SMM",
    text: "Nazariya kam, real misollar ko'p. O'rgangan strategiyalarimni shu haftaning o'zida ishda sinab ko'rdim.",
    rating: 5,
    gradient: "from-amber-500 to-orange-500",
  },
  {
    name: "Dilfuza Rahimova",
    role: "Talaba",
    course: "Ingliz tili: nutq va grammatika",
    text: "Telefondan istalgan vaqtda o'qish mumkinligi juda qulay. Nutqim sezilarli yaxshilandi, sertifikat ham oldim.",
    rating: 4,
    gradient: "from-emerald-500 to-teal-500",
  },
];

function initials(name: string) {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2);
}

export default function Testimonials() {
  return (
    <section className="bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            Talabalarimiz nima deydi
          </h2>
          <p className="text-gray-500 mt-3">
            UstozUz orqali yangi ko&apos;nikma egallaganlarning fikrlari.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {reviews.map((r) => (
            <div
              key={r.name}
              className="bg-white border border-gray-200 rounded-2xl p-6 flex flex-col"
            >
              <Quote className="w-8 h-8 text-indigo-200 mb-3" />

              <div className="flex gap-0.5 mb-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < r.rating
                        ? "fill-amber-400 text-amber-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>

              <p className="text-sm text-gray-700 leading-relaxed flex-1">
                {r.text}
              </p>

              <div className="flex items-center gap-3 mt-6 pt-5 border-t border-gray-100">
                <div
                  className={`w-11 h-11 rounded-full bg-gradient-to-br ${r.gradient} text-white font-semibold text-sm flex items-center justify-center shrink-0`}
                >
                  {initials(r.name)}
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-gray-900 text-sm">
                    {r.name}
                  </p>
                  <p className="text-xs text-gray-500">{r.role}</p>
                </div>
              </div>

              <p className="text-xs text-indigo-700 font-medium mt-3 line-clamp-1">
                {r.course}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}