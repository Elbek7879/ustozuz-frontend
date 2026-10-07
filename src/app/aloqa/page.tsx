import InfoPage from "@/components/InfoPage";
import ContactForm from "@/components/ContactForm";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

export const metadata = { title: "Aloqa" };

const info = [
  { icon: Mail, label: "Elektron pochta", value: "info@ustozuz.uz" },
  { icon: Phone, label: "Telefon", value: "+998 90 123 45 67" },
  { icon: MapPin, label: "Manzil", value: "Toshkent, O'zbekiston" },
  { icon: Clock, label: "Ish vaqti", value: "Dushanba–Juma, 09:00–18:00" },
];

export default function ContactPage() {
  return (
    <InfoPage
      title="Aloqa"
      subtitle="Savolingiz yoki taklifingiz bormi? Bizga yozing, imkon qadar tez javob beramiz."
    >
      <div className="grid md:grid-cols-2 gap-10">
        <div className="space-y-5">
          {info.map((i) => {
            const Icon = i.icon;
            return (
              <div key={i.label} className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-lg bg-indigo-50 flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5 text-indigo-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">{i.label}</p>
                  <p className="font-medium text-gray-900 text-sm mt-0.5">
                    {i.value}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <ContactForm />
      </div>
    </InfoPage>
  );
}