import Link from "next/link";
import { SearchX } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <main>
      <Header />

      <section className="max-w-xl mx-auto px-6 py-24 text-center">
        <div className="w-16 h-16 rounded-full bg-indigo-50 flex items-center justify-center mx-auto mb-6">
          <SearchX className="w-8 h-8 text-indigo-600" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900">
          Sahifa topilmadi
        </h1>
        <p className="text-gray-500 text-sm mt-3">
          Siz qidirayotgan sahifa mavjud emas yoki o&apos;chirilgan bo&apos;lishi mumkin.
        </p>
        <Link
          href="/"
          className="inline-block mt-8 bg-indigo-700 text-white font-medium px-6 py-3 rounded-md hover:bg-indigo-800"
        >
          Bosh sahifaga qaytish
        </Link>
      </section>

      <Footer />
    </main>
  );
}