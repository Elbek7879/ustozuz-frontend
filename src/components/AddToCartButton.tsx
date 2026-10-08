"use client";

import Link from "next/link";
import { ShoppingCart, Check, PlayCircle } from "lucide-react";
import type { ApiCourseCard } from "@/lib/api";
import { useCart } from "@/lib/cart/CartContext";
import { useEnrolled } from "@/lib/enrollments/EnrolledContext";

const styles = {
  detail: {
    base: "mt-4 w-full flex items-center justify-center gap-2 font-medium py-3 rounded-md transition",
    add: "bg-indigo-700 text-white hover:bg-indigo-800",
  },
  card: {
    base: "w-full flex items-center justify-center gap-1.5 text-xs sm:text-sm font-medium py-2 rounded-lg whitespace-nowrap transition",
    add: "border border-indigo-700 text-indigo-700 hover:bg-indigo-50",
  },
};

export default function AddToCartButton({
  course,
  variant = "detail",
}: {
  course: ApiCourseCard;
  variant?: "detail" | "card";
}) {
  const { addItem, isInCart } = useCart();
  const { isEnrolled } = useEnrolled();
  const s = styles[variant];

  if (isEnrolled(course.id)) {
    return (
      <Link
        href={`/talaba/kurslarim/${course.slug}`}
        className={`${s.base} bg-emerald-600 text-white hover:bg-emerald-700`}
      >
        <PlayCircle className="w-4 h-4" /> Kursga o&apos;tish
      </Link>
    );
  }

  if (isInCart(course.id)) {
    return (
      <Link href="/savat" className={`${s.base} bg-emerald-50 text-emerald-700`}>
        <Check className="w-4 h-4" /> Savatda
      </Link>
    );
  }

  return (
    <button onClick={() => addItem(course)} className={`${s.base} ${s.add}`}>
      <ShoppingCart className="w-4 h-4" /> Savatga qo&apos;shish
    </button>
  );
}
