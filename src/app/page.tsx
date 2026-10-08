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
import Reveal from "@/components/Reveal";

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <Reveal>
        <Categories />
      </Reveal>
      <Reveal>
        <Courses />
      </Reveal>
      <Reveal>
        <HowItWorks />
      </Reveal>
      <Reveal>
        <FeatureBanner />
      </Reveal>
      <Reveal>
        <Stats />
      </Reveal>
      <Reveal>
        <Testimonials />
      </Reveal>
      <Reveal>
        <PopularSkills />
      </Reveal>
      <Reveal>
        <FAQ />
      </Reveal>
      <Reveal>
        <CallToAction />
      </Reveal>
      <Footer />
    </main>
  );
}
