"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Video } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RequireRole from "@/components/RequireRole";
import InstructorNav from "@/components/InstructorNav";
import { useAuth } from "@/lib/auth/AuthContext";
import { createCourse, getCategories, ApiError, type ApiCategory } from "@/lib/api";

const inputClass =
  "w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition";

function CreateCourseForm() {
  const router = useRouter();
  const { token } = useAuth();
  const [categories, setCategories] = useState<ApiCategory[]>([]);
  const [form, setForm] = useState({
    title: "",
    category: "",
    description: "",
    price: "",
    imageUrl: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getCategories()
      .then(setCategories)
      .catch(() => toast.error("Kategoriyalarni yuklab bo'lmadi"));
  }, []);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!token) return;

    setLoading(true);
    try {
      const course = await createCourse(token, {
        title: form.title,
        category: form.category,
        description: form.description,
        price: Number(form.price),
        imageUrl: form.imageUrl.trim() || undefined,
      });
      toast.success("Kurs yaratildi. Endi darslarni qo'shing va nashr qiling");
      router.push(`/ustoz/kurslar/${course.id}/tahrirlash`);
    } catch (err) {
      const message = err instanceof ApiError ? err.message : "Xatolik yuz berdi";
      toast.error(message);
      setLoading(false);
    }
  }

  return (
    <section className="max-w-2xl mx-auto px-4 sm:px-6 py-8 md:py-10">
      <h1 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
        Yangi kurs yaratish
      </h1>
      <p className="text-gray-500 text-sm mb-8">
        Kursingiz haqida asosiy ma&apos;lumotlarni kiriting. Keyingi qadamda darslarni
        qo&apos;shasiz.
      </p>

      <form onSubmit={handleSubmit} className="space-y-5 rounded-3xl bg-white ring-1 ring-gray-200 p-5 md:p-8">
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
            placeholder="Masalan: Frontend dasturlash: noldan mutaxassisgacha"
            className={inputClass}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Kategoriya
          </label>
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            required
            className={`${inputClass} bg-white`}
          >
            <option value="">Kategoriyani tanlang</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.title}>
                {cat.title}
              </option>
            ))}
          </select>
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
            placeholder="Kursingizda nimalar o'rgatilishini qisqacha tasvirlab bering..."
            className={`${inputClass} resize-none`}
          />
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
            placeholder="Masalan: 249000"
            className={inputClass}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Muqova rasmi havolasi (ixtiyoriy)
          </label>
          <input
            type="url"
            name="imageUrl"
            value={form.imageUrl}
            onChange={handleChange}
            placeholder="https://..."
            className={inputClass}
          />
          <p className="text-xs text-gray-400 mt-1">
            Bo&apos;sh qoldirsangiz, standart muqova qo&apos;yiladi.
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Video darslar
          </label>
          <div className="flex items-start gap-3 rounded-2xl bg-indigo-50/60 ring-1 ring-indigo-100 p-4 text-sm text-gray-600">
            <Video className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
            <p>
              Kursni saqlagach, keyingi sahifada darslarni qo&apos;shasiz va har biriga <b>YouTube havolasini</b>{" "}
              qo&apos;yasiz — talabalar videoni saytning o&apos;zida ko&apos;radi.
            </p>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 text-white font-semibold py-3 rounded-xl hover:bg-indigo-700 disabled:opacity-60 transition"
        >
          {loading ? "Saqlanmoqda..." : "Kursni saqlash va davom etish"}
        </button>
      </form>
    </section>
  );
}

export default function CreateCoursePage() {
  return (
    <RequireRole role="INSTRUCTOR">
      <main>
        <Header />
        <InstructorNav />
        <CreateCourseForm />
        <Footer />
      </main>
    </RequireRole>
  );
}
