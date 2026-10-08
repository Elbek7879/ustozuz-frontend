"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Users, BookOpen, Wallet, Star, UserPlus, BookPlus, Mail, TrendingUp, PieChart, Activity } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RequireRole from "@/components/RequireRole";
import AdminNav from "@/components/AdminNav";
import CountUp from "@/components/CountUp";
import Skeleton from "@/components/Skeleton";
import { useAuth } from "@/lib/auth/AuthContext";
import {
  getAdminCourses,
  getAdminStats,
  getContactMessages,
  type ApiActivityItem,
  type ApiAdminCourse,
  type ApiAdminStats,
  type ApiContactMessage,
} from "@/lib/api";
import { formatNumber, timeAgo } from "@/lib/format";

const activityStyle: Record<ApiActivityItem["type"], { icon: typeof UserPlus; color: string; bg: string }> = {
  USER: { icon: UserPlus, color: "text-indigo-600", bg: "bg-indigo-50" },
  COURSE: { icon: BookPlus, color: "text-emerald-600", bg: "bg-emerald-50" },
  ORDER: { icon: Wallet, color: "text-amber-600", bg: "bg-amber-50" },
};

const palette = ["#4f46e5", "#7c3aed", "#ec4899", "#f59e0b", "#10b981", "#06b6d4", "#ef4444", "#64748b"];

// Eng ko'p talabasi bor kurslar — gorizontal ustunlar
function TopCoursesChart({ courses }: { courses: ApiAdminCourse[] }) {
  const top = [...courses].sort((a, b) => b.studentsCount - a.studentsCount).slice(0, 6);
  const max = Math.max(1, ...top.map((c) => c.studentsCount));

  return (
    <div className="space-y-4">
      {top.map((c, i) => (
        <div key={c.id}>
          <div className="flex items-baseline justify-between gap-3 text-sm">
            <p className="font-medium text-gray-800 truncate">{c.title}</p>
            <p className="shrink-0 font-bold text-gray-900">{formatNumber(c.studentsCount)}</p>
          </div>
          <div className="mt-1.5 h-2.5 rounded-full bg-gray-100 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-indigo-600 to-purple-500 origin-left animate-grow"
              style={{ width: `${(c.studentsCount / max) * 100}%`, animationDelay: `${i * 80}ms` }}
            />
          </div>
          <p className="mt-1 text-xs text-gray-400">
            {c.instructorName} · {c.category}
          </p>
        </div>
      ))}
    </div>
  );
}

// Talabalarning kategoriyalar bo'yicha taqsimoti — doira (donut) diagramma
function CategoryDonut({ courses }: { courses: ApiAdminCourse[] }) {
  const sums = new Map<string, number>();
  for (const c of courses) sums.set(c.category, (sums.get(c.category) ?? 0) + c.studentsCount);
  const data = [...sums.entries()].sort((a, b) => b[1] - a[1]);
  const total = data.reduce((s, [, v]) => s + v, 0);

  const size = 180;
  const stroke = 26;
  const r = (size - stroke) / 2;
  const circumference = 2 * Math.PI * r;
  let offset = 0;

  return (
    <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row items-center gap-6">
      <div className="relative shrink-0" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#f3f4f6" strokeWidth={stroke} />
          {total > 0 &&
            data.map(([name, value], i) => {
              const len = (value / total) * circumference;
              const seg = (
                <circle
                  key={name}
                  cx={size / 2}
                  cy={size / 2}
                  r={r}
                  fill="none"
                  stroke={palette[i % palette.length]}
                  strokeWidth={stroke}
                  strokeDasharray={`${Math.max(len - 2, 0)} ${circumference}`}
                  strokeDashoffset={-offset}
                />
              );
              offset += len;
              return seg;
            })}
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <p className="text-2xl font-extrabold text-gray-900">{formatNumber(total)}</p>
          <p className="text-xs text-gray-500">talaba</p>
        </div>
      </div>

      <ul className="w-full space-y-2">
        {data.map(([name, value], i) => (
          <li key={name} className="flex items-center gap-2.5 text-sm">
            <span className="w-3 h-3 rounded-full shrink-0" style={{ background: palette[i % palette.length] }} />
            <span className="flex-1 text-gray-700 truncate">{name}</span>
            <span className="font-semibold text-gray-900">{total ? Math.round((value / total) * 100) : 0}%</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function AdminDashboard() {
  const { token } = useAuth();
  const [stats, setStats] = useState<ApiAdminStats | null>(null);
  const [courses, setCourses] = useState<ApiAdminCourse[] | null>(null);
  const [messages, setMessages] = useState<ApiContactMessage[]>([]);

  useEffect(() => {
    if (!token) return;
    getAdminStats(token)
      .then(setStats)
      .catch(() => toast.error("Statistikani yuklab bo'lmadi"));
    getAdminCourses(token)
      .then(setCourses)
      .catch(() => setCourses([]));
    getContactMessages(token)
      .then(setMessages)
      .catch(() => {});
  }, [token]);

  const cards = stats
    ? [
        {
          label: "Foydalanuvchilar",
          value: <CountUp value={stats.totalUsers} />,
          hint: `${stats.totalStudents} talaba, ${stats.totalInstructors} ustoz`,
          icon: Users,
          tone: "bg-indigo-50 text-indigo-600",
        },
        {
          label: "Kurslar",
          value: <CountUp value={stats.totalCourses} />,
          hint: `${stats.activeCourses} faol, ${stats.draftCourses} qoralama`,
          icon: BookOpen,
          tone: "bg-emerald-50 text-emerald-600",
        },
        {
          label: "Umumiy daromad",
          value: <CountUp value={stats.totalRevenue} suffix=" so'm" />,
          hint: `${stats.paidOrders} ta xarid`,
          icon: Wallet,
          tone: "bg-amber-50 text-amber-600",
        },
        {
          label: "O'rtacha reyting",
          value: <CountUp value={stats.avgRating} decimals={1} />,
          hint: "Faol kurslar bo'yicha",
          icon: Star,
          tone: "bg-pink-50 text-pink-600",
        },
      ]
    : [];

  const cardClass = "min-w-0 rounded-3xl bg-white ring-1 ring-gray-200 p-5 md:p-6";

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8 md:py-10 space-y-6">
      {!stats ? (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          {Array.from({ length: 4 }, (_, i) => (
            <Skeleton key={i} className="h-32 rounded-2xl" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          {cards.map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.label} className="rounded-2xl bg-white ring-1 ring-gray-200 p-4 md:p-5">
                <span className={`w-11 h-11 rounded-xl flex items-center justify-center ${s.tone}`}>
                  <Icon className="w-5 h-5" />
                </span>
                <p className="mt-4 text-xl md:text-2xl font-extrabold text-gray-900 leading-none break-words">{s.value}</p>
                <p className="mt-1.5 text-sm font-medium text-gray-600">{s.label}</p>
                <p className="mt-0.5 text-xs text-gray-400">{s.hint}</p>
              </div>
            );
          })}
        </div>
      )}

      <div className="grid lg:grid-cols-[3fr_2fr] gap-6">
        <div className={cardClass}>
          <h2 className="flex items-center gap-2 font-bold text-gray-900">
            <TrendingUp className="w-5 h-5 text-indigo-600" />
            Eng mashhur kurslar
          </h2>
          <p className="mt-1 mb-5 text-sm text-gray-500">Talabalar soni bo&apos;yicha</p>
          {courses === null ? (
            <div className="space-y-4">
              {Array.from({ length: 5 }, (_, i) => (
                <Skeleton key={i} className="h-10" />
              ))}
            </div>
          ) : courses.length === 0 ? (
            <p className="text-sm text-gray-400">Hozircha kurslar yo&apos;q</p>
          ) : (
            <TopCoursesChart courses={courses} />
          )}
        </div>

        <div className={cardClass}>
          <h2 className="flex items-center gap-2 font-bold text-gray-900">
            <PieChart className="w-5 h-5 text-purple-600" />
            Yo&apos;nalishlar ulushi
          </h2>
          <p className="mt-1 mb-5 text-sm text-gray-500">Talabalarning kategoriyalar bo&apos;yicha taqsimoti</p>
          {courses === null ? (
            <Skeleton className="h-48 rounded-2xl" />
          ) : courses.length === 0 ? (
            <p className="text-sm text-gray-400">Hozircha ma&apos;lumot yo&apos;q</p>
          ) : (
            <CategoryDonut courses={courses} />
          )}
        </div>
      </div>

      <div className="grid lg:grid-cols-[3fr_2fr] gap-6 items-start">
        <div className={cardClass}>
          <h2 className="flex items-center gap-2 font-bold text-gray-900 mb-4">
            <Mail className="w-5 h-5 text-indigo-600" />
            Aloqa xabarlari
            <span className="text-xs font-semibold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-full">
              {messages.length}
            </span>
          </h2>
          {messages.length === 0 ? (
            <p className="text-sm text-gray-400">Hozircha xabarlar yo&apos;q</p>
          ) : (
            <div className="divide-y divide-gray-100 -mx-1">
              {messages.map((m) => (
                <div key={m.id} className="px-1 py-4 first:pt-0 last:pb-0">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <p className="text-sm font-semibold text-gray-900">
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

        <div className={cardClass}>
          <h2 className="flex items-center gap-2 font-bold text-gray-900 mb-4">
            <Activity className="w-5 h-5 text-emerald-600" />
            So&apos;nggi harakatlar
          </h2>
          {!stats ? (
            <div className="space-y-3">
              {Array.from({ length: 4 }, (_, i) => (
                <Skeleton key={i} className="h-12" />
              ))}
            </div>
          ) : stats.recentActivity.length === 0 ? (
            <p className="text-sm text-gray-400">Hozircha harakatlar yo&apos;q</p>
          ) : (
            <ol className="relative space-y-4 before:absolute before:left-4 before:top-2 before:bottom-2 before:w-px before:bg-gray-100">
              {stats.recentActivity.map((a, i) => {
                const style = activityStyle[a.type];
                const Icon = style.icon;
                return (
                  <li key={i} className="relative flex items-start gap-3">
                    <span className={`relative w-8 h-8 rounded-full ${style.bg} ring-4 ring-white flex items-center justify-center shrink-0`}>
                      <Icon className={`w-4 h-4 ${style.color}`} />
                    </span>
                    <div className="min-w-0">
                      <p className="text-sm text-gray-800">{a.text}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{timeAgo(a.createdAt)}</p>
                    </div>
                  </li>
                );
              })}
            </ol>
          )}
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
        <AdminNav />
        <AdminDashboard />
        <Footer />
      </main>
    </RequireRole>
  );
}
