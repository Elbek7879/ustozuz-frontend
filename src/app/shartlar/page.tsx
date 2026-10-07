import InfoPage from "@/components/InfoPage";

export const metadata = { title: "Foydalanish shartlari — UstozUz" };

const sections = [
  {
    title: "1. Umumiy qoidalar",
    text: "UstozUz platformasidan foydalanish orqali siz ushbu shartlarga rozilik bildirasiz. Rozi bo'lmasangiz, platformadan foydalanmasligingiz lozim.",
  },
  {
    title: "2. Hisob",
    text: "Siz hisobingiz xavfsizligi va parolingiz sir saqlanishi uchun javobgarsiz. Ro'yxatdan o'tishda to'g'ri ma'lumot kiritishingiz kerak.",
  },
  {
    title: "3. Kurslar va to'lov",
    text: "Kurs narxi uning sahifasida ko'rsatiladi. To'lov amalga oshirilgach, kurs shaxsiy kabinetingizda ochiladi. Qaytarish shartlari alohida belgilanadi.",
  },
  {
    title: "4. Intellektual mulk",
    text: "Platformadagi kurs materiallari ularning mualliflariga tegishli. Materiallarni ruxsatsiz nusxalash, tarqatish yoki qayta sotish taqiqlanadi.",
  },
  {
    title: "5. Ustozlar uchun",
    text: "Ustozlar faqat o'zlariga tegishli yoki foydalanish huquqiga ega bo'lgan materiallarni joylashtirishi mumkin. Daromad taqsimoti shartlari ustozlar bilan alohida kelishiladi.",
  },
  {
    title: "6. Taqiqlangan harakatlar",
    text: "Boshqa foydalanuvchilar hisobiga ruxsatsiz kirish, platformaning ishiga xalaqit berish va qonunga zid kontent joylashtirish taqiqlanadi.",
  },
  {
    title: "7. Javobgarlik cheklovi",
    text: "Platforma uzluksiz va xatosiz ishlashiga harakat qilamiz, lekin texnik nosozliklar uchun kafolat bermaymiz.",
  },
  {
    title: "8. O'zgarishlar",
    text: "Shartlar vaqti-vaqti bilan yangilanishi mumkin. Yangilangan versiya shu sahifada e'lon qilinadi.",
  },
];

export default function TermsPage() {
  return (
    <InfoPage
      title="Foydalanish shartlari"
      subtitle="Platformadan foydalanish qoidalari."
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