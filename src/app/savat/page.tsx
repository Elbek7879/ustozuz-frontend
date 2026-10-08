"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Lock, ShoppingCart, Trash2 } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useCart } from "@/lib/cart/CartContext";
import { formatPrice } from "@/lib/format";
import { coverOf } from "@/lib/images";

export default function CartPage() {
  const { items, removeItem, total } = useCart();

  return (
    <main>
      <Header />

      <section className="max-w-6xl mx-auto px-6 py-10 md:py-14">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900">Savat</h1>
        <p className="text-gray-500 mt-2 mb-8">
          {items.length > 0 ? `${items.length} ta kurs tanlangan` : "Savatingiz hozircha bo'sh"}
        </p>

        {items.length === 0 ? (
          <div className="text-center py-20 rounded-3xl border-2 border-dashed border-gray-200">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-indigo-50 flex items-center justify-center">
              <ShoppingCart className="w-8 h-8 text-indigo-500" />
            </div>
            <p className="mt-5 text-lg font-semibold text-gray-900">Savatda hali kurs yo&apos;q</p>
            <p className="mt-1 text-gray-500">O&apos;zingizga yoqqan kursni tanlang va o&apos;rganishni boshlang.</p>
            <Link
              href="/kurslar"
              className="inline-flex items-center gap-2 mt-6 bg-indigo-700 text-white text-sm font-semibold px-5 py-3 rounded-xl hover:bg-indigo-800"
            >
              Kurslarni ko&apos;rish
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-[1fr_360px] gap-8 items-start">
            <div className="space-y-4">
              {items.map((course) => (
                <div
                  key={course.id}
                  className="flex items-center gap-4 bg-white rounded-2xl ring-1 ring-gray-200 p-3 sm:p-4 hover:shadow-md transition-shadow"
                >
                  <Link
                    href={`/kurslar/${course.slug}`}
                    className="relative w-24 h-16 sm:w-36 sm:h-24 rounded-xl overflow-hidden shrink-0 bg-gray-100"
                  >
                    <Image
                      src={coverOf(course.image)}
                      alt={course.title}
                      fill
                      sizes="144px"
                      className="object-cover"
                    />
                  </Link>
                  <div className="flex-1 min-w-0">
                    <Link
                      href={`/kurslar/${course.slug}`}
                      className="font-semibold text-gray-900 text-sm sm:text-base line-clamp-2 hover:text-indigo-700"
                    >
                      {course.title}
                    </Link>
                    <p className="text-xs sm:text-sm text-gray-500 mt-1 truncate">{course.instructor}</p>
                    <p className="font-bold text-gray-900 mt-1.5 sm:hidden">{formatPrice(course.price)}</p>
                  </div>
                  <p className="hidden sm:block font-bold text-gray-900 shrink-0">{formatPrice(course.price)}</p>
                  <button
                    onClick={() => removeItem(course.id)}
                    aria-label="Savatdan olib tashlash"
                    className="p-2.5 rounded-xl text-gray-400 hover:text-red-600 hover:bg-red-50 shrink-0 transition"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-3xl ring-1 ring-gray-200 p-6 lg:sticky lg:top-24 shadow-sm">
              <h2 className="font-bold text-gray-900 text-lg">Buyurtma xulosasi</h2>
              <div className="mt-5 space-y-3 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>Kurslar soni</span>
                  <span className="font-medium text-gray-900">{items.length} ta</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Chegirma</span>
                  <span className="font-medium text-gray-900">0 so&apos;m</span>
                </div>
              </div>
              <div className="flex justify-between items-baseline border-t border-gray-100 pt-4 mt-4">
                <span className="font-semibold text-gray-900">Jami</span>
                <span className="text-2xl font-extrabold text-gray-900">{formatPrice(total)}</span>
              </div>
              <Link
                href="/tolov"
                className="mt-6 flex items-center justify-center gap-2 w-full bg-indigo-700 text-white font-semibold py-3.5 rounded-xl hover:bg-indigo-800 transition"
              >
                To&apos;lovga o&apos;tish
                <ArrowRight className="w-4 h-4" />
              </Link>
              <p className="flex items-center justify-center gap-1.5 text-xs text-gray-400 mt-4">
                <Lock className="w-3.5 h-3.5" />
                Xavfsiz to&apos;lov: Payme, Click, Uzcard/Humo
              </p>
            </div>
          </div>
        )}
      </section>

      <Footer />
    </main>
  );
}
