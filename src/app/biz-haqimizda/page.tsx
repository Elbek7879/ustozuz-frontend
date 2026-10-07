import InfoPage from "@/components/InfoPage";
import { Target, Users, ShieldCheck, Lightbulb } from "lucide-react";

export const metadata = { title: "Biz haqimizda" };

const values = [
  {
    icon: Target,
    title: "Maqsadimiz",
    desc: "O'zbekistonda sifatli onlayn ta'limni har kim uchun qulay va tushunarli qilish.",
  },
  {
    icon: Users,
    title: "Ustozlar hamjamiyati",
    desc: "Tajribali mutaxassislar bilimini minglab talabalarga yetkazadi.",
  },
  {
    icon: ShieldCheck,
    title: "Ishonchlilik",
    desc: "Kurslar tartibli joylashtiriladi, tugatganlarga sertifikat beriladi.",
  },
  {
    icon: Lightbulb,
    title: "Amaliy yondashuv",
    desc: "Nazariya emas, real ko'nikmalar va amaliy loyihalarga e'tibor qaratamiz.",
  },
];

export default function AboutPage() {
  return (
    <InfoPage
      title="Biz haqimizda"
      subtitle="UstozUz — o'zbek tilidagi ustozlar va o'rganishni istagan talabalarni birlashtiruvchi onlayn ta'lim platformasi."
    >
      <h2 className="text-xl font-bold text-gray-900 mb-3">Bizning hikoya</h2>
      <p className="text-gray-600 leading-relaxed">
        UstozUz g&apos;oyasi oddiy: bilim olish har kim uchun qulay bo&apos;lishi
        kerak, ustozlar esa o&apos;z tajribasini keng auditoriyaga ulashish
        imkoniga ega bo&apos;lishi kerak. Bu matnni o&apos;zingizning haqiqiy
        hikoyangiz bilan almashtiring.
      </p>

      <div className="grid sm:grid-cols-2 gap-6 mt-10">
        {values.map((v) => {
          const Icon = v.icon;
          return (
            <div
              key={v.title}
              className="border border-gray-200 rounded-xl p-6"
            >
              <div className="w-11 h-11 rounded-lg bg-indigo-50 flex items-center justify-center mb-4">
                <Icon className="w-5 h-5 text-indigo-600" />
              </div>
              <h3 className="font-semibold text-gray-900">{v.title}</h3>
              <p className="text-sm text-gray-500 mt-2">{v.desc}</p>
            </div>
          );
        })}
      </div>
    </InfoPage>
  );
}