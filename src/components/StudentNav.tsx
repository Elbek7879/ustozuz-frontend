"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, Award, User } from "lucide-react";

const tabs = [
  { href: "/talaba/kurslarim", label: "Mening kurslarim", icon: BookOpen },
  { href: "/talaba/sertifikatlarim", label: "Sertifikatlarim", icon: Award },
  { href: "/talaba/profil", label: "Profil", icon: User },
];

export default function StudentNav() {
  const pathname = usePathname();

  return (
    <nav className="border-b border-gray-200 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex gap-5 sm:gap-6 overflow-x-auto [scrollbar-width:none]">
        {tabs.map((t) => {
          const Icon = t.icon;
          const active = pathname === t.href;
          return (
            <Link
              key={t.href}
              href={t.href}
              className={`flex items-center gap-2 whitespace-nowrap py-4 text-sm font-medium border-b-2 -mb-px transition ${
                active
                  ? "border-indigo-700 text-indigo-700"
                  : "border-transparent text-gray-500 hover:text-gray-800"
              }`}
            >
              <Icon className="w-4 h-4 hidden sm:block" />
              {t.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}