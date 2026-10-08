import { Search, PlayCircle, Award } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";

const steps = [
  {
    icon: Search,
    title: "Kursni tanlang",
    desc: "Kategoriyalar bo'yicha qidiring yoki mashhur kurslar orasidan o'zingizga mosini toping.",
    color: "from-indigo-500 to-indigo-600",
  },
  {
    icon: PlayCircle,
    title: "O'z sur'atingizda o'rganing",
    desc: "Darslarni istalgan vaqtda telefon yoki kompyuterdan o'ting va progressingizni kuzating.",
    color: "from-purple-500 to-fuchsia-600",
  },
  {
    icon: Award,
    title: "Sertifikat oling",
    desc: "Barcha darslarni tugatgach, ismingiz yozilgan sertifikat avtomatik beriladi.",
    color: "from-amber-400 to-orange-500",
  },
];

export default function HowItWorks() {
  return (
    <section className="bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-16 md:py-24">
        <SectionHeading
          align="center"
          eyebrow="Qanday ishlaydi"
          title="Uch qadamda yangi kasb sari"
          subtitle="Ro'yxatdan o'tish bir daqiqa oladi — qolgani sizning qiziqishingizga bog'liq"
        />

        <div className="relative grid md:grid-cols-3 gap-6 md:gap-8">
          {/* Qadamlarni bog'lovchi chiziq (kompyuterda) */}
          <div className="hidden md:block absolute top-12 left-[16%] right-[16%] border-t-2 border-dashed border-indigo-200" />

          {steps.map((s, i) => {
            const Icon = s.icon;
            return (
              <div
                key={s.title}
                className="relative bg-white rounded-3xl p-8 text-center shadow-sm ring-1 ring-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="relative mx-auto w-16 h-16">
                  <div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${s.color} flex items-center justify-center shadow-lg rotate-3`}
                  >
                    <Icon className="w-8 h-8 text-white -rotate-3" />
                  </div>
                  <span className="absolute -top-2 -right-3 w-7 h-7 rounded-full bg-gray-900 text-white text-xs font-bold flex items-center justify-center ring-4 ring-white">
                    {i + 1}
                  </span>
                </div>

                <h3 className="mt-6 font-bold text-gray-900 text-lg">{s.title}</h3>
                <p className="text-sm text-gray-500 mt-2 leading-relaxed">{s.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
