import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Star,
  Users,
  Clock,
  Award,
  CheckCircle2,
  ChevronRight,
  PlayCircle,
  BookOpen,
  Smartphone,
  Infinity as InfinityIcon,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CourseCard from "@/components/CourseCard";
import AddToCartButton from "@/components/AddToCartButton";
import CoursePreview from "@/components/CoursePreview";
import { getCourseBySlug, getCourses, ApiError } from "@/lib/api";
import { formatNumber, formatPrice } from "@/lib/format";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  try {
    const course = await getCourseBySlug(slug);
    return { title: course.title, description: course.description };
  } catch {
    return { title: "Kurs topilmadi" };
  }
}

const includes = [
  { icon: Clock, text: "O'zingizga qulay sur'atda" },
  { icon: InfinityIcon, text: "Muddatsiz kirish huquqi" },
  { icon: Smartphone, text: "Telefon va kompyuterdan" },
  { icon: Award, text: "Tugatgach sertifikat" },
];

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

  const sameCategory = await getCourses({ category: course.category, size: 8 });
  const related = sameCategory.items.filter((c) => c.slug !== course.slug).slice(0, 4);

  return (
    <main>
      <Header />

      <section className="relative overflow-hidden bg-gradient-to-br from-gray-950 via-gray-900 to-indigo-950">
        <div className="pointer-events-none absolute -top-32 right-0 w-[30rem] h-[30rem] rounded-full bg-indigo-600/20 blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-6 py-10 md:py-14 grid lg:grid-cols-[1fr_400px] gap-10 items-center">
          <div>
            <nav className="flex items-center gap-1.5 text-sm text-gray-400" aria-label="Yo'l">
              <Link href="/kurslar" className="hover:text-white">Kurslar</Link>
              <ChevronRight className="w-4 h-4" />
              <Link
                href={`/kurslar?kategoriya=${encodeURIComponent(course.category)}`}
                className="text-indigo-300 hover:text-white"
              >
                {course.category}
              </Link>
            </nav>

            <h1 className="mt-4 text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              {course.title}
            </h1>
            <p className="mt-4 text-gray-300 text-base md:text-lg max-w-2xl line-clamp-3">{course.description}</p>

            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm">
              {course.rating > 0 && (
                <span className="flex items-center gap-1.5 font-semibold text-amber-400">
                  <Star className="w-4 h-4 fill-amber-400" />
                  {course.rating.toFixed(1)}
                  <span className="font-normal text-gray-400">({formatNumber(course.ratingCount)} baho)</span>
                </span>
              )}
              <span className="flex items-center gap-1.5 text-gray-300">
                <Users className="w-4 h-4" />
                {formatNumber(course.studentsCount)} talaba
              </span>
              <span className="flex items-center gap-1.5 text-gray-300">
                <BookOpen className="w-4 h-4" />
                {course.lessons.length} ta dars
              </span>
            </div>

            <div className="mt-6 flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 text-white font-bold flex items-center justify-center">
                {course.instructorName.charAt(0)}
              </div>
              <div className="text-sm">
                <p className="text-gray-400">Ustoz</p>
                <p className="font-semibold text-white">{course.instructorName}</p>
              </div>
            </div>
          </div>

          <CoursePreview imageUrl={course.imageUrl} title={course.title} videoUrl={course.previewVideoUrl} />
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-10 md:py-14 grid lg:grid-cols-[1fr_380px] gap-8 lg:gap-10 items-start">
        {/* Telefonda xarid bloki birinchi chiqadi, kompyuterda o'ng tomonda yopishib turadi */}
        <aside className="order-first lg:order-none lg:col-start-2 lg:row-start-1 bg-white rounded-3xl ring-1 ring-gray-200 shadow-lg shadow-gray-100 p-6 lg:sticky lg:top-24">
          <p className="text-3xl font-extrabold text-gray-900">{formatPrice(course.price)}</p>
          <AddToCartButton course={course} />

          <p className="mt-6 text-sm font-semibold text-gray-900">Kursga nimalar kiradi</p>
          <ul className="mt-3 space-y-3 text-sm text-gray-600">
            {includes.map(({ icon: Icon, text }) => (
              <li key={text} className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center shrink-0">
                  <Icon className="w-4 h-4 text-indigo-600" />
                </span>
                {text}
              </li>
            ))}
          </ul>
        </aside>

        <div className="lg:col-start-1 lg:row-start-1 space-y-6">
          <div className="bg-white rounded-3xl ring-1 ring-gray-200 p-6 md:p-8">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-xl font-bold text-gray-900">Kurs dasturi</h2>
              <span className="text-sm text-gray-500">{course.lessons.length} ta dars</span>
            </div>

            {course.lessons.length === 0 ? (
              <p className="mt-4 text-sm text-gray-500">Darslar tez orada qo&apos;shiladi.</p>
            ) : (
              <ol className="mt-5 divide-y divide-gray-100 rounded-2xl ring-1 ring-gray-100 overflow-hidden">
                {course.lessons.map((item, i) => (
                  <li key={`${i}-${item}`} className="flex items-center gap-4 px-4 py-3.5 bg-white hover:bg-gray-50">
                    <span className="w-8 h-8 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold flex items-center justify-center shrink-0">
                      {i + 1}
                    </span>
                    <p className="flex-1 text-sm text-gray-800">{item}</p>
                    {i === 0 && course.previewVideoUrl && (
                      <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                        Bepul
                      </span>
                    )}
                    <PlayCircle className="w-4 h-4 text-gray-300 shrink-0" />
                  </li>
                ))}
              </ol>
            )}
          </div>

          <div className="bg-white rounded-3xl ring-1 ring-gray-200 p-6 md:p-8">
            <h2 className="text-xl font-bold text-gray-900">Kurs haqida</h2>
            <p className="mt-3 text-gray-600 leading-relaxed whitespace-pre-line">{course.description}</p>
            <div className="mt-6 grid sm:grid-cols-2 gap-3">
              {["Amaliy topshiriqlar", "Bosqichma-bosqich dastur", "Tajribali ustoz", "Sertifikat bilan yakun"].map((t) => (
                <p key={t} className="flex items-center gap-2 text-sm text-gray-700">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                  {t}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="bg-gray-50">
          <div className="max-w-7xl mx-auto px-6 py-14">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900 mb-8">O&apos;xshash kurslar</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {related.map((c) => (
                <CourseCard key={c.slug} course={c} />
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </main>
  );
}
