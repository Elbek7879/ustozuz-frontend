import Link from "next/link";
import { getCourses } from "@/lib/api";
import CourseCard from "@/components/CourseCard";

export default async function Courses() {
  const data = await getCourses({ size: 12, sort: "studentsCount,desc" });
  const loopedCourses = [...data.items, ...data.items];

  return (
    <section className="py-16 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Mashhur kurslar</h2>
        <Link
          href="/kurslar"
          className="text-indigo-700 font-medium text-sm hover:underline"
        >
          Barchasini ko&apos;rish →
        </Link>
      </div>

      <div className="relative group">
        <div className="flex gap-6 w-max animate-marquee group-hover:[animation-play-state:paused] motion-reduce:animate-none">
          {loopedCourses.map((course, i) => (
            <div key={`${course.slug}-${i}`} className="w-[240px] sm:w-[260px] shrink-0">
              <CourseCard course={course} />
            </div>
          ))}
        </div>

        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-gray-50 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-gray-50 to-transparent" />
      </div>
    </section>
  );
}