import InfoPage from "@/components/InfoPage";
import { ChevronDown } from "lucide-react";

export const metadata = { title: "Yordam markazi — UstozUz" };

const faqs = [
  {
    q: "Kursni qanday sotib olaman?",
    a: "Kerakli kursni tanlab, Savatga qo'shish tugmasini bosing, so'ng savatdan To'lash bosqichiga o'ting va to'lov usulini tanlang.",
  },
  {
    q: "Qaysi to'lov usullari mavjud?",
    a: "Payme, Click va Uzcard/Humo kartalari orqali to'lash mumkin.",
  },
  {
    q: "Sotib olgan kurslarimni qayerdan ko'raman?",
    a: "Shaxsiy kabinetingizdagi Mening kurslarim bo'limida barcha kurslaringiz va o'zlashtirish darajangiz ko'rinadi.",
  },
  {
    q: "Sertifikatni qanday olaman?",
    a: "Kursning barcha darslarini tugatganingizdan so'ng sertifikat sizning ismingiz bilan avtomatik yaratiladi.",
  },
  {
    q: "Parolni unutib qo'ysam nima qilaman?",
    a: "Kirish sahifasidagi Parolni unutdingizmi? havolasini bosing va elektron pochtangizni kiriting.",
  },
  {
    q: "Ustoz bo'lish uchun nima qilish kerak?",
    a: "Ro'yxatdan o'ting va Ustoz bo'lish bo'limidagi ko'rsatmalarga amal qiling: kurs yarating, materiallarni yuklang va e'lon qiling.",
  },
  {
    q: "To'lovda muammo yuzaga kelsa-chi?",
    a: "Aloqa sahifasi orqali bizga yozing, muammoni birgalikda hal qilamiz.",
  },
];

export default function HelpPage() {
  return (
    <InfoPage
      title="Yordam markazi"
      subtitle="Eng ko'p beriladigan savollarga javoblar."
    >
      <div className="space-y-3">
        {faqs.map((f) => (
          <details
            key={f.q}
            className="group border border-gray-200 rounded-lg"
          >
            <summary className="flex items-center justify-between gap-4 cursor-pointer list-none p-4 font-medium text-gray-900 text-sm [&::-webkit-details-marker]:hidden">
              {f.q}
              <ChevronDown className="w-4 h-4 text-gray-400 shrink-0 transition-transform group-open:rotate-180" />
            </summary>
            <p className="px-4 pb-4 text-sm text-gray-600 leading-relaxed">
              {f.a}
            </p>
          </details>
        ))}
      </div>
    </InfoPage>
  );
}