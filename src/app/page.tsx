import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Categories from "@/components/Categories";
import Courses from "@/components/Courses";
import HowItWorks from "@/components/HowItWorks";
import FeatureBanner from "@/components/FeatureBanner";
import Stats from "@/components/Stats";
import Testimonials from "@/components/Testimonials";
import PopularSkills from "@/components/PopularSkills";
import FAQ from "@/components/FAQ";
import CallToAction from "@/components/CallToAction";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <Categories />
      <Courses />
      <HowItWorks />
      <FeatureBanner />
      <Stats />
      <Testimonials />
      <PopularSkills />
      <FAQ />
      <CallToAction />
      <Footer />
    </main>
  );
}
