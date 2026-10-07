import InfoPage from "@/components/InfoPage";

export const metadata = { title: "Maxfiylik siyosati — UstozUz" };

const sections = [
  {
    title: "1. Qanday ma'lumotlarni yig'amiz",
    text: "Ro'yxatdan o'tishda ism, elektron pochta va telefon raqamingizni, shuningdek platformadan foydalanish jarayonidagi ma'lumotlarni (sotib olingan kurslar, o'zlashtirish darajasi) yig'amiz.",
  },
  {
    title: "2. Ma'lumotlardan qanday foydalanamiz",
    text: "Ma'lumotlar hisobingizni yuritish, xaridlarni amalga oshirish, sertifikat berish va sizga xizmat ko'rsatishni yaxshilash uchun ishlatiladi.",
  },
  {
    title: "3. To'lov ma'lumotlari",
    text: "To'lovlar Payme, Click va bank tizimlari orqali qayta ishlanadi. Bank kartasi ma'lumotlari to'lov tizimi tomonida qayta ishlanadi.",
  },
  {
    title: "4. Uchinchi tomonlar",
    text: "Ma'lumotlaringiz qonun talab qilgan hollar yoki xizmat ko'rsatish uchun zarur bo'lgan hamkorlar (masalan, to'lov tizimlari) bundan mustasno, uchinchi shaxslarga berilmaydi.",
  },
  {
    title: "5. Brauzer xotirasi",
    text: "Sayt savatingiz va tanlagan sozlamalaringizni qulaylik uchun brauzeringiz xotirasida saqlashi mumkin.",
  },
  {
    title: "6. Sizning huquqlaringiz",
    text: "O'z ma'lumotlaringizni ko'rish, tuzatish yoki o'chirishni so'rash huquqiga egasiz. Buning uchun Aloqa sahifasi orqali murojaat qiling.",
  },
];

export default function PrivacyPage() {
  return (
    <InfoPage
      title="Maxfiylik siyosati"
      subtitle="Shaxsiy ma'lumotlaringiz qanday yig'ilishi va ishlatilishi haqida."
    >
      <p className="text-sm bg-amber-50 border border-amber-200 text-amber-800 rounded-lg p-4 mb-8">
        Namunaviy matn. Saytni ommaga ochishdan oldin uni haqiqiy faoliyatingizga
        moslang, yurist ko&apos;rib chiqsin va bu izohni olib tashlang.
      </p>

      <div className="space-y-8">
        {sections.map((s) => (
          <div key={s.title}>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              {s.title}
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed">{s.text}</p>
          </div>
        ))}
      </div>
    </InfoPage>
  );
}