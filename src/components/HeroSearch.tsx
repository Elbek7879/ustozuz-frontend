"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

const popular = ["Python", "Ingliz tili", "UI/UX", "SMM", "Java"];

export default function HeroSearch() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const q = query.trim();
    router.push(q ? `/kurslar?qidiruv=${encodeURIComponent(q)}` : "/kurslar");
  }

  return (
    <div className="mt-8">
      <form
        onSubmit={handleSubmit}
        role="search"
        className="flex items-center gap-2 bg-white rounded-2xl p-2 shadow-lg shadow-indigo-100/70 ring-1 ring-gray-200 focus-within:ring-2 focus-within:ring-indigo-500 max-w-xl"
      >
        <Search className="w-5 h-5 text-gray-400 ml-3 shrink-0" />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Masalan: Python"
          aria-label="Kurs qidirish"
          className="flex-1 min-w-0 py-2.5 text-[15px] bg-transparent focus:outline-none placeholder:text-gray-400"
        />
        <button
          type="submit"
          className="shrink-0 bg-indigo-700 text-white font-semibold text-sm px-5 py-3 rounded-xl hover:bg-indigo-800 transition-colors"
        >
          Qidirish
        </button>
      </form>

      <div className="flex flex-wrap items-center gap-2 mt-4 text-sm">
        <span className="text-gray-500">Ommabop:</span>
        {popular.map((p) => (
          <Link
            key={p}
            href={`/kurslar?qidiruv=${encodeURIComponent(p)}`}
            className="px-3 py-1 rounded-full bg-white ring-1 ring-gray-200 text-gray-700 hover:ring-indigo-300 hover:text-indigo-700 transition"
          >
            {p}
          </Link>
        ))}
      </div>
    </div>
  );
}
