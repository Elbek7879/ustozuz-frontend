"use client";

import { ShoppingCart, Check } from "lucide-react";
import type { ApiCourseCard } from "@/lib/api";
import { useCart } from "@/lib/cart/CartContext";
import { formatPrice } from "@/lib/format";

export default function AddToCartButton({ course }: { course: ApiCourseCard }) {
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
    <button
      onClick={handleAdd}
      disabled={inCart}
      className={`mt-4 w-full flex items-center justify-center gap-2 font-medium py-3 rounded-md transition ${
        inCart
          ? "bg-emerald-50 text-emerald-700 cursor-default"
          : "bg-indigo-700 text-white hover:bg-indigo-800"
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
  );
}