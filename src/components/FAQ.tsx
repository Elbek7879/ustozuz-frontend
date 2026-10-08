import Link from "next/link";
import { Plus, MessageCircle } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";

const faqs = [
  {
    q: "Kursni sotib olgach, qancha vaqt kirish mumkin?",
    a: "Sotib olingan kurs shaxsiy kabinetingizda ochiladi va siz uni o'zingizga qulay sur'atda, muddatsiz ko'rishingiz mumkin.",
  },
  {
    q: "Qaysi to'lov usullari mavjud?",
    a: "Payme, Click va Uzcard/Humo bank kartalari orqali to'lash mumkin.",
  },
  {
    q: "Kursni tugatgach sertifikat beriladimi?",
    a: "Ha, barcha darslarni tugatganingizdan so'ng sertifikat sizning ismingiz bilan avtomatik yaratiladi. Uni PDF qilib saqlash mumkin.",
  },
  {
    q: "Darslarni telefondan ko'rsam bo'ladimi?",
    a: "Ha, sayt telefon, planshet va kompyuterda bir xil qulay ishlaydi.",
  },
  {
    q: "Men ham ustoz bo'lib kurs joylashtira olamanmi?",
    a: "Albatta. Ro'yxatdan o'ting va \"Ustoz bo'lish\" sahifasi orqali murojaat qiling — hisobingizga ustoz huquqi beriladi.",
  },
];

export default function FAQ() {
  return (
    <section className="bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-16 md:py-24 grid lg:grid-cols-[1fr_1.6fr] gap-10 lg:gap-16">
        <div>
          <SectionHeading
            eyebrow="Savol-javob"
            title="Ko'p so'raladigan savollar"
            subtitle="Javobini topa olmadingizmi? Bizga yozing — tez orada javob beramiz."
          />

          <div className="rounded-3xl bg-white ring-1 ring-gray-200 p-6 -mt-2">
            <div className="w-11 h-11 rounded-xl bg-indigo-50 flex items-center justify-center">
              <MessageCircle className="w-5 h-5 text-indigo-600" />
            </div>
            <p className="mt-4 font-semibold text-gray-900">Hali ham savolingiz bormi?</p>
            <p className="text-sm text-gray-500 mt-1">Yordam markazi yoki aloqa sahifasi orqali murojaat qiling.</p>
            <div className="flex flex-wrap gap-3 mt-5">
              <Link
                href="/aloqa"
                className="bg-indigo-700 text-white text-sm font-semibold px-5 py-2.5 rounded-xl hover:bg-indigo-800 transition"
              >
                Bizga yozing
              </Link>
              <Link
                href="/yordam"
                className="bg-gray-100 text-gray-800 text-sm font-semibold px-5 py-2.5 rounded-xl hover:bg-gray-200 transition"
              >
                Yordam markazi
              </Link>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          {faqs.map((f, i) => (
            <details
              key={f.q}
              open={i === 0}
              className="group bg-white rounded-2xl ring-1 ring-gray-200 open:ring-2 open:ring-indigo-500 open:shadow-lg open:shadow-indigo-100/60 transition"
            >
              <summary className="flex items-center justify-between gap-4 cursor-pointer list-none p-5 md:p-6 font-semibold text-gray-900 [&::-webkit-details-marker]:hidden">
                {f.q}
                <span className="w-8 h-8 rounded-full bg-gray-100 group-open:bg-indigo-600 flex items-center justify-center shrink-0 transition">
                  <Plus className="w-4 h-4 text-gray-600 group-open:text-white group-open:rotate-45 transition-transform" />
                </span>
              </summary>
              <p className="px-5 md:px-6 pb-6 -mt-1 text-sm text-gray-600 leading-relaxed">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
