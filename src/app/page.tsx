import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Categories from "@/components/Categories";
import HowItWorks from "@/components/HowItWorks";
import FeatureBanner from "@/components/FeatureBanner";
import Courses from "@/components/Courses";
import CareerSkills from "@/components/CareerSkills";
import Stats from "@/components/Stats";
import Testimonials from "@/components/Testimonials";
import PopularSkills from "@/components/PopularSkills";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <Categories />
      <HowItWorks />
      <FeatureBanner />
      <Courses />
      <CareerSkills />
      <Stats />
      <Testimonials />
      <PopularSkills />
      <FAQ />
      <Footer />
    </main>
  );
}