import Link from "next/link";
import Image from "next/image";
import * as Icons from "lucide-react";
import { ArrowUpRight } from "lucide-react";
import type { ApiCategory } from "@/lib/api";
import { categories as localMeta } from "@/lib/categories";
import { DEFAULT_COVER } from "@/lib/images";

// Rasmli kategoriya kartochkasi: bosh sahifada va /kategoriyalar sahifasida
export default function CategoryCard({ category }: { category: ApiCategory }) {
  const meta = localMeta.find((m) => m.title === category.title);
  const Icon = (Icons[category.icon as keyof typeof Icons] ?? Icons.BookOpen) as Icons.LucideIcon;

  return (
    <Link
      href={`/kurslar?kategoriya=${encodeURIComponent(category.title)}`}
      className="group relative block h-44 sm:h-56 rounded-2xl overflow-hidden bg-gray-900 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
    >
      <Image
        src={meta?.image ?? DEFAULT_COVER}
        alt={category.title}
        fill
        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 300px"
        className="object-cover opacity-90 group-hover:scale-110 transition-transform duration-500"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-gray-950/90 via-gray-950/40 to-gray-950/5" />

      <div className="absolute top-3 left-3 sm:top-4 sm:left-4 w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-white/15 backdrop-blur-md ring-1 ring-white/25 flex items-center justify-center">
        <Icon className="w-5 h-5 text-white" />
      </div>

      <div className="absolute top-3 right-3 sm:top-4 sm:right-4 w-8 h-8 rounded-full bg-white text-gray-900 flex items-center justify-center opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
        <ArrowUpRight className="w-4 h-4" />
      </div>

      <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
        <h3 className="text-base sm:text-lg font-bold text-white">{category.title}</h3>
        <p className="hidden sm:block text-xs text-gray-300 mt-1 line-clamp-1">{category.description}</p>
        <span className="inline-block mt-2 text-[11px] font-semibold text-white bg-white/15 backdrop-blur-md ring-1 ring-white/20 px-2.5 py-1 rounded-full">
          {category.coursesCount} ta kurs
        </span>
      </div>
    </Link>
  );
}
