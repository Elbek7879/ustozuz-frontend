import Link from "next/link";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "Kursni sotib olgach, qancha vaqt kirish mumkin?",
    a: "Sotib olingan kurs shaxsiy kabinetingizda ochiladi va siz uni o'zingizga qulay sur'atda, istalgan vaqtda ko'rishingiz mumkin.",
  },
  {
    q: "Qaysi to'lov usullari mavjud?",
    a: "Payme, Click va Uzcard/Humo bank kartalari orqali to'lash mumkin.",
  },
  {
    q: "Kursni tugatgach sertifikat beriladimi?",
    a: "Ha, barcha darslarni tugatganingizdan so'ng sertifikat sizning ismingiz bilan avtomatik yaratiladi.",
  },
  {
    q: "Darslarni telefondan ko'rsam bo'ladimi?",
    a: "Ha, sayt telefon, planshet va kompyuterda bir xil qulay ishlaydi.",
  },
  {
    q: "Men ham ustoz bo'lib kurs joylashtira olamanmi?",
    a: "Albatta. Ro'yxatdan o'ting, Ustoz bo'lish bo'limidan kurs yarating va materiallaringizni joylashtiring.",
  },
];

export default function FAQ() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <div className="grid lg:grid-cols-[1fr_1.6fr] gap-10">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 leading-snug">
            Ko&apos;p so&apos;raladigan savollar
          </h2>
          <p className="text-gray-500 mt-3">
            Javobini topa olmadingizmi? Yordam markazi yoki aloqa sahifasi
            orqali bizga murojaat qiling.
          </p>
          <div className="flex flex-wrap gap-3 mt-6">
            <Link
              href="/yordam"
              className="bg-indigo-700 text-white text-sm font-medium px-5 py-2.5 rounded-md hover:bg-indigo-800"
            >
              Yordam markazi
            </Link>
            <Link
              href="/aloqa"
              className="border border-indigo-700 text-indigo-700 text-sm font-medium px-5 py-2.5 rounded-md hover:bg-indigo-50"
            >
              Aloqa
            </Link>
          </div>
        </div>

        <div className="space-y-3">
          {faqs.map((f) => (
            <details
              key={f.q}
              className="group border border-gray-200 rounded-xl"
            >
              <summary className="flex items-center justify-between gap-4 cursor-pointer list-none p-5 font-medium text-gray-900 text-sm [&::-webkit-details-marker]:hidden">
                {f.q}
                <ChevronDown className="w-4 h-4 text-gray-400 shrink-0 transition-transform group-open:rotate-180" />
              </summary>
              <p className="px-5 pb-5 text-sm text-gray-600 leading-relaxed">
                {f.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}