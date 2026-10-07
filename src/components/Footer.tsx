import Link from "next/link";

const columns = [
  {
    title: "UstozUz",
    links: [
      { label: "Biz haqimizda", href: "/biz-haqimizda" },
      { label: "Karyera", href: "/karyera" },
      { label: "Aloqa", href: "/aloqa" },
    ],
  },
  {
    title: "Talabalar uchun",
    links: [
      { label: "Kurslarni ko'rish", href: "/kurslar" },
      { label: "Sertifikatlar", href: "/sertifikatlar" },
      { label: "Yordam markazi", href: "/yordam" },
    ],
  },
  {
    title: "Ustozlar uchun",
    links: [
      { label: "Ustoz bo'lish", href: "/ustoz-bolish" },
      { label: "Ustozlar uchun qo'llanma", href: "/ustozlar-qollanma" },
    ],
  },
  {
    title: "Ijtimoiy tarmoqlar",
    // Haqiqiy sahifalaringiz havolasini shu yerga qo'ying
    links: [
      { label: "Telegram", href: "#" },
      { label: "Instagram", href: "#" },
      { label: "YouTube", href: "#" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-gray-900">
      <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-2 md:grid-cols-4 gap-8">
        {columns.map((col) => (
          <div key={col.title}>
            <h4 className="text-white font-semibold text-sm mb-4">
              {col.title}
            </h4>
            <ul className="space-y-2">
              {col.links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-gray-400 text-sm hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-gray-500 text-sm">
            © 2026 UstozUz. Barcha huquqlar himoyalangan.
          </p>
          <div className="flex gap-4 text-sm text-gray-500">
            <Link href="/maxfiylik" className="hover:text-white">
              Maxfiylik siyosati
            </Link>
            <Link href="/shartlar" className="hover:text-white">
              Foydalanish shartlari
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}