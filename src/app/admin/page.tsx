"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { Users, BookOpen, Wallet, Star, ArrowRight, UserPlus, BookPlus, Mail } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RequireRole from "@/components/RequireRole";
import Skeleton from "@/components/Skeleton";
import { useAuth } from "@/lib/auth/AuthContext";
import {
  getAdminStats,
  getContactMessages,
  type ApiActivityItem,
  type ApiAdminStats,
  type ApiContactMessage,
} from "@/lib/api";
import { formatPrice, timeAgo } from "@/lib/format";

const quickLinks = [
  { title: "Foydalanuvchilar", desc: "Talaba va ustozlarni boshqarish", href: "/admin/foydalanuvchilar" },
  { title: "Kurslar", desc: "Barcha kurslarni ko'rish va boshqarish", href: "/admin/kurslar" },
];

const activityStyle: Record<ApiActivityItem["type"], { icon: typeof UserPlus; color: string; bg: string }> = {
  USER: { icon: UserPlus, color: "text-indigo-600", bg: "bg-indigo-50" },
  COURSE: { icon: BookPlus, color: "text-emerald-600", bg: "bg-emerald-50" },
  ORDER: { icon: Wallet, color: "text-amber-600", bg: "bg-amber-50" },
};

function AdminDashboard() {
  const { token } = useAuth();
  const [stats, setStats] = useState<ApiAdminStats | null>(null);
  const [messages, setMessages] = useState<ApiContactMessage[]>([]);

  useEffect(() => {
    if (!token) return;
    getAdminStats(token)
      .then(setStats)
      .catch(() => toast.error("Statistikani yuklab bo'lmadi"));
    getContactMessages(token)
      .then(setMessages)
      .catch(() => {});
  }, [token]);

  const cards = stats
    ? [
        {
          label: "Jami foydalanuvchilar",
          value: stats.totalUsers,
          hint: `${stats.totalStudents} talaba, ${stats.totalInstructors} ustoz`,
          icon: Users,
          color: "text-indigo-600",
          bg: "bg-indigo-50",
        },
        {
          label: "Jami kurslar",
          value: stats.totalCourses,
          hint: `${stats.activeCourses} faol, ${stats.draftCourses} qoralama`,
          icon: BookOpen,
          color: "text-emerald-600",
          bg: "bg-emerald-50",
        },
        {
          label: "Umumiy daromad",
          value: formatPrice(stats.totalRevenue),
          hint: `${stats.paidOrders} ta xarid`,
          icon: Wallet,
          color: "text-amber-600",
          bg: "bg-amber-50",
        },
        {
          label: "O'rtacha reyting",
          value: stats.avgRating.toFixed(1),
          hint: "Faol kurslar bo'yicha",
          icon: Star,
          color: "text-pink-600",
          bg: "bg-pink-50",
        },
      ]
    : [];

  return (
    <section className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="text-2xl font-bold text-gray-900 mb-1">Admin panel</h1>
      <p className="text-gray-500 text-sm mb-8">
        UstozUz platformasining umumiy ko&apos;rinishi
      </p>

      {!stats ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-10">
          {Array.from({ length: 4 }, (_, i) => (
            <Skeleton key={i} className="h-28 rounded-2xl" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-10">
          {cards.map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.label} className="border border-gray-200 rounded-xl p-5">
                <div className={`w-10 h-10 rounded-lg ${s.bg} flex items-center justify-center mb-3`}>
                  <Icon className={`w-5 h-5 ${s.color}`} />
                </div>
                <p className="text-xl font-bold text-gray-900">{s.value}</p>
                <p className="text-xs text-gray-500 mt-1">{s.label}</p>
                <p className="text-xs text-gray-400 mt-0.5">{s.hint}</p>
              </div>
            );
          })}
        </div>
      )}

      <div className="grid md:grid-cols-[2fr_1fr] gap-8">
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Boshqaruv</h2>
          <div className="grid sm:grid-cols-2 gap-5">
            {quickLinks.map((link) => (
              <Link
                key={link.title}
                href={link.href}
                className="group flex items-center justify-between border border-gray-200 rounded-xl p-5 hover:border-indigo-300 hover:shadow-md transition-all"
              >
                <div>
                  <h3 className="font-semibold text-gray-900">{link.title}</h3>
                  <p className="text-sm text-gray-500 mt-1">{link.desc}</p>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-indigo-700 group-hover:translate-x-1 transition-all shrink-0 ml-3" />
              </Link>
            ))}
          </div>

          <h2 className="text-lg font-semibold text-gray-900 mt-10 mb-4 flex items-center gap-2">
            <Mail className="w-5 h-5 text-gray-400" />
            Aloqa xabarlari ({messages.length})
          </h2>
          {messages.length === 0 ? (
            <p className="text-sm text-gray-400">Hozircha xabarlar yo&apos;q</p>
          ) : (
            <div className="border border-gray-200 rounded-xl divide-y divide-gray-100">
              {messages.map((m) => (
                <div key={m.id} className="p-4">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <p className="text-sm font-medium text-gray-900">
                      {m.name}{" "}
                      <a href={`mailto:${m.email}`} className="text-indigo-700 font-normal hover:underline">
                        {m.email}
                      </a>
                    </p>
                    <span className="text-xs text-gray-400">{timeAgo(m.createdAt)}</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1 whitespace-pre-line">{m.message}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">So&apos;nggi harakatlar</h2>
          <div className="border border-gray-200 rounded-xl divide-y divide-gray-100">
            {stats?.recentActivity.length === 0 && (
              <p className="p-4 text-sm text-gray-400">Hozircha harakatlar yo&apos;q</p>
            )}
            {stats?.recentActivity.map((a, i) => {
              const style = activityStyle[a.type];
              const Icon = style.icon;
              return (
                <div key={i} className="flex items-start gap-3 p-4">
                  <div className={`w-8 h-8 rounded-lg ${style.bg} flex items-center justify-center shrink-0`}>
                    <Icon className={`w-4 h-4 ${style.color}`} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-800">{a.text}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{timeAgo(a.createdAt)}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function AdminPage() {
  return (
    <RequireRole role="ADMIN">
      <main>
        <Header />
        <AdminDashboard />
        <Footer />
      </main>
    </RequireRole>
  );
}
