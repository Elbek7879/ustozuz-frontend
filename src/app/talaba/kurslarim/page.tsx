"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import toast from "react-hot-toast";
import { PlayCircle, Award, BookOpen, CheckCircle2, Flame, ArrowRight, Search } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StudentNav from "@/components/StudentNav";
import RequireRole from "@/components/RequireRole";
import Skeleton from "@/components/Skeleton";
import { useAuth } from "@/lib/auth/AuthContext";
import { getEnrolledCourses, type ApiEnrolledCourse } from "@/lib/api";
import { categories } from "@/lib/categories";
import { coverOf } from "@/lib/images";

type Filter = "all" | "active" | "done";

function actionLabel(progress: number) {
  return progress === 100 ? "Qayta ko'rish" : progress === 0 ? "Boshlash" : "Davom etish";
}

function ProgressBar({ value, className = "h-1.5" }: { value: number; className?: string }) {
  return (
    <div className={`w-full bg-gray-100 rounded-full overflow-hidden ${className}`}>
      <div
        className={`h-full rounded-full transition-all duration-700 ${
          value === 100 ? "bg-emerald-500" : "bg-gradient-to-r from-indigo-600 to-purple-500"
        }`}
        style={{ width: `${value}%` }}
      />
    </div>
  );
}

function LoadingState() {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        {Array.from({ length: 4 }, (_, i) => (
          <Skeleton key={i} className="h-24" />
        ))}
      </div>
      <Skeleton className="h-48 rounded-3xl" />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 3 }, (_, i) => (
          <Skeleton key={i} className="h-72 rounded-2xl" />
        ))}
      </div>
    </div>
  );
}

function MyCoursesContent() {
  const { token } = useAuth();
  const [courses, setCourses] = useState<ApiEnrolledCourse[] | null>(null);
  const [filter, setFilter] = useState<Filter>("all");

  useEffect(() => {
    if (!token) return;
    getEnrolledCourses(token)
      .then(setCourses)
      .catch(() => toast.error("Kurslarni yuklab bo'lmadi"));
  }, [token]);

  if (courses === null) {
    return (
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8 md:py-10">
        <LoadingState />
      </section>
    );
  }

  if (courses.length === 0) {
    return (
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8 md:py-10">
        <div className="text-center py-16 px-6 rounded-3xl bg-gradient-to-b from-indigo-50 to-white ring-1 ring-indigo-100">
          <div className="w-16 h-16 rounded-2xl bg-white shadow-sm ring-1 ring-indigo-100 flex items-center justify-center mx-auto">
            <BookOpen className="w-8 h-8 text-indigo-600" />
          </div>
          <h1 className="mt-5 text-xl md:text-2xl font-bold text-gray-900">Hali kursingiz yo&apos;q</h1>
          <p className="mt-2 text-gray-500 max-w-md mx-auto">
            O&apos;zingizga yoqqan kursni tanlang — darslar shu yerda paydo bo&apos;ladi va o&apos;qishni istalgan
            vaqtda davom ettira olasiz.
          </p>
          <Link
            href="/kurslar"
            className="mt-6 inline-flex items-center gap-2 bg-indigo-600 text-white font-semibold px-6 py-3 rounded-xl hover:bg-indigo-700 transition"
          >
            <Search className="w-4 h-4" />
            Kurslarni ko&apos;rish
          </Link>
        </div>
      </section>
    );
  }

  const done = courses.filter((c) => c.progress === 100);
  const active = courses.filter((c) => c.progress < 100);
  const lessonsDone = courses.reduce((sum, c) => sum + c.completedLessons, 0);

  // "Davom ettiring": eng ko'p o'tilgan, lekin tugamagan kurs
  const resume =
    [...active].sort((a, b) => b.progress - a.progress || b.enrolledAt.localeCompare(a.enrolledAt))[0] ?? null;

  const stats = [
    { label: "Kurslarim", value: courses.length, icon: BookOpen, tone: "bg-indigo-50 text-indigo-600" },
    { label: "Jarayonda", value: active.length, icon: Flame, tone: "bg-amber-50 text-amber-600" },
    { label: "Tugallangan", value: done.length, icon: Award, tone: "bg-emerald-50 text-emerald-600" },
    { label: "Ko'rilgan darslar", value: lessonsDone, icon: CheckCircle2, tone: "bg-purple-50 text-purple-600" },
  ];

  const filters: { key: Filter; label: string; count: number }[] = [
    { key: "all", label: "Hammasi", count: courses.length },
    { key: "active", label: "Jarayonda", count: active.length },
    { key: "done", label: "Tugallangan", count: done.length },
  ];
  const visible = filter === "all" ? courses : filter === "active" ? active : done;

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

      {resume && (
        <div>
          <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-4">Davom ettiring</h2>
          <Link
            href={`/talaba/kurslarim/${resume.slug}`}
            className="group grid md:grid-cols-[320px_1fr] overflow-hidden rounded-3xl bg-white ring-1 ring-gray-200 hover:ring-indigo-300 hover:shadow-xl hover:shadow-indigo-100/60 transition"
          >
            <div className="relative aspect-video md:aspect-auto md:min-h-48">
              <Image
                src={coverOf(resume.imageUrl)}
                alt={resume.title}
                fill
                sizes="(max-width: 768px) 100vw, 320px"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                <span className="w-14 h-14 rounded-full bg-white/95 flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                  <PlayCircle className="w-7 h-7 text-indigo-700" />
                </span>
              </div>
            </div>
            <div className="p-5 md:p-7 flex flex-col justify-center">
              <p className="text-xs font-bold uppercase tracking-[0.15em] text-indigo-600">{resume.category}</p>
              <h3 className="mt-2 text-lg md:text-2xl font-bold text-gray-900 leading-snug line-clamp-2">{resume.title}</h3>
              <p className="mt-1 text-sm text-gray-500">{resume.instructorName}</p>
              <div className="mt-5 max-w-md">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600">
                    {resume.completedLessons}/{resume.lessonsCount} dars o&apos;tildi
                  </span>
                  <span className="font-bold text-gray-900">{resume.progress}%</span>
                </div>
                <ProgressBar value={resume.progress} className="h-2.5" />
              </div>
              <span className="mt-6 inline-flex w-fit items-center gap-2 bg-indigo-600 text-white text-sm font-semibold px-5 py-2.5 rounded-xl group-hover:bg-indigo-700 transition">
                {actionLabel(resume.progress)}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </span>
            </div>
          </Link>
        </div>
      )}

      <div>
        <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
          <h1 className="text-lg md:text-xl font-bold text-gray-900">Mening kurslarim</h1>
          <div className="flex gap-1 rounded-full bg-gray-100 p-1">
            {filters.map((f) => (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className={`rounded-full px-3 md:px-4 py-1.5 text-xs md:text-sm font-semibold transition ${
                  filter === f.key ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-800"
                }`}
              >
                {f.label} <span className="text-gray-400">{f.count}</span>
              </button>
            ))}
          </div>
        </div>

        {visible.length === 0 ? (
          <p className="py-12 text-center text-sm text-gray-500 rounded-2xl border border-dashed border-gray-300">
            {filter === "done"
              ? "Hali tugallangan kurs yo'q — oxirgi darsgacha yetib boring, sertifikat sizni kutmoqda!"
              : "Barcha kurslaringiz tugallangan. Ajoyib natija! 🎉"}
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {visible.map((course) => {
              const cat = categories.find((c) => c.title === course.category);
              const Icon = cat?.icon;

              return (
                <Link
                  key={course.courseId}
                  href={`/talaba/kurslarim/${course.slug}`}
                  className="group flex flex-col rounded-2xl overflow-hidden bg-white ring-1 ring-gray-200 hover:ring-indigo-200 hover:shadow-xl hover:shadow-gray-200/70 hover:-translate-y-1 transition duration-300"
                >
                  <div className="relative aspect-video">
                    <Image
                      src={coverOf(course.imageUrl)}
                      alt={course.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                      <PlayCircle className="w-12 h-12 text-white" />
                    </div>
                    {course.progress === 100 && (
                      <span className="absolute top-3 right-3 bg-emerald-600 text-white text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1 shadow">
                        <Award className="w-3.5 h-3.5" /> Tugallangan
                      </span>
                    )}
                  </div>

                  <div className="p-5 flex-1 flex flex-col">
                    <span className="text-xs font-semibold text-indigo-600 flex items-center gap-1.5">
                      {Icon && <Icon className="w-3.5 h-3.5" />} {course.category}
                    </span>
                    <h3 className="mt-2 font-bold text-gray-900 leading-snug line-clamp-2">{course.title}</h3>
                    <p className="text-sm text-gray-500 mt-1">{course.instructorName}</p>

                    <div className="mt-auto pt-5">
                      <div className="flex justify-between text-xs text-gray-500 mb-1.5">
                        <span>
                          {course.completedLessons}/{course.lessonsCount} dars
                        </span>
                        <span className="font-semibold text-gray-700">{course.progress}%</span>
                      </div>
                      <ProgressBar value={course.progress} />
                      <p className="mt-4 text-sm font-semibold text-indigo-700 flex items-center gap-1">
                        {actionLabel(course.progress)}
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                      </p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

export default function MyCoursesPage() {
  return (
    <RequireRole>
      <main>
        <Header />
        <StudentNav />
        <MyCoursesContent />
        <Footer />
      </main>
    </RequireRole>
  );
}
