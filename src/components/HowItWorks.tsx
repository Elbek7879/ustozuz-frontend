import { Search, PlayCircle, Award } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Kursni tanlang",
    desc: "Kategoriyalar bo'yicha qidiring yoki mashhur kurslar orasidan o'zingizga mosini toping.",
    bg: "bg-indigo-50",
    color: "text-indigo-600",
  },
  {
    icon: PlayCircle,
    title: "O'z sur'atingizda o'rganing",
    desc: "Darslarni istalgan vaqtda, telefon yoki kompyuterdan ko'ring va amaliy topshiriqlarni bajaring.",
    bg: "bg-emerald-50",
    color: "text-emerald-600",
  },
  {
    icon: Award,
    title: "Sertifikat oling",
    desc: "Kursni tugatgach, o'zlashtirganingizni tasdiqlovchi sertifikat qo'lga kiriting.",
    bg: "bg-amber-50",
    color: "text-amber-600",
  },
];

export default function HowItWorks() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
          UstozUz&apos;da o&apos;rganish qanday ishlaydi
        </h2>
        <p className="text-gray-500 mt-3">
          Boshlash uchun atigi uchta oddiy qadam.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {steps.map((s, i) => {
          const Icon = s.icon;
          return (
            <div
              key={s.title}
              className="relative border border-gray-200 rounded-2xl p-7 hover:shadow-md hover:-translate-y-1 transition-all duration-300"
            >
              <span className="absolute top-5 right-6 text-5xl font-bold text-gray-100 select-none">
                {i + 1}
              </span>

              <div
                className={`w-14 h-14 rounded-xl ${s.bg} flex items-center justify-center mb-5`}
              >
                <Icon className={`w-7 h-7 ${s.color}`} />
              </div>

              <h3 className="font-semibold text-gray-900 text-lg">{s.title}</h3>
              <p className="text-sm text-gray-500 mt-2 leading-relaxed">
                {s.desc}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}