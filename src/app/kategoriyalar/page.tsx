import Link from "next/link";
import * as Icons from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getCategories } from "@/lib/api";
import { categories as localMeta } from "@/lib/categories";

// Kurslar soni bazadan olinadi, shuning uchun sahifa har so'rovda yangilanadi
export const dynamic = "force-dynamic";

export default async function CategoriesPage() {
  const categories = await getCategories();

  return (
    <main>
      <Header />

      <section className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">
          Barcha kategoriyalar
        </h1>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {categories.map((cat) => {
            const meta = localMeta.find((m) => m.title === cat.title);
            const Icon = (Icons[cat.icon as keyof typeof Icons] ?? Icons.BookOpen) as Icons.LucideIcon;
            return (
              <Link
                key={cat.id}
                href={`/kurslar?kategoriya=${encodeURIComponent(cat.title)}`}
                className="border border-gray-200 rounded-xl p-5 hover:shadow-md hover:border-indigo-300 hover:-translate-y-0.5 transition-all block"
              >
                <div className={`w-11 h-11 rounded-lg ${meta?.bg ?? "bg-indigo-50"} flex items-center justify-center mb-4`}>
                  <Icon className={`w-5 h-5 ${meta?.iconColor ?? "text-indigo-600"}`} />
                </div>
                <h3 className="font-semibold text-gray-900">{cat.title}</h3>
                <p className="text-sm text-gray-500 mt-1">{cat.description}</p>
                <p className="text-xs text-indigo-700 font-medium mt-3">
                  {cat.coursesCount} ta kurs
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
