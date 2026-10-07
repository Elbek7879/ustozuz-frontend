"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { courses as initialCourses } from "@/lib/courses";
import { ArrowLeft, Trash2, EyeOff } from "lucide-react";

export default function AdminCoursesPage() {
  const [courses, setCourses] = useState(initialCourses);

  function handleDelete(title: string) {
    if (confirm("Bu kursni o'chirmoqchimisiz?")) {
      setCourses((prev) => prev.filter((c) => c.title !== title));
    }
  }

  return (
    <main>
      <Header />

      <section className="max-w-7xl mx-auto px-6 py-10">
        <Link
          href="/admin"
          className="inline-flex items-center gap-1.5 text-sm text-gray-600 hover:text-indigo-700 mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Admin panel
        </Link>

        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Barcha kurslar</h1>
          <span className="text-sm text-gray-500">{courses.length} ta natija</span>
        </div>

        <div className="border border-gray-200 rounded-xl overflow-hidden overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-left text-gray-500">
              <tr>
                <th className="px-5 py-3 font-medium">Kurs nomi</th>
                <th className="px-5 py-3 font-medium">Ustoz</th>
                <th className="px-5 py-3 font-medium">Kategoriya</th>
                <th className="px-5 py-3 font-medium">Talabalar</th>
                <th className="px-5 py-3 font-medium">Reyting</th>
                <th className="px-5 py-3 font-medium">Narx</th>
                <th className="px-5 py-3 font-medium text-right">Amallar</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((c) => (
                <tr key={c.title} className="border-t border-gray-100">
                  <td className="px-5 py-3 font-medium text-gray-900 max-w-xs">
                    {c.title}
                  </td>
                  <td className="px-5 py-3 text-gray-500">{c.instructor}</td>
                  <td className="px-5 py-3">
                    <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-700">
                      {c.category}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-gray-500">{c.students}</td>
                  <td className="px-5 py-3 text-amber-600 font-medium">
                    {c.rating} ⭐
                  </td>
                  <td className="px-5 py-3 font-semibold text-gray-900">
                    {c.price}
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        title="Yashirish"
                        className="p-1.5 text-gray-400 hover:text-amber-600 hover:bg-amber-50 rounded"
                      >
                        <EyeOff className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(c.title)}
                        title="O'chirish"
                        className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="text-xs text-gray-400 mt-4">
          Eslatma: bu o&apos;zgarishlar hozircha faqat shu sahifada
          ko&apos;rinadi, backend ulanmagani uchun sahifani yangilasangiz
          qayta tiklanadi.
        </p>
      </section>

      <Footer />
    </main>
  );
}