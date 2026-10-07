import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TopicsCarousel from "@/components/TopicsCarousel";
import SkillsTabs from "@/components/SkillsTabs";

export const metadata = {
  title: "Ommabop mavzular — UstozUz",
};

export default function PopularTopicsPage() {
  return (
    <main>
      <Header />

      <section className="max-w-7xl mx-auto px-6 pt-12 pb-16">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
          Ommabop va o&apos;sib borayotgan mavzular
        </h1>
        <p className="text-gray-600 mt-3">
          Yangi yo&apos;nalish tanlang yoki bor bilimlaringizni yanada
          mustahkamlang.
        </p>

        <div className="mt-10">
          <TopicsCarousel />
        </div>

        <div className="mt-12">
          <SkillsTabs />
        </div>
      </section>

      <Footer />
    </main>
  );
}