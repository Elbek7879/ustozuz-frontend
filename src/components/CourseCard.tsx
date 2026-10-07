"use client";

import Link from "next/link";
import Image from "next/image";
import { ShoppingCart, Check } from "lucide-react";
import { categories } from "@/lib/categories";
import { useCart } from "@/lib/cart/CartContext";
import { formatPrice } from "@/lib/format";
import { coverOf } from "@/lib/images";
import type { ApiCourseCard } from "@/lib/api";

export default function CourseCard({ course }: { course: ApiCourseCard }) {
  const cat = categories.find((c) => c.title === course.category);
  const { addItem, isInCart } = useCart();
  const inCart = isInCart(course.title);

  function handleAdd() {
    addItem({
      title: course.title,
      instructor: course.instructorName,
      category: course.category,
      rating: course.rating,
      students: course.studentsCount,
      price: formatPrice(course.price),
      image: course.imageUrl,
    });
  }

  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition-all bg-white">
      <Link href={`/kurslar/${course.slug}`} className="block">
        <div className="relative h-32 w-full">
          <Image
            src={coverOf(course.imageUrl)}
            alt={course.title}
            fill
            sizes="(max-width: 640px) 50vw, 260px"
            className="object-cover"
          />
        </div>

        <div className="p-4 pb-0">
          <span className={`text-xs font-medium ${cat?.iconColor ?? "text-gray-600"}`}>
            {course.category}
          </span>
          <h3 className="font-semibold text-gray-900 text-sm leading-snug line-clamp-2 mt-1">
            {course.title}
          </h3>
          <p className="text-xs text-gray-500 mt-1">{course.instructorName}</p>

          <div className="flex items-center gap-1 mt-2">
            <span className="text-amber-500 font-bold text-sm">{course.rating}</span>
            <span className="text-xs text-gray-400">({course.studentsCount})</span>
          </div>

          <p className="font-bold text-gray-900 mt-2">{formatPrice(course.price)}</p>
        </div>
      </Link>

      <div className="p-4 pt-3">
        <button
          onClick={handleAdd}
          disabled={inCart}
          className={`w-full flex items-center justify-center gap-1.5 text-sm font-medium py-2 rounded-md transition ${
            inCart
              ? "bg-emerald-50 text-emerald-700 cursor-default"
              : "border border-indigo-700 text-indigo-700 hover:bg-indigo-50"
          }`}
        >
          {inCart ? (
            <>
              <Check className="w-4 h-4" /> Savatda
            </>
          ) : (
            <>
              <ShoppingCart className="w-4 h-4" /> Savatga qo&apos;shish
            </>
          )}
        </button>
      </div>
    </div>
  );
}