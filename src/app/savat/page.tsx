"use client";

import Link from "next/link";
import { Trash2 } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useCart } from "@/lib/cart/CartContext";
import { formatPrice } from "@/lib/format";

export default function CartPage() {
  const { items, removeItem, total } = useCart();

  return (
    <main>
      <Header />

      <section className="max-w-4xl mx-auto px-6 py-10">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">Savat</h1>

        {items.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-500 mb-4">Savatingiz hozircha bo&apos;sh.</p>
            <Link
              href="/kurslar"
              className="text-indigo-700 font-medium hover:underline"
            >
              Kurslarni ko&apos;rish →
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-4">
              {items.map((course) => (
                <div
                  key={course.id}
                  className="flex items-center gap-4 border border-gray-200 rounded-lg p-4"
                >
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 text-sm">
                      {course.title}
                    </h3>
                    <p className="text-xs text-gray-500 mt-1">
                      {course.instructor}
                    </p>
                    <p className="font-bold text-gray-900 mt-2">
                      {formatPrice(course.price)}
                    </p>
                  </div>
                  <button
                    onClick={() => removeItem(course.id)}
                    aria-label="O'chirish"
                    className="p-2 text-gray-400 hover:text-red-600"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>

            <div className="border border-gray-200 rounded-lg p-5 h-fit">
              <h2 className="font-semibold text-gray-900 mb-4">
                Buyurtma xulosasi
              </h2>
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>Kurslar soni</span>
                <span>{items.length}</span>
              </div>
              <div className="flex justify-between font-bold text-gray-900 text-base border-t border-gray-200 pt-3 mt-3">
                <span>Jami</span>
                <span>{formatPrice(total)}</span>
              </div>
              <Link
                href="/tolov"
                className="block w-full text-center bg-indigo-700 text-white font-medium py-2.5 rounded-md hover:bg-indigo-800 mt-5"
              >
                To&apos;lash
              </Link>
            </div>
          </div>
        )}
      </section>

      <Footer />
    </main>
  );
}