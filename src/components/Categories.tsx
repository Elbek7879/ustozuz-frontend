import { getCategories } from "@/lib/api";
import CategoryCard from "@/components/CategoryCard";
import SectionHeading from "@/components/SectionHeading";

export default async function Categories() {
  const categories = await getCategories();

  return (
    <section className="max-w-7xl mx-auto px-6 py-16 md:py-24">
      <SectionHeading
        eyebrow="Yo'nalishlar"
        title="Mashhur kategoriyalar"
        subtitle="O'zingizga qiziq sohani tanlang va bugunoq o'rganishni boshlang"
        action={{ label: "Barcha kategoriyalar", href: "/kategoriyalar" }}
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
        {categories.map((cat) => (
          <CategoryCard key={cat.id} category={cat} />
        ))}
      </div>
    </section>
  );
}
