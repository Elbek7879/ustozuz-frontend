"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { PlayCircle, CheckCircle2, Circle, ArrowLeft, Award, ChevronRight } from "lucide-react";
import Header from "@/components/Header";
import RequireRole from "@/components/RequireRole";
import { useAuth } from "@/lib/auth/AuthContext";
import {
  ApiError,
  getEnrolledCourse,
  setLessonCompleted,
  type ApiEnrolledCourseDetail,
  type ApiEnrolledLesson,
} from "@/lib/api";

function LessonView({ slug }: { slug: string }) {
  const { token } = useAuth();
  const [course, setCourse] = useState<ApiEnrolledCourseDetail | null>(null);
  const [notEnrolled, setNotEnrolled] = useState(false);
  const [currentId, setCurrentId] = useState<number | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!token) return;
    getEnrolledCourse(token, slug)
      .then((c) => {
        setCourse(c);
        // Birinchi tugallanmagan darsdan boshlaymiz
        const firstOpen = c.lessons.find((l) => !l.completed) ?? c.lessons[0];
        setCurrentId(firstOpen?.id ?? null);
      })
      .catch((err) => {
        if (err instanceof ApiError && err.status === 404) setNotEnrolled(true);
        else toast.error("Kursni yuklab bo'lmadi");
      });
  }, [token, slug]);

  if (notEnrolled) {
    return (
      <div className="max-w-xl mx-auto px-6 py-24 text-center">
        <p className="text-gray-500 mb-4">Bu kurs sizning kurslaringiz orasida yo&apos;q.</p>
        <Link href={`/kurslar/${slug}`} className="text-indigo-700 font-medium hover:underline">
          Kurs sahifasiga o&apos;tish →
        </Link>
      </div>
    );
  }

  if (!course || !token) {
    return <p className="max-w-7xl mx-auto px-6 py-10 text-gray-400">Yuklanmoqda...</p>;
  }

  const lessons = course.lessons;
  const currentIndex = lessons.findIndex((l) => l.id === currentId);
  const current = currentIndex >= 0 ? lessons[currentIndex] : null;
  const next = currentIndex >= 0 ? lessons[currentIndex + 1] : undefined;

  async function toggle(lesson: ApiEnrolledLesson, completed: boolean, goNext = false) {
    if (!token) return;
    setSaving(true);
    try {
      const updated = await setLessonCompleted(token, slug, lesson.id, completed);
      const justFinished = updated.certificateId && !course?.certificateId;
      setCourse(updated);
      if (justFinished) {
        toast.success("Tabriklaymiz! Kurs tugallandi va sertifikat berildi 🎉");
      }
      if (goNext && next) setCurrentId(next.id);
    } catch (err) {
      toast.error(err instanceof ApiError ? err.message : "Saqlab bo'lmadi");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-6">
      <Link
        href="/talaba/kurslarim"
        className="inline-flex items-center gap-1.5 text-sm text-gray-600 hover:text-indigo-700 mb-4"
      >
        <ArrowLeft className="w-4 h-4" />
        Mening kurslarim
      </Link>

      {course.certificateId && (
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3 border border-emerald-200 bg-emerald-50 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <Award className="w-6 h-6 text-emerald-600" />
            <p className="text-sm text-emerald-800 font-medium">
              Tabriklaymiz! Siz bu kursni tugatdingiz va sertifikat oldingiz.
            </p>
          </div>
          <Link
            href="/talaba/sertifikatlarim"
            className="text-sm font-medium text-emerald-700 hover:underline"
          >
            Sertifikatni ko&apos;rish →
          </Link>
        </div>
      )}

      <div className="grid lg:grid-cols-[1fr_340px] gap-8">
        <div>
          <div className="relative aspect-video bg-gray-900 rounded-xl flex items-center justify-center">
            <div className="text-center px-6">
              <PlayCircle className="w-16 h-16 text-white/70 mx-auto mb-3" />
              {current && (
                <p className="text-white font-medium">
                  {currentIndex + 1}-dars: {current.title}
                </p>
              )}
              <p className="text-white/60 text-sm mt-1">Video pleyer tez orada qo&apos;shiladi</p>
            </div>
          </div>

          {current && (
            <div className="flex flex-wrap gap-3 mt-4">
              {current.completed ? (
                <button
                  onClick={() => toggle(current, false)}
                  disabled={saving}
                  className="flex items-center gap-2 text-sm font-medium border border-gray-300 text-gray-700 px-4 py-2.5 rounded-md hover:bg-gray-50 disabled:opacity-60"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Tugatilgan (belgini olib tashlash)
                </button>
              ) : (
                <button
                  onClick={() => toggle(current, true, true)}
                  disabled={saving}
                  className="flex items-center gap-2 text-sm font-medium bg-emerald-600 text-white px-4 py-2.5 rounded-md hover:bg-emerald-700 disabled:opacity-60"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  Darsni tugatdim
                </button>
              )}
              {next && (
                <button
                  onClick={() => setCurrentId(next.id)}
                  className="flex items-center gap-1 text-sm font-medium text-indigo-700 px-4 py-2.5 rounded-md hover:bg-indigo-50"
                >
                  Keyingi dars <ChevronRight className="w-4 h-4" />
                </button>
              )}
            </div>
          )}

          <h1 className="text-xl font-bold text-gray-900 mt-6">{course.title}</h1>
          <p className="text-sm text-gray-500 mt-1">{course.instructorName}</p>

          <div className="mt-4 max-w-md">
            <div className="flex justify-between text-xs text-gray-500 mb-1">
              <span>Progress</span>
              <span>{course.progress}%</span>
            </div>
            <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-indigo-700 rounded-full transition-all"
                style={{ width: `${course.progress}%` }}
              />
            </div>
          </div>

          <div className="border-t border-gray-200 mt-6 pt-6">
            <h2 className="font-semibold text-gray-900 mb-2">Kurs haqida</h2>
            <p className="text-sm text-gray-600 leading-relaxed">{course.description}</p>
          </div>
        </div>

        <div>
          <h2 className="font-semibold text-gray-900 mb-4">
            Kurs darslari ({lessons.filter((l) => l.completed).length}/{lessons.length})
          </h2>
          {lessons.length === 0 && (
            <p className="text-sm text-gray-500">Darslar tez orada qo&apos;shiladi.</p>
          )}
          <div className="space-y-2">
            {lessons.map((lesson, i) => {
              const active = lesson.id === currentId;
              return (
                <div
                  key={lesson.id}
                  className={`flex items-center gap-3 border rounded-lg p-3 transition ${
                    active ? "bg-indigo-50 border-indigo-300" : "bg-white border-gray-200"
                  }`}
                >
                  <button
                    onClick={() => toggle(lesson, !lesson.completed)}
                    disabled={saving}
                    aria-label={lesson.completed ? "Tugatilmagan deb belgilash" : "Tugatilgan deb belgilash"}
                    className="shrink-0 disabled:opacity-60"
                  >
                    {lesson.completed ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    ) : (
                      <Circle className="w-5 h-5 text-gray-300 hover:text-indigo-500" />
                    )}
                  </button>
                  <button
                    onClick={() => setCurrentId(lesson.id)}
                    className="flex-1 min-w-0 text-left"
                  >
                    <p className="text-xs text-gray-400">{i + 1}-dars</p>
                    <p className="text-sm font-medium text-gray-900 truncate">{lesson.title}</p>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LessonPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);

  return (
    <RequireRole>
      <main>
        <Header />
        <LessonView slug={slug} />
      </main>
    </RequireRole>
  );
}
