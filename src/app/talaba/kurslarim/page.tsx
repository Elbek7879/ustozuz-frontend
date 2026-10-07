"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import toast from "react-hot-toast";
import { PlayCircle, Award } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StudentNav from "@/components/StudentNav";
import RequireRole from "@/components/RequireRole";
import { useAuth } from "@/lib/auth/AuthContext";
import { getEnrolledCourses, type ApiEnrolledCourse } from "@/lib/api";
import { categories } from "@/lib/categories";
import { coverOf } from "@/lib/images";

function MyCoursesContent() {
  const { token } = useAuth();
  const [courses, setCourses] = useState<ApiEnrolledCourse[] | null>(null);

  useEffect(() => {
    if (!token) return;
    getEnrolledCourses(token)
      .then(setCourses)
      .catch(() => toast.error("Kurslarni yuklab bo'lmadi"));
  }, [token]);

  const done = courses?.filter((c) => c.progress === 100).length ?? 0;

  return (
    <section className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Mening kurslarim</h1>

      {courses === null ? (
        <p className="text-gray-400">Yuklanmoqda...</p>
      ) : courses.length === 0 ? (
        <div className="text-center py-16 border border-dashed border-gray-300 rounded-xl mt-6">
          <p className="text-gray-500 mb-4">Siz hali hech qanday kurs sotib olmagansiz.</p>
          <Link href="/kurslar" className="text-indigo-700 font-medium hover:underline">
            Kurslarni ko&apos;rish →
          </Link>
        </div>
      ) : (
        <>
          <p className="text-gray-500 text-sm mb-8">
            {courses.length} ta kurs, shundan {done} tasi tugallangan.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {courses.map((course) => {
              const cat = categories.find((c) => c.title === course.category);
              const Icon = cat?.icon;

              return (
                <Link
                  key={course.courseId}
                  href={`/talaba/kurslarim/${course.slug}`}
                  className="group border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-all bg-white block"
                >
                  <div className="relative h-32">
                    <Image
                      src={coverOf(course.imageUrl)}
                      alt={course.title}
                      fill
                      sizes="360px"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                      <PlayCircle className="w-10 h-10 text-white" />
                    </div>
                    {course.progress === 100 && (
                      <div className="absolute top-2 right-2 bg-emerald-600 text-white text-xs font-medium px-2 py-1 rounded-full flex items-center gap-1">
                        <Award className="w-3 h-3" /> Tugallangan
                      </div>
                    )}
                  </div>

                  <div className="p-4">
                    <span className="text-xs font-medium text-gray-500 flex items-center gap-1">
                      {Icon && <Icon className="w-3.5 h-3.5" />} {course.category}
                    </span>
                    <h3 className="font-semibold text-gray-900 text-sm leading-snug line-clamp-2 mt-1">
                      {course.title}
                    </h3>
                    <p className="text-xs text-gray-500 mt-1">{course.instructorName}</p>

                    <div className="mt-3">
                      <div className="flex justify-between text-xs text-gray-500 mb-1">
                        <span>
                          {course.completedLessons}/{course.lessonsCount} dars
                        </span>
                        <span>{course.progress}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-indigo-700 rounded-full"
                          style={{ width: `${course.progress}%` }}
                        />
                      </div>
                    </div>

                    <p className="text-sm font-medium text-indigo-700 mt-4">
                      {course.progress === 100
                        ? "Qayta ko'rish"
                        : course.progress === 0
                        ? "Boshlash"
                        : "Davom etish"}{" "}
                      →
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </>
      )}
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
