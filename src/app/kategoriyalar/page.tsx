import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import CategoryCard from "@/components/CategoryCard";
import CallToAction from "@/components/CallToAction";
import { getCategories } from "@/lib/api";

export const metadata = { title: "Kategoriyalar" };

// Kurslar soni bazadan olinadi, shuning uchun sahifa har so'rovda yangilanadi
export const dynamic = "force-dynamic";

export default async function CategoriesPage() {
  const categories = await getCategories();
  const totalCourses = categories.reduce((sum, c) => sum + c.coursesCount, 0);

  return (
    <main>
      <Header />

      <PageHero
        eyebrow="Yo'nalishlar"
        title="Barcha kategoriyalar"
        subtitle={`${categories.length} ta yo'nalish bo'yicha ${totalCourses} ta amaliy kurs. O'zingizga qiziq sohani tanlang.`}
      />

      <section className="max-w-7xl mx-auto px-6 pb-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
          {categories.map((cat) => (
            <CategoryCard key={cat.id} category={cat} />
          ))}
        </div>
      </section>

      <CallToAction />
      <Footer />
    </main>
  );
}
