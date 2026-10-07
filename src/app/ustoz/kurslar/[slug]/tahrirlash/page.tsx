import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CourseEditForm from "@/components/CourseEditForm";
import { courses } from "@/lib/courses";
import { slugify } from "@/lib/slug";

export default async function EditCoursePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const course = courses.find((c) => slugify(c.title) === slug);

  if (!course) notFound();

  return (
    <main>
      <Header />

      <section className="max-w-2xl mx-auto px-6 py-10">
        <Link
          href="/ustoz/panel"
          className="inline-flex items-center gap-1.5 text-sm text-gray-600 hover:text-indigo-700 mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Ustoz paneli
        </Link>

        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Kursni tahrirlash
        </h1>
        <p className="text-gray-500 text-sm mb-8">{course.title}</p>

        <CourseEditForm course={course} />
      </section>

      <Footer />
    </main>
  );
}