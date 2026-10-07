import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Star, Users, Clock, Award, CheckCircle2 } from "lucide-react";
import { notFound } from "next/navigation";
import { getCourseBySlug, getCourses, ApiError } from "@/lib/api";
import { formatPrice } from "@/lib/format";
import { coverOf } from "@/lib/images";
import AddToCartButton from "@/components/AddToCartButton";

export default async function CourseDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const course = await getCourseBySlug(slug).catch((err) => {
    if (err instanceof ApiError && err.status === 404) notFound();
    throw err;
  });

  const allCourses = await getCourses({ category: course.category });
  const related = allCourses.items
    .filter((c) => c.slug !== course.slug)
    .slice(0, 3);

  return (
    <main>
      <Header />

      <section className="bg-gray-900">
        <div className="max-w-7xl mx-auto px-6 py-10 grid md:grid-cols-[1fr_380px] gap-10">
          <div>
            <span className="text-indigo-400 text-sm font-medium">
              {course.category}
            </span>
            <h1 className="text-2xl md:text-3xl font-bold text-white mt-2 leading-tight">
              {course.title}
            </h1>
            <p className="text-gray-300 text-sm mt-3">
              {course.category} sohasida amaliy va nazariy bilimlarni
              chuqur o&apos;rganing.
            </p>

            <div className="flex items-center gap-4 mt-4 text-sm">
              <span className="flex items-center gap-1 text-amber-400 font-semibold">
                <Star className="w-4 h-4 fill-amber-400" />
                {course.rating}
              </span>
              <span className="text-gray-400">
                ({course.studentsCount} talaba)
              </span>
            </div>

            <p className="text-gray-400 text-sm mt-3">
              Muallif: <span className="text-white">{course.instructorName}</span>
            </p>
          </div>

          <div className="relative h-56 rounded-xl overflow-hidden self-start">
            <Image
              src={coverOf(course.imageUrl)}
              alt={course.title}
              fill
              sizes="380px"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-10 grid md:grid-cols-[1fr_380px] gap-10">
        <div>
          <div className="border border-gray-200 rounded-xl p-6 mb-8">
            <h2 className="font-semibold text-gray-900 mb-4">
              Kurs dasturi
            </h2>
            {course.lessons.length === 0 && (
              <p className="text-sm text-gray-500">Darslar tez orada qo&apos;shiladi.</p>
            )}
            <div className="space-y-3">
              {course.lessons.map((item, i) => (
                <div key={`${i}-${item}`} className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold flex items-center justify-center shrink-0">
                    {i + 1}
                  </span>
                  <p className="text-sm text-gray-700">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="border border-gray-200 rounded-xl p-6">
            <h2 className="font-semibold text-gray-900 mb-3">
              Kurs haqida
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              {course.description}
            </p>
          </div>
        </div>

        <div className="border border-gray-200 rounded-xl p-6 h-fit sticky top-20">
          <p className="text-2xl font-bold text-gray-900">
            {formatPrice(course.price)}
          </p>

          <AddToCartButton course={course} />

          <div className="mt-5 space-y-3 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-gray-400" />
              <span>O&apos;zingizga qulay sur&apos;atda</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-gray-400" />
              <span>Tugatish sertifikati</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-gray-400" />
              <span>{course.studentsCount} talaba ro&apos;yxatdan o&apos;tgan</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-gray-400" />
              <span>To&apos;liq kirish huquqi</span>
            </div>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 pb-16">
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            O&apos;xshash kurslar
          </h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {related.map((c) => (
              <Link
                key={c.slug}
                href={`/kurslar/${c.slug}`}
                className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition block"
              >
                <div className="relative h-32">
                  <Image
                    src={coverOf(c.imageUrl)}
                    alt={c.title}
                    fill
                    sizes="300px"
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 text-sm line-clamp-2">
                    {c.title}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">{c.instructorName}</p>
                  <p className="font-bold text-gray-900 mt-2">
                    {formatPrice(c.price)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      <Footer />
    </main>
  );
}