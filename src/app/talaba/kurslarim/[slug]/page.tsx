import Link from "next/link";
import { PlayCircle, CheckCircle2, Lock, ArrowLeft } from "lucide-react";
import Header from "@/components/Header";
import { courses } from "@/lib/courses";

const sampleLessons = [
  { title: "Kursga kirish", duration: "5:20", done: true },
  { title: "Asosiy tushunchalar", duration: "12:45", done: true },
  { title: "Amaliy mashg'ulot 1", duration: "18:10", done: false },
  { title: "Amaliy mashg'ulot 2", duration: "22:30", done: false },
  { title: "Yakuniy loyiha", duration: "30:00", done: false },
];

export default async function LessonPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const course =
    courses.find(
      (c) =>
        c.title
          .toLowerCase()
          .replace(/[^a-z0-9а-яёʻʼ\s-]/gi, "")
          .trim()
          .replace(/\s+/g, "-") === slug
    ) ?? courses[0];

  return (
    <main>
      <Header />

      <div className="max-w-7xl mx-auto px-6 py-6">
        <Link
          href="/talaba/kurslarim"
          className="inline-flex items-center gap-1.5 text-sm text-gray-600 hover:text-indigo-700 mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Mening kurslarim
        </Link>

        <div className="grid lg:grid-cols-[1fr_320px] gap-8">
          <div>
            <div className="relative aspect-video bg-gray-900 rounded-xl flex items-center justify-center">
              <div className="text-center">
                <PlayCircle className="w-16 h-16 text-white/70 mx-auto mb-3" />
                <p className="text-white/70 text-sm">
                  Video pleyer tez orada qo&apos;shiladi
                </p>
              </div>
            </div>

            <h1 className="text-xl font-bold text-gray-900 mt-5">
              {course.title}
            </h1>
            <p className="text-sm text-gray-500 mt-1">{course.instructor}</p>

            <div className="border-t border-gray-200 mt-6 pt-6">
              <h2 className="font-semibold text-gray-900 mb-2">
                Kurs haqida
              </h2>
              <p className="text-sm text-gray-600 leading-relaxed">
                Bu kursda siz {course.category.toLowerCase()} sohasida
                zarur bo&apos;lgan barcha asosiy va amaliy ko&apos;nikmalarni
                bosqichma-bosqich o&apos;rganasiz. Har bir dars amaliy
                mashqlar bilan mustahkamlanadi.
              </p>
            </div>
          </div>

          <div>
            <h2 className="font-semibold text-gray-900 mb-4">
              Kurs darslari
            </h2>
            <div className="space-y-2">
              {sampleLessons.map((lesson, i) => (
                <div
                  key={lesson.title}
                  className={`flex items-center gap-3 border border-gray-200 rounded-lg p-3 ${
                    lesson.done
                      ? "bg-white"
                      : i === 2
                      ? "bg-indigo-50 border-indigo-300"
                      : "bg-gray-50"
                  }`}
                >
                  {lesson.done ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  ) : i === 2 ? (
                    <PlayCircle className="w-5 h-5 text-indigo-700 shrink-0" />
                  ) : (
                    <Lock className="w-5 h-5 text-gray-300 shrink-0" />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {lesson.title}
                    </p>
                    <p className="text-xs text-gray-400">{lesson.duration}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}