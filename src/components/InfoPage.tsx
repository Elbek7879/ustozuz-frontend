import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function InfoPage({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <main>
      <Header />

      <section className="bg-gradient-to-br from-indigo-900 via-indigo-700 to-purple-700">
        <div className="max-w-4xl mx-auto px-6 py-14">
          <h1 className="text-3xl font-bold text-white">{title}</h1>
          {subtitle && (
            <p className="mt-3 text-indigo-100 max-w-2xl">{subtitle}</p>
          )}
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-6 py-12">{children}</section>

      <Footer />
    </main>
  );
}