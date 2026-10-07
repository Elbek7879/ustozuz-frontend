"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RequireRole from "@/components/RequireRole";
import { useAuth } from "@/lib/auth/AuthContext";
import { getMyCourses, type ApiInstructorCourse } from "@/lib/api";
import { formatPrice } from "@/lib/format";
import { Plus, Eye, Pencil } from "lucide-react";

const statusLabel: Record<string, { text: string; className: string }> = {
  ACTIVE: { text: "Faol", className: "bg-emerald-50 text-emerald-700" },
  DRAFT: { text: "Qoralama", className: "bg-amber-50 text-amber-700" },
  HIDDEN: { text: "Yashirin", className: "bg-gray-100 text-gray-600" },
};

function InstructorPanelContent() {
  const { user, token } = useAuth();
  const [courses, setCourses] = useState<ApiInstructorCourse[] | null>(null);

  useEffect(() => {
    if (!token) return;
    getMyCourses(token)
      .then(setCourses)
      .catch(() => toast.error("Kurslarni yuklab bo'lmadi"));
  }, [token]);

  const totalStudents = courses?.reduce((sum, c) => sum + c.studentsCount, 0) ?? 0;
  const avgRating = courses && courses.length > 0
    ? (courses.reduce((sum, c) => sum + c.rating, 0) / courses.length).toFixed(1)
    : "—";

  return (
    <main>
      <Header />

      <section className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex items-center justify-between mb-8 flex-wrap gap-3">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Ustoz paneli</h1>
            <p className="text-gray-500 text-sm mt-1">
              Xush kelibsiz, {user?.name}
            </p>
          </div>
          <Link
            href="/ustoz/kurs-yaratish"
            className="flex items-center gap-2 bg-indigo-700 text-white text-sm font-medium px-4 py-2.5 rounded-md hover:bg-indigo-800"
          >
            <Plus className="w-4 h-4" />
            Yangi kurs yaratish
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-10">
          <div className="border border-gray-200 rounded-xl p-5">
            <p className="text-xl font-bold text-gray-900">{courses?.length ?? "—"}</p>
            <p className="text-xs text-gray-500 mt-1">Jami kurslar</p>
          </div>
          <div className="border border-gray-200 rounded-xl p-5">
            <p className="text-xl font-bold text-gray-900">{totalStudents}</p>
            <p className="text-xs text-gray-500 mt-1">Talabalar</p>
          </div>
          <div className="border border-gray-200 rounded-xl p-5">
            <p className="text-xl font-bold text-gray-900">{avgRating}</p>
            <p className="text-xs text-gray-500 mt-1">O&apos;rtacha reyting</p>
          </div>
          <div className="border border-gray-200 rounded-xl p-5">
            <p className="text-xl font-bold text-gray-900">—</p>
            <p className="text-xs text-gray-500 mt-1">Bu oygi daromad</p>
          </div>
        </div>

        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Mening kurslarim
        </h2>

        {courses === null ? (
          <p className="text-gray-400">Yuklanmoqda...</p>
        ) : courses.length === 0 ? (
          <div className="text-center py-16 border border-dashed border-gray-300 rounded-xl">
            <p className="text-gray-500 mb-4">Siz hali kurs yaratmagansiz.</p>
            <Link
              href="/ustoz/kurs-yaratish"
              className="text-indigo-700 font-medium hover:underline"
            >
              Birinchi kursingizni yarating →
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {courses.map((course) => {
              const status = statusLabel[course.status] ?? statusLabel.DRAFT;
              return (
                <div
                  key={course.id}
                  className="flex flex-wrap items-center justify-between gap-3 border border-gray-200 rounded-lg p-4"
                >
                  <div className="min-w-0">
                    <p className="font-medium text-gray-900 text-sm">
                      {course.title}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {course.category} • {course.studentsCount} talaba •{" "}
                      {course.rating} ⭐
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <p className="font-semibold text-gray-900 text-sm">
                      {formatPrice(course.price)}
                    </p>
                    <span
                      className={`text-xs px-2.5 py-1 rounded-full font-medium ${status.className}`}
                    >
                      {status.text}
                    </span>
                    {course.status === "ACTIVE" && (
                      <Link
                        href={`/kurslar/${course.slug}`}
                        title="Ko'rish"
                        aria-label="Ko'rish"
                        className="p-2 text-gray-400 hover:text-indigo-700 hover:bg-indigo-50 rounded"
                      >
                        <Eye className="w-4 h-4" />
                      </Link>
                    )}
                    <Link
                      href={`/ustoz/kurslar/${course.id}/tahrirlash`}
                      className="flex items-center gap-1.5 text-sm font-medium border border-gray-300 text-gray-700 px-3 py-1.5 rounded-md hover:border-indigo-400 hover:text-indigo-700"
                    >
                      <Pencil className="w-3.5 h-3.5" />
                      Tahrirlash
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      <Footer />
    </main>
  );
}

export default function InstructorPanel() {
  return (
    <RequireRole role="INSTRUCTOR">
      <InstructorPanelContent />
    </RequireRole>
  );
}