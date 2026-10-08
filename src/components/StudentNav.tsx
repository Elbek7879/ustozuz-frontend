"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, Award, User } from "lucide-react";
import { useAuth } from "@/lib/auth/AuthContext";

const tabs = [
  { href: "/talaba/kurslarim", label: "Mening kurslarim", short: "Kurslarim", icon: BookOpen },
  { href: "/talaba/sertifikatlarim", label: "Sertifikatlarim", short: "Sertifikatlar", icon: Award },
  { href: "/talaba/profil", label: "Profil", short: "Profil", icon: User },
];

// Talaba kabinetining yuqori qismi: salomlashish va bo'limlar
export default function StudentNav() {
  const pathname = usePathname();
  const { user } = useAuth();
  const firstName = user?.name.split(" ").filter(Boolean)[0] ?? "";

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-gray-950 via-gray-900 to-indigo-950">
      <div className="pointer-events-none absolute -top-24 right-0 w-96 h-96 rounded-full bg-indigo-600/25 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 left-10 w-80 h-80 rounded-full bg-purple-600/15 blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 pt-8 md:pt-10">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-500 text-white text-xl md:text-2xl font-bold flex items-center justify-center shadow-lg shadow-indigo-900/50 shrink-0">
            {firstName.charAt(0).toUpperCase() || "U"}
          </div>
          <div className="min-w-0">
            <p className="text-2xl md:text-3xl font-extrabold tracking-tight text-white truncate">
              Salom, {firstName || "do'stim"}! 👋
            </p>
            <p className="mt-1 text-sm md:text-base text-gray-400">Bugun ham bir qadam oldinga — o&apos;qishda davom eting.</p>
          </div>
        </div>

        <nav className="mt-7 flex gap-1.5 sm:gap-2 overflow-x-auto pb-4 [scrollbar-width:none]" aria-label="Kabinet bo'limlari">
          {tabs.map((t) => {
            const Icon = t.icon;
            const active = pathname === t.href;
            return (
              <Link
                key={t.href}
                href={t.href}
                aria-current={active ? "page" : undefined}
                className={`flex items-center gap-1.5 sm:gap-2 whitespace-nowrap rounded-full px-3 sm:px-4 py-2 text-sm font-semibold transition ${
                  active
                    ? "bg-white text-gray-900 shadow"
                    : "bg-white/10 text-gray-300 hover:bg-white/15 hover:text-white"
                }`}
              >
                <Icon className="w-4 h-4" />
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
