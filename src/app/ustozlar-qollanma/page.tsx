import Link from "next/link";
import InfoPage from "@/components/InfoPage";

export const metadata = { title: "Ustozlar uchun qo'llanma" };

const steps = [
  {
    title: "Ro'yxatdan o'ting",
    desc: "Hisob yarating va ustoz sifatida boshlash uchun ma'lumotlaringizni to'ldiring.",
  },
  {
    title: "Kursingizni rejalashtiring",
    desc: "Mavzu, auditoriya va dasturni oldindan aniqlab oling: talaba kurs oxirida nimani uddalay olishi kerak?",
  },
  {
    title: "Materiallarni tayyorlang",
    desc: "Darslarni qisqa va aniq qismlarga bo'ling. Har bir darsda bitta asosiy g'oya bo'lsin.",
  },
  {
    title: "Kursni yarating",
    desc: "Ustoz panelida nom, tavsif, kategoriya va narxni kiriting.",
  },
  {
    title: "E'lon qiling va kuzating",
    desc: "Kurs e'lon qilingach, panelda talabalar soni va reytingni kuzatib boring.",
  },
];

export default function InstructorGuidePage() {
  return (
    <InfoPage
      title="Ustozlar uchun qo'llanma"
      subtitle="Birinchi kursingizni yaratish uchun qisqa yo'riqnoma."
    >
      <ol className="space-y-6">
        {steps.map((s, i) => (
          <li key={s.title} className="flex gap-4">
            <div className="w-9 h-9 rounded-full bg-indigo-700 text-white font-bold text-sm flex items-center justify-center shrink-0">
              {i + 1}
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">{s.title}</h3>
              <p className="text-sm text-gray-500 mt-1">{s.desc}</p>
            </div>
          </li>
        ))}
      </ol>

      <Link
        href="/ustoz-bolish"
        className="inline-block mt-10 bg-indigo-700 text-white font-medium px-6 py-3 rounded-md hover:bg-indigo-800"
      >
        Ustoz bo&apos;lish
      </Link>
    </InfoPage>
  );
}