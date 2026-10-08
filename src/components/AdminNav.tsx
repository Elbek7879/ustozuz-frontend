"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Users, BookOpen, ShieldCheck } from "lucide-react";

const tabs = [
  { href: "/admin", label: "Umumiy ko'rinish", short: "Umumiy", icon: LayoutDashboard },
  { href: "/admin/foydalanuvchilar", label: "Foydalanuvchilar", short: "Foydalanuvchilar", icon: Users },
  { href: "/admin/kurslar", label: "Kurslar", short: "Kurslar", icon: BookOpen },
];

// Admin bo'limlarining yuqori qismi: sarlavha va bo'limlar
export default function AdminNav() {
  const pathname = usePathname();

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-gray-950 via-gray-900 to-indigo-950">
      <div className="pointer-events-none absolute -top-24 right-0 w-96 h-96 rounded-full bg-indigo-600/25 blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 pt-8 md:pt-10">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-500 text-white flex items-center justify-center shadow-lg shadow-indigo-900/50 shrink-0">
            <ShieldCheck className="w-7 h-7" />
          </div>
          <div className="min-w-0">
            <p className="text-2xl md:text-3xl font-extrabold tracking-tight text-white">Admin panel</p>
            <p className="mt-1 text-sm md:text-base text-gray-400">UstozUz platformasini boshqarish</p>
          </div>
        </div>

        <nav className="mt-7 flex gap-1.5 sm:gap-2 overflow-x-auto pb-4 [scrollbar-width:none]" aria-label="Admin bo'limlari">
          {tabs.map((t) => {
            const Icon = t.icon;
            const active = pathname === t.href;
            return (
              <Link
                key={t.href}
                href={t.href}
                aria-current={active ? "page" : undefined}
                className={`flex items-center gap-1.5 sm:gap-2 whitespace-nowrap rounded-full px-3 sm:px-4 py-2 text-sm font-semibold transition ${
                  active ? "bg-white text-gray-900 shadow" : "bg-white/10 text-gray-300 hover:bg-white/15 hover:text-white"
                }`}
              >
                <Icon className="w-4 h-4 hidden sm:block" />
                <span className="sm:hidden">{t.short}</span>
                <span className="hidden sm:inline">{t.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
