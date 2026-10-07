"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import {
  ArrowUp,
  ArrowDown,
  Plus,
  Trash2,
  Upload,
  Video,
} from "lucide-react";
import { categories } from "@/lib/categories";
import type { Course } from "@/lib/courses";

type Lesson = { id: number; title: string };
type FieldElement = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;

const initialLessons: Lesson[] = [
  { id: 1, title: "Kursga kirish va asosiy tushunchalar" },
  { id: 2, title: "Amaliy mashg'ulot: birinchi loyiha" },
  { id: 3, title: "Chuqurlashtirilgan mavzular" },
  { id: 4, title: "Real loyihada qo'llash" },
  { id: 5, title: "Yakuniy loyiha va sertifikat" },
];

const inputClass =
  "w-full border border-gray-300 rounded-md px-4 py-2.5 text-sm focus:outline-none focus:border-indigo-500";

const mockNotice =
  "Namuna rejim: o'zgarishlar hali saqlanmaydi (backend ulanmagan)";

export default function CourseEditForm({ course }: { course: Course }) {
  const router = useRouter();
  const nextId = useRef(initialLessons.length + 1);

  const [form, setForm] = useState({
    title: course.title,
    category: course.category,
    description: `Bu kursda ${course.category.toLowerCase()} sohasidagi asosiy va amaliy ko'nikmalarni bosqichma-bosqich o'rganasiz.`,
    price: String(Number(course.price.replace(/[^\d]/g, ""))),
    status: "Faol",
  });
  const [lessons, setLessons] = useState<Lesson[]>(initialLessons);

    function handleChange(e: React.ChangeEvent<FieldElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function addLesson() {
    const id = nextId.current++;
    setLessons((prev) => [...prev, { id, title: "" }]);
  }

  function updateLesson(id: number, title: string) {
    setLessons((prev) => prev.map((l) => (l.id === id ? { ...l, title } : l)));
  }

  function removeLesson(id: number) {
    setLessons((prev) => prev.filter((l) => l.id !== id));
  }

  function moveLesson(index: number, dir: -1 | 1) {
    setLessons((prev) => {
      const target = index + dir;
      if (target < 0 || target >= prev.length) return prev;
      const copy = [...prev];
      [copy[index], copy[target]] = [copy[target], copy[index]];
      return copy;
    });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log("Tahrirlangan kurs:", { ...form, lessons });
    toast(mockNotice, { icon: "ℹ️" });
    router.push("/ustoz/panel");
  }

  function handleDelete() {
    if (confirm("Bu kursni o'chirmoqchimisiz? Bu amalni ortga qaytarib bo'lmaydi.")) {
      toast(mockNotice, { icon: "ℹ️" });
      router.push("/ustoz/panel");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-10">
      <div className="space-y-5">
        <h2 className="font-semibold text-gray-900">Asosiy ma&apos;lumotlar</h2>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Kurs nomi
          </label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            required
            className={inputClass}
          />
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Kategoriya
            </label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className={`${inputClass} bg-white`}
            >
              {categories.map((cat) => (
                <option key={cat.title} value={cat.title}>
                  {cat.title}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Narx (so&apos;m)
            </label>
            <input
              type="number"
              name="price"
              value={form.price}
              onChange={handleChange}
              required
              min={0}
              className={inputClass}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Kurs tavsifi
          </label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            required
            rows={4}
            className={`${inputClass} resize-none`}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Holati
          </label>
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className={`${inputClass} bg-white sm:max-w-xs`}
          >
            <option value="Faol">Faol (talabalarga ko&apos;rinadi)</option>
            <option value="Qoralama">Qoralama (yashirin)</option>
          </select>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="font-semibold text-gray-900">Kurs muqovasi</h2>
        <div className="flex flex-col sm:flex-row gap-4 items-start">
          <div className="relative w-full sm:w-56 h-32 rounded-lg overflow-hidden shrink-0">
            <Image
              src={course.image}
              alt={course.title}
              fill
              sizes="224px"
              className="object-cover"
            />
          </div>
          <div className="flex-1 w-full border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-indigo-400 transition cursor-pointer">
            <Upload className="w-6 h-6 text-gray-400 mx-auto mb-2" />
            <p className="text-sm text-gray-500">
              Yangi rasm yuklash uchun bosing
            </p>
            <p className="text-xs text-gray-400 mt-1">
              Fayl yuklash backend ulangandan keyin ishlaydi
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-gray-900">
            Darslar dasturi ({lessons.length})
          </h2>
          <button
            type="button"
            onClick={addLesson}
            className="flex items-center gap-1.5 text-sm font-medium text-indigo-700 hover:underline"
          >
            <Plus className="w-4 h-4" />
            Dars qo&apos;shish
          </button>
        </div>

        <div className="space-y-2">
          {lessons.map((lesson, i) => (
            <div key={lesson.id} className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold flex items-center justify-center shrink-0">
                {i + 1}
              </span>
              <input
                type="text"
                value={lesson.title}
                onChange={(e) => updateLesson(lesson.id, e.target.value)}
                placeholder="Dars nomi"
                className={inputClass}
              />
              <button
                type="button"
                onClick={() => moveLesson(i, -1)}
                disabled={i === 0}
                aria-label="Yuqoriga"
                className="p-1.5 text-gray-400 hover:text-indigo-700 disabled:opacity-30 disabled:hover:text-gray-400"
              >
                <ArrowUp className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => moveLesson(i, 1)}
                disabled={i === lessons.length - 1}
                aria-label="Pastga"
                className="p-1.5 text-gray-400 hover:text-indigo-700 disabled:opacity-30 disabled:hover:text-gray-400"
              >
                <ArrowDown className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => removeLesson(lesson.id)}
                aria-label="O'chirish"
                className="p-1.5 text-gray-400 hover:text-red-600"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center bg-gray-50">
          <Video className="w-6 h-6 text-gray-400 mx-auto mb-2" />
          <p className="text-sm text-gray-500">
            Darslarga video biriktirish tez orada qo&apos;shiladi
          </p>
        </div>
      </div>

      <div className="flex flex-col-reverse sm:flex-row gap-3">
        <Link
          href="/ustoz/panel"
          className="text-center border border-gray-300 text-gray-700 font-medium px-6 py-3 rounded-md hover:bg-gray-50"
        >
          Bekor qilish
        </Link>
        <button
          type="submit"
          className="flex-1 bg-indigo-700 text-white font-medium py-3 rounded-md hover:bg-indigo-800"
        >
          O&apos;zgarishlarni saqlash
        </button>
      </div>

      <div className="border border-red-200 bg-red-50/50 rounded-xl p-5">
        <h2 className="font-semibold text-red-700 text-sm">Xavfli hudud</h2>
        <p className="text-sm text-gray-600 mt-1">
          Kurs o&apos;chirilsa, uni qayta tiklab bo&apos;lmaydi.
        </p>
        <button
          type="button"
          onClick={handleDelete}
          className="mt-3 text-sm font-medium text-red-600 border border-red-300 px-4 py-2 rounded-md hover:bg-red-50"
        >
          Kursni o&apos;chirish
        </button>
      </div>

      <p className="text-xs text-gray-400">
        Namuna rejim: o&apos;zgarishlar hozircha saqlanmaydi, backend ulangandan
        keyin ishlaydi.
      </p>
    </form>
  );
}