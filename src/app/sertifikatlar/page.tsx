import Link from "next/link";
import InfoPage from "@/components/InfoPage";
import { BookOpen, CheckCircle2, Award } from "lucide-react";

export const metadata = { title: "Sertifikatlar" };

const steps = [
  {
    icon: BookOpen,
    title: "Kursni tanlang",
    desc: "O'zingizga mos kursni sotib oling va darslarni boshlang.",
  },
  {
    icon: CheckCircle2,
    title: "Darslarni tugating",
    desc: "Kursning barcha darslarini oxirigacha o'zlashtiring.",
  },
  {
    icon: Award,
    title: "Sertifikat oling",
    desc: "Sertifikat sizning ismingiz bilan avtomatik yaratiladi.",
  },
];

export default function CertificatesPage() {
  return (
    <InfoPage
      title="Sertifikatlar"
      subtitle="Kursni tugatganingizni tasdiqlovchi hujjat."
    >
      <div className="grid md:grid-cols-3 gap-6">
        {steps.map((s, i) => {
          const Icon = s.icon;
          return (
            <div key={s.title} className="border border-gray-200 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-indigo-700 text-white text-sm font-bold flex items-center justify-center">
                  {i + 1}
                </div>
                <Icon className="w-5 h-5 text-indigo-700" />
              </div>
              <h3 className="font-semibold text-gray-900">{s.title}</h3>
              <p className="text-sm text-gray-500 mt-2">{s.desc}</p>
            </div>
          );
        })}
      </div>

      <p className="text-sm text-gray-500 mt-8">
        UstozUz sertifikati platformada kursni muvaffaqiyatli tugatganingizni
        tasdiqlaydi va davlat diplomi o&apos;rnini bosmaydi.
      </p>

      <Link
        href="/kurslar"
        className="inline-block mt-6 bg-indigo-700 text-white font-medium px-6 py-3 rounded-md hover:bg-indigo-800"
      >
        Kurslarni ko&apos;rish
      </Link>
    </InfoPage>
  );
}