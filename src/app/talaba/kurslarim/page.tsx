import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StudentNav from "@/components/StudentNav";
import { categories } from "@/lib/categories";
import { myCourses } from "@/lib/student";
import { slugify } from "@/lib/slug";
import { PlayCircle, Award } from "lucide-react";

export default function MyCoursesPage() {
  const done = myCourses.filter((c) => c.progress === 100).length;

  return (
    <main>
      <Header />
      <StudentNav />

      <section className="max-w-7xl mx-auto px-6 py-10">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Mening kurslarim
        </h1>
        <p className="text-gray-500 text-sm mb-8">
          {myCourses.length} ta kurs, shundan {done} tasi tugallangan.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {myCourses.map((course) => {
            const cat = categories.find((c) => c.title === course.category);
            const Icon = cat?.icon;

            return (
              <Link
                key={course.title}
                href={`/talaba/kurslarim/${slugify(course.title)}`}
                className="group border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-all bg-white block"
              >
                <div className="relative h-32">
                  <Image
                    src={course.image}
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
                  {Icon && (
                    <span className="text-xs font-medium text-gray-500 flex items-center gap-1">
                      <Icon className="w-3.5 h-3.5" /> {course.category}
                    </span>
                  )}
                  <h3 className="font-semibold text-gray-900 text-sm leading-snug line-clamp-2 mt-1">
                    {course.title}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">
                    {course.instructor}
                  </p>

                  <div className="mt-3">
                    <div className="flex justify-between text-xs text-gray-500 mb-1">
                      <span>Progress</span>
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
                    {course.progress === 100 ? "Qayta ko'rish" : "Davom etish"} →
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <Footer />
    </main>
  );
}