"use client";

import Link from "next/link";
import Image from "next/image";
import { Star, Users } from "lucide-react";
import { categories } from "@/lib/categories";
import { formatNumber, formatPrice } from "@/lib/format";
import { coverOf } from "@/lib/images";
import type { ApiCourseCard } from "@/lib/api";
import AddToCartButton from "@/components/AddToCartButton";

export default function CourseCard({ course }: { course: ApiCourseCard }) {
  const cat = categories.find((c) => c.title === course.category);

  return (
    <div className="group h-full flex flex-col border border-gray-200 rounded-2xl overflow-hidden bg-white hover:shadow-lg hover:shadow-indigo-100/60 hover:-translate-y-1 transition-all duration-200">
      <Link href={`/kurslar/${course.slug}`} className="flex-1 flex flex-col">
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-gray-100">
          <Image
            src={coverOf(course.imageUrl)}
            alt={course.title}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 300px"
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <span
            className={`absolute top-3 left-3 text-[11px] font-semibold px-2 py-1 rounded-full bg-white/95 shadow-sm ${
              cat?.iconColor ?? "text-gray-700"
            }`}
          >
            {course.category}
          </span>
        </div>

        <div className="flex-1 flex flex-col p-4 pb-0">
          <h3 className="font-semibold text-gray-900 text-sm leading-snug line-clamp-2 min-h-[2.5rem] group-hover:text-indigo-700 transition-colors">
            {course.title}
          </h3>
          <p className="text-xs text-gray-500 mt-1 truncate">{course.instructorName}</p>

          <div className="flex items-center gap-3 mt-2 text-xs">
            {course.rating > 0 ? (
              <span className="flex items-center gap-1 font-semibold text-amber-600">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                {course.rating.toFixed(1)}
              </span>
            ) : (
              <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
                Yangi
              </span>
            )}
            <span className="flex items-center gap-1 text-gray-500">
              <Users className="w-3.5 h-3.5" />
              {formatNumber(course.studentsCount)} talaba
            </span>
          </div>

          <p className="font-bold text-gray-900 mt-auto pt-3">{formatPrice(course.price)}</p>
        </div>
      </Link>

      <div className="p-4 pt-3">
        <AddToCartButton course={course} variant="card" />
      </div>
    </div>
  );
}
