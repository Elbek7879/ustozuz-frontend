import {
  Code2,
  Palette,
  Briefcase,
  Languages,
  Camera,
  LineChart,
  HeartPulse,
  Music2,
  type LucideIcon,
} from "lucide-react";

export type Category = {
  title: string;
  desc: string;
  icon: LucideIcon;
  iconColor: string;
  bg: string;
  gradient: string;
};

export const categories: Category[] = [
  { title: "Dasturlash", desc: "Veb, mobil va sun'iy intellekt", icon: Code2, iconColor: "text-indigo-600", bg: "bg-indigo-50", gradient: "from-indigo-500 to-indigo-300" },
  { title: "Dizayn", desc: "UI/UX, grafik dizayn", icon: Palette, iconColor: "text-pink-600", bg: "bg-pink-50", gradient: "from-pink-500 to-rose-300" },
  { title: "Biznes", desc: "Marketing, moliya, boshqaruv", icon: Briefcase, iconColor: "text-amber-600", bg: "bg-amber-50", gradient: "from-amber-500 to-orange-300" },
  { title: "Tillar", desc: "Ingliz, rus va boshqa tillar", icon: Languages, iconColor: "text-emerald-600", bg: "bg-emerald-50", gradient: "from-emerald-500 to-teal-300" },
  { title: "Fotografiya", desc: "Kamera, tahrirlash, kompozitsiya", icon: Camera, iconColor: "text-sky-600", bg: "bg-sky-50", gradient: "from-sky-500 to-cyan-300" },
  { title: "Moliya", desc: "Investitsiya, buxgalteriya hisobi", icon: LineChart, iconColor: "text-violet-600", bg: "bg-violet-50", gradient: "from-violet-500 to-purple-300" },
  { title: "Sog'liq", desc: "Fitnes, ozuqalanish, salomatlik", icon: HeartPulse, iconColor: "text-red-600", bg: "bg-red-50", gradient: "from-red-500 to-rose-300" },
  { title: "Musiqa", desc: "Gitara, pianino, vokal", icon: Music2, iconColor: "text-fuchsia-600", bg: "bg-fuchsia-50", gradient: "from-fuchsia-500 to-pink-300" },
];