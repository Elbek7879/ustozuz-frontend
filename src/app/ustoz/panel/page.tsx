"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import toast from "react-hot-toast";
import { Plus, Eye, Pencil, BookOpen, Users, Star, PlayCircle, Sparkles } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RequireRole from "@/components/RequireRole";
import InstructorNav from "@/components/InstructorNav";
import CountUp from "@/components/CountUp";
import Skeleton from "@/components/Skeleton";
import { useAuth } from "@/lib/auth/AuthContext";
import { getInstructorCourses, type ApiInstructorCourse } from "@/lib/api";
import { coverOf } from "@/lib/images";
import { formatNumber, formatPrice } from "@/lib/format";

const statusLabel: Record<string, { text: string; className: string }> = {
  ACTIVE: { text: "Faol", className: "bg-emerald-500 text-white" },
  DRAFT: { text: "Qoralama", className: "bg-amber-400 text-amber-950" },
  HIDDEN: { text: "Yashirin", className: "bg-gray-700 text-white" },
};

function InstructorPanelContent() {
  const { token } = useAuth();
  const [courses, setCourses] = useState<ApiInstructorCourse[] | null>(null);

  useEffect(() => {
    if (!token) return;
    getInstructorCourses(token)
      .then(setCourses)
      .catch(() => toast.error("Kurslarni yuklab bo'lmadi"));
  }, [token]);

  if (courses === null) {
    return (
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8 md:py-10 space-y-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          {Array.from({ length: 4 }, (_, i) => (
            <Skeleton key={i} className="h-24" />
          ))}
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 3 }, (_, i) => (
            <Skeleton key={i} className="h-80 rounded-2xl" />
          ))}
        </div>
      </section>
    );
  }

  const totalStudents = courses.reduce((sum, c) => sum + c.studentsCount, 0);
  const totalLessons = courses.reduce((sum, c) => sum + c.lessonsCount, 0);
  const rated = courses.filter((c) => c.rating > 0);
  const avgRating = rated.length ? rated.reduce((sum, c) => sum + c.rating, 0) / rated.length : 0;

  const stats = [
    { label: "Kurslarim", value: <CountUp value={courses.length} />, icon: BookOpen, tone: "bg-indigo-50 text-indigo-600" },
    { label: "Talabalar", value: <CountUp value={totalStudents} />, icon: Users, tone: "bg-emerald-50 text-emerald-600" },
    {
      label: "O'rtacha reyting",
      value: avgRating ? <CountUp value={avgRating} decimals={1} /> : "—",
      icon: Star,
      tone: "bg-amber-50 text-amber-600",
    },
    { label: "Video darslar", value: <CountUp value={totalLessons} />, icon: PlayCircle, tone: "bg-purple-50 text-purple-600" },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8 md:py-10 space-y-10">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        {stats.map(({ label, value, icon: Icon, tone }) => (
          <div key={label} className="flex items-center gap-3 md:gap-4 rounded-2xl bg-white ring-1 ring-gray-200 p-4 md:p-5">
            <span className={`w-11 h-11 md:w-12 md:h-12 rounded-xl flex items-center justify-center shrink-0 ${tone}`}>
              <Icon className="w-5 h-5 md:w-6 md:h-6" />
            </span>
            <div className="min-w-0">
              <p className="text-2xl md:text-3xl font-extrabold text-gray-900 leading-none">{value}</p>
              <p className="mt-1 text-xs md:text-sm text-gray-500 leading-tight">{label}</p>
            </div>
          </div>
        ))}
      </div>

      <div>
        <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
          <h1 className="text-lg md:text-xl font-bold text-gray-900">Mening kurslarim</h1>
          <Link
            href="/ustoz/kurs-yaratish"
            className="flex items-center gap-2 bg-indigo-600 text-white text-sm font-semibold px-4 py-2.5 rounded-xl hover:bg-indigo-700 transition"
          >
            <Plus className="w-4 h-4" />
            Yangi kurs yaratish
          </Link>
        </div>

        {courses.length === 0 ? (
          <div className="text-center py-16 px-6 rounded-3xl bg-gradient-to-b from-indigo-50 to-white ring-1 ring-indigo-100">
            <div className="w-16 h-16 rounded-2xl bg-white shadow-sm ring-1 ring-indigo-100 flex items-center justify-center mx-auto">
              <Sparkles className="w-8 h-8 text-indigo-600" />
            </div>
            <p className="mt-5 text-xl font-bold text-gray-900">Birinchi kursingizni yarating</p>
            <p className="mt-2 text-gray-500 max-w-md mx-auto">
              Bilimingizni minglab talabalar bilan ulashing: kurs ma&apos;lumotlarini kiriting, darslar va YouTube
              videolarini qo&apos;shing.
            </p>
            <Link
              href="/ustoz/kurs-yaratish"
              className="mt-6 inline-flex items-center gap-2 bg-indigo-600 text-white font-semibold px-6 py-3 rounded-xl hover:bg-indigo-700 transition"
            >
              <Plus className="w-4 h-4" />
              Kurs yaratish
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {courses.map((course) => {
              const status = statusLabel[course.status] ?? statusLabel.DRAFT;
              return (
                <div
                  key={course.id}
                  className="group flex flex-col rounded-2xl overflow-hidden bg-white ring-1 ring-gray-200 hover:shadow-xl hover:shadow-gray-200/70 transition duration-300"
                >
                  <div className="relative aspect-video">
                    <Image
                      src={coverOf(course.imageUrl)}
                      alt={course.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className={`absolute top-3 left-3 text-xs font-semibold px-2.5 py-1 rounded-full shadow ${status.className}`}>
                      {status.text}
                    </span>
                    <span className="absolute bottom-3 right-3 text-sm font-bold bg-white/95 text-gray-900 px-3 py-1 rounded-full shadow">
                      {formatPrice(course.price)}
                    </span>
                  </div>

                  <div className="p-5 flex-1 flex flex-col">
                    <p className="text-xs font-semibold text-indigo-600">{course.category}</p>
                    <h3 className="mt-1.5 font-bold text-gray-900 leading-snug line-clamp-2">{course.title}</h3>

                    <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                      <div className="rounded-xl bg-gray-50 py-2">
                        <p className="text-sm font-bold text-gray-900">{formatNumber(course.studentsCount)}</p>
                        <p className="text-[11px] text-gray-500">talaba</p>
                      </div>
                      <div className="rounded-xl bg-gray-50 py-2">
                        <p className="text-sm font-bold text-gray-900">{course.lessonsCount}</p>
                        <p className="text-[11px] text-gray-500">dars</p>
                      </div>
                      <div className="rounded-xl bg-gray-50 py-2">
                        <p className="text-sm font-bold text-gray-900 flex items-center justify-center gap-1">
                          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                          {course.rating > 0 ? course.rating.toFixed(1) : "—"}
                        </p>
                        <p className="text-[11px] text-gray-500">reyting</p>
                      </div>
                    </div>

                    <div className="mt-auto pt-5 flex gap-2">
                      <Link
                        href={`/ustoz/kurslar/${course.id}/tahrirlash`}
                        className="flex-1 flex items-center justify-center gap-1.5 text-sm font-semibold bg-indigo-50 text-indigo-700 py-2.5 rounded-xl hover:bg-indigo-600 hover:text-white transition"
                      >
                        <Pencil className="w-4 h-4" />
                        Tahrirlash
                      </Link>
                      {course.status === "ACTIVE" && (
                        <Link
                          href={`/kurslar/${course.slug}`}
                          title="Saytda ko'rish"
                          aria-label="Saytda ko'rish"
                          className="w-11 flex items-center justify-center rounded-xl ring-1 ring-gray-200 text-gray-500 hover:text-indigo-700 hover:ring-indigo-300 transition"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

export default function InstructorPanel() {
  return (
    <RequireRole role="INSTRUCTOR">
      <main>
        <Header />
        <InstructorNav />
        <InstructorPanelContent />
        <Footer />
      </main>
    </RequireRole>
  );
}
