"use client";

import { use, useEffect, useRef, useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import {
  PlayCircle,
  CheckCircle2,
  Circle,
  ArrowLeft,
  Award,
  ChevronLeft,
  ChevronRight,
  Lock,
  ListVideo,
} from "lucide-react";
import Header from "@/components/Header";
import VideoPlayer from "@/components/VideoPlayer";
import RequireRole from "@/components/RequireRole";
import ProgressRing from "@/components/ProgressRing";
import Skeleton from "@/components/Skeleton";
import { useAuth } from "@/lib/auth/AuthContext";
import { fireConfetti } from "@/lib/confetti";
import {
  ApiError,
  getEnrolledCourse,
  setLessonCompleted,
  type ApiEnrolledCourseDetail,
  type ApiEnrolledLesson,
} from "@/lib/api";

function LessonSkeleton() {
  return (
    <>
      <div className="h-16 bg-gray-950" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 md:py-8 grid lg:grid-cols-[1fr_380px] gap-6 lg:gap-8">
        <div className="space-y-4">
          <Skeleton className="aspect-video rounded-2xl" />
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-8 w-2/3" />
          <Skeleton className="h-11 w-72" />
        </div>
        <Skeleton className="h-96 rounded-3xl" />
      </div>
    </>
  );
}

function LessonView({ slug }: { slug: string }) {
  const { token } = useAuth();
  const [course, setCourse] = useState<ApiEnrolledCourseDetail | null>(null);
  const [notEnrolled, setNotEnrolled] = useState(false);
  const [currentId, setCurrentId] = useState<number | null>(null);
  const [saving, setSaving] = useState(false);
  const playerRef = useRef<HTMLDivElement>(null);

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
      <div className="max-w-md mx-auto px-6 py-20 text-center">
        <div className="w-16 h-16 rounded-2xl bg-indigo-50 flex items-center justify-center mx-auto">
          <Lock className="w-8 h-8 text-indigo-600" />
        </div>
        <h1 className="mt-5 text-xl font-bold text-gray-900">Bu kurs sizda hali yo&apos;q</h1>
        <p className="mt-2 text-gray-500">Darslarni ko&apos;rish uchun avval kursga yoziling.</p>
        <Link
          href={`/kurslar/${slug}`}
          className="mt-6 inline-flex items-center gap-2 bg-indigo-600 text-white font-semibold px-6 py-3 rounded-xl hover:bg-indigo-700 transition"
        >
          Kurs sahifasiga o&apos;tish
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  if (!course || !token) return <LessonSkeleton />;

  const lessons = course.lessons;
  const completedCount = lessons.filter((l) => l.completed).length;
  const currentIndex = lessons.findIndex((l) => l.id === currentId);
  const current = currentIndex >= 0 ? lessons[currentIndex] : null;
  const prev = currentIndex > 0 ? lessons[currentIndex - 1] : undefined;
  const next = currentIndex >= 0 ? lessons[currentIndex + 1] : undefined;

  // Telefonda ro'yxatdan dars tanlanganda video ko'rinadigan joyga qaytamiz
  function select(id: number) {
    setCurrentId(id);
    const top = playerRef.current?.getBoundingClientRect().top ?? 0;
    if (top < 0) playerRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  async function toggle(lesson: ApiEnrolledLesson, completed: boolean, goNext = false) {
    if (!token) return;
    setSaving(true);
    try {
      const updated = await setLessonCompleted(token, slug, lesson.id, completed);
      const justFinished = updated.certificateId && !course?.certificateId;
      setCourse(updated);
      if (justFinished) {
        fireConfetti();
        toast.success("Tabriklaymiz! Kurs tugallandi va sertifikat berildi 🎉");
      }
      if (goNext && next) select(next.id);
    } catch (err) {
      toast.error(err instanceof ApiError ? err.message : "Saqlab bo'lmadi");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="flex-1 bg-gray-50">
      <div className="bg-gray-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-3 sm:gap-4">
          <Link
            href="/talaba/kurslarim"
            aria-label="Mening kurslarim"
            title="Mening kurslarim"
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center shrink-0 transition"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div className="min-w-0 flex-1">
            <p className="text-xs text-gray-400 truncate">{course.instructorName}</p>
            <p className="text-sm sm:text-base font-semibold truncate">{course.title}</p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <ProgressRing value={course.progress} size={42}>
              <span className="text-[10px] font-bold">{course.progress}%</span>
            </ProgressRing>
            <div className="hidden sm:block leading-tight">
              <p className="text-sm font-semibold">
                {completedCount}/{lessons.length} dars
              </p>
              <p className="text-xs text-gray-400">Sizning natijangiz</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 md:py-8 grid lg:grid-cols-[minmax(0,1fr)_380px] gap-6 lg:gap-8 items-start">
        <div className="lg:col-start-1 lg:row-start-1 min-w-0">
          <div ref={playerRef} className="scroll-mt-24">
            {/* key: dars almashganda pleyer yangidan yuklanadi */}
            <VideoPlayer
              key={current?.id ?? "bosh"}
              url={current?.videoUrl}
              title={current ? `${currentIndex + 1}-dars: ${current.title}` : course.title}
            />
          </div>

          {current && (
            <div className="mt-5">
              <p className="text-xs font-bold uppercase tracking-[0.15em] text-indigo-600">
                {currentIndex + 1}-dars · jami {lessons.length} ta
              </p>
              <h1 className="mt-1.5 text-xl md:text-2xl font-bold tracking-tight text-gray-900">{current.title}</h1>

              <div className="mt-5 flex flex-wrap items-center gap-2 sm:gap-3">
                {prev && (
                  <button
                    onClick={() => select(prev.id)}
                    aria-label="Oldingi dars"
                    className="flex items-center gap-1 text-sm font-semibold text-gray-700 bg-white ring-1 ring-gray-200 px-4 py-2.5 rounded-xl hover:bg-gray-50 transition"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span className="hidden sm:inline">Oldingi</span>
                  </button>
                )}
                {current.completed ? (
                  <button
                    onClick={() => toggle(current, false)}
                    disabled={saving}
                    title="Belgini olib tashlash"
                    className="flex items-center gap-2 text-sm font-semibold text-emerald-700 bg-emerald-50 ring-1 ring-emerald-200 px-4 py-2.5 rounded-xl hover:bg-emerald-100 disabled:opacity-60 transition"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    Tugatilgan
                  </button>
                ) : (
                  <button
                    onClick={() => toggle(current, true, true)}
                    disabled={saving}
                    className="flex items-center gap-2 text-sm font-semibold bg-emerald-600 text-white px-5 py-2.5 rounded-xl shadow-sm shadow-emerald-600/30 hover:bg-emerald-700 disabled:opacity-60 transition"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    Darsni tugatdim
                  </button>
                )}
                {next ? (
                  <button
                    onClick={() => select(next.id)}
                    className="flex items-center gap-1 text-sm font-semibold bg-indigo-600 text-white px-4 py-2.5 rounded-xl hover:bg-indigo-700 transition sm:ml-auto"
                  >
                    Keyingi<span className="hidden sm:inline"> dars</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                ) : (
                  course.certificateId && (
                    <Link
                      href="/talaba/sertifikatlarim"
                      className="flex items-center gap-2 text-sm font-semibold bg-indigo-600 text-white px-4 py-2.5 rounded-xl hover:bg-indigo-700 transition sm:ml-auto"
                    >
                      <Award className="w-4 h-4" />
                      Sertifikatni ko&apos;rish
                    </Link>
                  )
                )}
              </div>
            </div>
          )}

          {course.certificateId && (
            <div className="mt-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 p-4 md:p-5 text-white shadow-lg shadow-emerald-500/20">
              <div className="flex items-center gap-3">
                <span className="w-11 h-11 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
                  <Award className="w-6 h-6" />
                </span>
                <div>
                  <p className="font-bold">Tabriklaymiz! Kurs tugallandi 🎉</p>
                  <p className="text-sm text-white/85">Sertifikatingiz tayyor — uni yuklab olishingiz mumkin.</p>
                </div>
              </div>
              <Link
                href="/talaba/sertifikatlarim"
                className="text-sm font-semibold bg-white text-emerald-700 px-4 py-2 rounded-xl hover:bg-emerald-50 transition"
              >
                Sertifikatni ko&apos;rish
              </Link>
            </div>
          )}
        </div>

        <aside className="lg:col-start-2 lg:row-start-1 lg:row-span-2 lg:sticky lg:top-24 rounded-3xl bg-white ring-1 ring-gray-200 overflow-hidden">
          <div className="p-5 border-b border-gray-100">
            <div className="flex items-center justify-between gap-3">
              <h2 className="flex items-center gap-2 font-bold text-gray-900">
                <ListVideo className="w-5 h-5 text-indigo-600" />
                Kurs mazmuni
              </h2>
              <span className="text-sm text-gray-500">
                {completedCount}/{lessons.length}
              </span>
            </div>
            <div className="mt-3 h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-700 ${
                  course.progress === 100 ? "bg-emerald-500" : "bg-gradient-to-r from-indigo-600 to-purple-500"
                }`}
                style={{ width: `${course.progress}%` }}
              />
            </div>
          </div>

          {lessons.length === 0 ? (
            <p className="p-5 text-sm text-gray-500">Darslar tez orada qo&apos;shiladi.</p>
          ) : (
            <ol className="divide-y divide-gray-100 lg:max-h-[calc(100vh-15rem)] overflow-y-auto">
              {lessons.map((lesson, i) => {
                const active = lesson.id === currentId;
                return (
                  <li
                    key={lesson.id}
                    className={`flex items-center gap-3 px-4 py-3 border-l-4 transition ${
                      active ? "bg-indigo-50/70 border-l-indigo-600" : "border-l-transparent hover:bg-gray-50"
                    }`}
                  >
                    <button
                      onClick={() => toggle(lesson, !lesson.completed)}
                      disabled={saving}
                      aria-label={lesson.completed ? "Tugatilmagan deb belgilash" : "Tugatilgan deb belgilash"}
                      className="shrink-0 disabled:opacity-60"
                    >
                      {lesson.completed ? (
                        <CheckCircle2 className="w-5 h-5 text-white fill-emerald-500" />
                      ) : (
                        <Circle className="w-5 h-5 text-gray-300 hover:text-indigo-500" />
                      )}
                    </button>
                    <button onClick={() => select(lesson.id)} className="flex-1 min-w-0 text-left">
                      <p className={`text-sm font-medium truncate ${active ? "text-indigo-900" : "text-gray-800"}`}>
                        {i + 1}. {lesson.title}
                      </p>
                      <p className="mt-0.5 flex items-center gap-1 text-xs text-gray-400">
                        <PlayCircle className={`w-3.5 h-3.5 ${lesson.videoUrl ? "text-indigo-500" : ""}`} />
                        {lesson.videoUrl ? "Video dars" : "Video tez orada"}
                      </p>
                    </button>
                    {active && (
                      <span className="shrink-0 text-[10px] font-bold uppercase tracking-wider text-indigo-600 bg-white ring-1 ring-indigo-200 px-2 py-0.5 rounded-full">
                        Hozir
                      </span>
                    )}
                  </li>
                );
              })}
            </ol>
          )}
        </aside>

        <div className="lg:col-start-1 lg:row-start-2 rounded-3xl bg-white ring-1 ring-gray-200 p-6 md:p-8">
          <h2 className="text-lg font-bold text-gray-900">Kurs haqida</h2>
          <p className="mt-3 text-gray-600 leading-relaxed whitespace-pre-line">{course.description}</p>
          <div className="mt-6 pt-6 border-t border-gray-100 flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 text-white font-bold flex items-center justify-center">
              {course.instructorName.charAt(0)}
            </div>
            <div className="text-sm">
              <p className="text-gray-500">Ustoz</p>
              <p className="font-semibold text-gray-900">{course.instructorName}</p>
            </div>
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
