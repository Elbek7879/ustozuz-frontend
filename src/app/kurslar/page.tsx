import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CourseCard from "@/components/CourseCard";
import { categories } from "@/lib/categories";
import { getCourses } from "@/lib/api";

type Props = {
  searchParams: Promise<{ kategoriya?: string; qidiruv?: string }>;
};

export default async function CoursesPage({ searchParams }: Props) {
  const { kategoriya, qidiruv } = await searchParams;

  const data = await getCourses({ category: kategoriya, q: qidiruv });

  const heading = qidiruv
    ? `"${qidiruv}" bo'yicha natijalar`
    : kategoriya
    ? kategoriya
    : "Barcha kurslar";

  return (
    <main>
      <Header />

      <section className="max-w-7xl mx-auto px-6 py-10">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">{heading}</h1>

        <div className="flex flex-wrap gap-2 mb-8">
          <Link
            href="/kurslar"
            className={`text-sm font-medium px-4 py-2 rounded-full border transition ${
              !kategoriya
                ? "bg-indigo-700 text-white border-indigo-700"
                : "text-gray-700 border-gray-300 hover:border-indigo-400"
            }`}
          >
            Barchasi
          </Link>
          {categories.map((cat) => (
            <Link
              key={cat.title}
              href={`/kurslar?kategoriya=${encodeURIComponent(cat.title)}`}
              className={`text-sm font-medium px-4 py-2 rounded-full border transition ${
                kategoriya === cat.title
                  ? "bg-indigo-700 text-white border-indigo-700"
                  : "text-gray-700 border-gray-300 hover:border-indigo-400"
              }`}
            >
              {cat.title}
            </Link>
          ))}
        </div>

        {data.items.length === 0 ? (
          <p className="text-gray-500">
            {qidiruv
              ? "Hech qanday natija topilmadi."
              : "Bu kategoriyada hozircha kurslar yo'q."}
          </p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {data.items.map((course) => (
              <CourseCard key={course.slug} course={course} />
            ))}
          </div>
        )}
      </section>

      <Footer />
    </main>
  );
}