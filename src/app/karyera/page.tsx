import InfoPage from "@/components/InfoPage";
import { Briefcase } from "lucide-react";

export const metadata = { title: "Karyera — UstozUz" };

export default function CareersPage() {
  return (
    <InfoPage
      title="Karyera"
      subtitle="UstozUz jamoasiga qo'shiling va ta'limni birgalikda rivojlantiramiz."
    >
      <div className="border border-dashed border-gray-300 rounded-xl p-10 text-center">
        <div className="w-14 h-14 rounded-full bg-indigo-50 flex items-center justify-center mx-auto mb-4">
          <Briefcase className="w-7 h-7 text-indigo-600" />
        </div>
        <h2 className="font-semibold text-gray-900">
          Hozircha ochiq vakansiyalar yo&apos;q
        </h2>
        <p className="text-sm text-gray-500 mt-2 max-w-md mx-auto">
          Yangi o&apos;rinlar paydo bo&apos;lganda shu sahifada e&apos;lon
          qilamiz. Rezyumeingizni oldindan yuborishingiz ham mumkin.
        </p>
        <a href="mailto:info@ustozuz.uz" className="inline-block mt-6 bg-indigo-700 text-white font-medium px-6 py-3 rounded-md hover:bg-indigo-800">Rezyume yuborish</a>
      </div>
    </InfoPage>
  );
}