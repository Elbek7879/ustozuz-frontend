import Link from "next/link";
import { Mail, MapPin } from "lucide-react";
import Logo from "@/components/Logo";

const columns = [
  {
    title: "Platforma",
    links: [
      { label: "Barcha kurslar", href: "/kurslar" },
      { label: "Kategoriyalar", href: "/kategoriyalar" },
      { label: "Ommabop mavzular", href: "/ommabop-mavzular" },
      { label: "Sertifikatlar", href: "/sertifikatlar" },
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
    title: "Kompaniya",
    links: [
      { label: "Biz haqimizda", href: "/biz-haqimizda" },
      { label: "Karyera", href: "/karyera" },
      { label: "Yordam markazi", href: "/yordam" },
      { label: "Aloqa", href: "/aloqa" },
    ],
  },
];

// Brend ikonalari (lucide kutubxonasida yo'q). Havolalarni haqiqiy sahifalarga almashtiring.
const socials = [
  {
    label: "Telegram",
    href: "#",
    path: "M21.94 4.66 18.6 20.4c-.25 1.1-.9 1.38-1.83.86l-5.05-3.72-2.44 2.35c-.27.27-.5.5-1.02.5l.36-5.15 9.37-8.47c.41-.36-.09-.56-.63-.2L5.78 14.2.8 12.65c-1.08-.34-1.1-1.08.23-1.6L20.5 3.5c.9-.33 1.69.21 1.44 1.16Z",
  },
  {
    label: "Instagram",
    href: "#",
    path: "M12 2.2c3.2 0 3.58 0 4.85.07 3.25.15 4.77 1.69 4.92 4.92.06 1.27.07 1.65.07 4.85s0 3.58-.07 4.85c-.15 3.23-1.66 4.77-4.92 4.92-1.27.06-1.64.07-4.85.07s-3.58 0-4.85-.07c-3.26-.15-4.77-1.7-4.92-4.92C2.17 15.58 2.16 15.2 2.16 12s0-3.58.07-4.85C2.38 3.92 3.9 2.38 7.15 2.23 8.42 2.17 8.8 2.16 12 2.16ZM12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10Zm0 8.2a3.2 3.2 0 1 1 0-6.4 3.2 3.2 0 0 1 0 6.4Zm5.2-9.6a1.2 1.2 0 1 0 0 2.4 1.2 1.2 0 0 0 0-2.4Z",
  },
  {
    label: "YouTube",
    href: "#",
    path: "M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31.4 31.4 0 0 0 0 12a31.4 31.4 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31.4 31.4 0 0 0 24 12a31.4 31.4 0 0 0-.5-5.8ZM9.6 15.6V8.4l6.3 3.6-6.3 3.6Z",
  },
];

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-400">
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-10 grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr]">
        <div className="sm:col-span-2 lg:col-span-1">
          <Logo light />
          <p className="mt-4 text-sm leading-relaxed max-w-xs">
            O&apos;zbekistondagi tajribali ustozlardan onlayn o&apos;rganing — o&apos;zingizga qulay vaqtda, istalgan
            qurilmadan.
          </p>
          <div className="mt-5 space-y-2 text-sm">
            <p className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-gray-500" /> info@ustozuz.uz
            </p>
            <p className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-gray-500" /> Toshkent, O&apos;zbekiston
            </p>
          </div>
          <div className="flex gap-3 mt-6">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                className="w-10 h-10 rounded-xl bg-white/5 ring-1 ring-white/10 flex items-center justify-center text-gray-300 hover:bg-indigo-600 hover:text-white hover:ring-indigo-500 transition"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" aria-hidden>
                  <path d={s.path} />
                </svg>
              </a>
            ))}
          </div>
        </div>

        {columns.map((col) => (
          <div key={col.title}>
            <h4 className="text-white font-semibold text-sm mb-4">{col.title}</h4>
            <ul className="space-y-3">
              {col.links.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-sm">
          <p className="text-gray-500">© 2026 UstozUz. Barcha huquqlar himoyalangan.</p>
          <div className="flex gap-5 text-gray-500">
            <Link href="/maxfiylik" className="hover:text-white transition-colors">
              Maxfiylik siyosati
            </Link>
            <Link href="/shartlar" className="hover:text-white transition-colors">
              Foydalanish shartlari
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
