import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function PaymentSuccessPage() {
  return (
    <main>
      <Header />

      <section className="max-w-xl mx-auto px-6 py-24 text-center">
        <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-8 h-8 text-emerald-600" />
        </div>

        <h1 className="text-2xl font-bold text-gray-900">
          To&apos;lov muvaffaqiyatli qabul qilindi
        </h1>
        <p className="text-gray-500 text-sm mt-3">
          Kurslaringiz shaxsiy kabinetingizda ochildi. O&apos;rganishni
          hoziroq boshlashingiz mumkin.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
          <Link
            href="/talaba/kurslarim"
            className="bg-indigo-700 text-white font-medium px-6 py-3 rounded-md hover:bg-indigo-800"
          >
            Mening kurslarim
          </Link>
          <Link
            href="/kurslar"
            className="border border-gray-300 text-gray-700 font-medium px-6 py-3 rounded-md hover:bg-gray-50"
          >
            Yana kurslar ko&apos;rish
          </Link>
        </div>

        <p className="text-xs text-gray-400 mt-8">
          Sinov rejimi: haqiqiy pul yechilmadi.
        </p>
      </section>

      <Footer />
    </main>
  );
}