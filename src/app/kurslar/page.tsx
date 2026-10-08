import Link from "next/link";
import { Search, SearchX } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import CourseCard from "@/components/CourseCard";
import { categories } from "@/lib/categories";
import { getCourses } from "@/lib/api";

export const metadata = { title: "Barcha kurslar" };

type Params = { kategoriya?: string; qidiruv?: string; saralash?: string };

type Props = {
  searchParams: Promise<Params>;
};

const sortOptions = [
  { key: "yangi", label: "Eng yangi", sort: "createdAt,desc" },
  { key: "mashhur", label: "Eng mashhur", sort: "studentsCount,desc" },
  { key: "arzon", label: "Arzonroq", sort: "priceAmount,asc" },
  { key: "qimmat", label: "Qimmatroq", sort: "priceAmount,desc" },
];

// Joriy filtrlarni saqlagan holda bittasini almashtirib havola yasaydi
function hrefWith(current: Params, change: Partial<Params>) {
  const next = { ...current, ...change };
  const search = new URLSearchParams();
  (Object.keys(next) as (keyof Params)[]).forEach((k) => {
    const v = next[k];
    if (v) search.set(k, v);
  });
  const q = search.toString();
  return `/kurslar${q ? `?${q}` : ""}`;
}

const pill = (active: boolean) =>
  `shrink-0 text-sm font-medium px-4 py-2 rounded-full transition ${
    active
      ? "bg-indigo-700 text-white shadow-sm shadow-indigo-200"
      : "bg-white text-gray-700 ring-1 ring-gray-200 hover:ring-indigo-300 hover:text-indigo-700"
  }`;

export default async function CoursesPage({ searchParams }: Props) {
  const params = await searchParams;
  const { kategoriya, qidiruv } = params;
  const activeSort = sortOptions.find((o) => o.key === params.saralash) ?? sortOptions[0];

  const data = await getCourses({ category: kategoriya, q: qidiruv, size: 100, sort: activeSort.sort });

  const title = qidiruv ? `"${qidiruv}" bo'yicha natijalar` : kategoriya ? `${kategoriya} kurslari` : "Barcha kurslar";

  return (
    <main>
      <Header />

      <PageHero
        eyebrow="Katalog"
        title={title}
        subtitle={`${data.totalItems} ta kurs topildi`}
      >
        <form action="/kurslar" role="search" className="mt-6 flex items-center gap-2 bg-white rounded-2xl p-2 ring-1 ring-gray-200 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 max-w-xl">
          <Search className="w-5 h-5 text-gray-400 ml-3 shrink-0" />
          {kategoriya && <input type="hidden" name="kategoriya" value={kategoriya} />}
          <input
            type="search"
            name="qidiruv"
            defaultValue={qidiruv}
            placeholder="Kurs, ustoz yoki mavzu"
            aria-label="Kurs qidirish"
            className="flex-1 min-w-0 py-2 bg-transparent text-[15px] focus:outline-none"
          />
          <button
            type="submit"
            className="shrink-0 bg-indigo-700 text-white text-sm font-semibold px-5 py-2.5 rounded-xl hover:bg-indigo-800 transition"
          >
            Qidirish
          </button>
        </form>
      </PageHero>

      <section className="max-w-7xl mx-auto px-6 pb-16">
        {/* Kategoriyalar: telefonda yonga suriladi */}
        <div className="-mx-6 px-6 flex gap-2 overflow-x-auto pb-2 [scrollbar-width:none] sm:mx-0 sm:px-0 sm:flex-wrap">
          <Link href={hrefWith(params, { kategoriya: undefined })} className={pill(!kategoriya)}>
            Barchasi
          </Link>
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <Link
                key={cat.title}
                href={hrefWith(params, { kategoriya: cat.title })}
                className={`${pill(kategoriya === cat.title)} inline-flex items-center gap-1.5`}
              >
                <Icon className="w-4 h-4" />
                {cat.title}
              </Link>
            );
          })}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 mt-6 mb-6">
          <p className="text-sm text-gray-500">
            <span className="font-semibold text-gray-900">{data.totalItems}</span> ta natija
            {qidiruv && (
              <>
                {" · "}
                <Link href={hrefWith(params, { qidiruv: undefined })} className="text-indigo-700 hover:underline">
                  qidiruvni tozalash
                </Link>
              </>
            )}
          </p>
          <div className="flex items-center gap-1 bg-gray-100 rounded-xl p-1 overflow-x-auto [scrollbar-width:none]">
            {sortOptions.map((o) => (
              <Link
                key={o.key}
                href={hrefWith(params, { saralash: o.key === "yangi" ? undefined : o.key })}
                className={`shrink-0 text-xs sm:text-sm font-medium px-3 py-1.5 rounded-lg transition ${
                  o.key === activeSort.key ? "bg-white text-gray-900 shadow-sm" : "text-gray-600 hover:text-gray-900"
                }`}
              >
                {o.label}
              </Link>
            ))}
          </div>
        </div>

        {data.items.length === 0 ? (
          <div className="text-center py-20 rounded-3xl border-2 border-dashed border-gray-200">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-indigo-50 flex items-center justify-center">
              <SearchX className="w-8 h-8 text-indigo-500" />
            </div>
            <p className="mt-5 text-lg font-semibold text-gray-900">Hech narsa topilmadi</p>
            <p className="mt-1 text-gray-500">Boshqa so&apos;z bilan qidirib ko&apos;ring yoki barcha kurslarni ko&apos;ring.</p>
            <Link
              href="/kurslar"
              className="inline-block mt-6 bg-indigo-700 text-white text-sm font-semibold px-5 py-2.5 rounded-xl hover:bg-indigo-800"
            >
              Barcha kurslar
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
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
