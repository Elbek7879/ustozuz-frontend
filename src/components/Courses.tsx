import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getCourses } from "@/lib/api";
import CourseCard from "@/components/CourseCard";

export default async function Courses() {
  const data = await getCourses({ size: 8, sort: "studentsCount,desc" });

  return (
    <section className="py-16 md:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Mashhur kurslar</h2>
            <p className="text-gray-500 mt-2">Talabalar eng ko&apos;p tanlayotgan kurslar</p>
          </div>
          <Link
            href="/kurslar"
            className="group inline-flex items-center gap-1.5 text-indigo-700 font-semibold text-sm hover:text-indigo-800"
          >
            Barcha kurslar
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {data.items.map((course) => (
            <CourseCard key={course.slug} course={course} />
          ))}
        </div>
      </div>
    </section>
  );
}
