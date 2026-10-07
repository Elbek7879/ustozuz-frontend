import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { categories } from "@/lib/categories";
import { courses } from "@/lib/courses";

export default function CategoriesPage() {
  return (
    <main>
      <Header />

      <section className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">
          Barcha kategoriyalar
        </h1>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const count = courses.filter((c) => c.category === cat.title).length;
            return (
              <Link
                key={cat.title}
                href={`/kurslar?kategoriya=${encodeURIComponent(cat.title)}`}
                className="border border-gray-200 rounded-xl p-5 hover:shadow-md hover:border-indigo-300 hover:-translate-y-0.5 transition-all block"
              >
                <div className={`w-11 h-11 rounded-lg ${cat.bg} flex items-center justify-center mb-4`}>
                  <Icon className={`w-5 h-5 ${cat.iconColor}`} />
                </div>
                <h3 className="font-semibold text-gray-900">{cat.title}</h3>
                <p className="text-sm text-gray-500 mt-1">{cat.desc}</p>
                <p className="text-xs text-indigo-700 font-medium mt-3">
                  {count} ta kurs
                </p>
              </Link>
            );
          })}
        </div>
      </section>

      <Footer />
    </main>
  );
}