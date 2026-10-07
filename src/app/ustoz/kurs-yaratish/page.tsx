"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Upload, Video } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RequireRole from "@/components/RequireRole";
import { useAuth } from "@/lib/auth/AuthContext";
import { categories } from "@/lib/categories";
import { createCourse, ApiError } from "@/lib/api";

function CreateCourseForm() {
  const router = useRouter();
  const { token } = useAuth();
  const [form, setForm] = useState({
    title: "",
    category: "",
    description: "",
    price: "",
  });
  const [loading, setLoading] = useState(false);

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
      await createCourse(token, {
        title: form.title,
        category: form.category,
        description: form.description,
        price: Number(form.price),
      });
      toast.success("Kurs yaratildi");
      router.push("/ustoz/panel");
    } catch (err) {
      const message = err instanceof ApiError ? err.message : "Xatolik yuz berdi";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="max-w-2xl mx-auto px-6 py-10">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">
        Yangi kurs yaratish
      </h1>
      <p className="text-gray-500 text-sm mb-8">
        Kursingiz haqida asosiy ma&apos;lumotlarni kiriting
      </p>

      <form onSubmit={handleSubmit} className="space-y-5">
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
            className="w-full border border-gray-300 rounded-md px-4 py-2.5 text-sm focus:outline-none focus:border-indigo-500"
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
            className="w-full border border-gray-300 rounded-md px-4 py-2.5 text-sm focus:outline-none focus:border-indigo-500 bg-white"
          >
            <option value="">Kategoriyani tanlang</option>
            {categories.map((cat) => (
              <option key={cat.title} value={cat.title}>
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
            className="w-full border border-gray-300 rounded-md px-4 py-2.5 text-sm focus:outline-none focus:border-indigo-500 resize-none"
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
            className="w-full border border-gray-300 rounded-md px-4 py-2.5 text-sm focus:outline-none focus:border-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Kurs muqovasi (rasm)
          </label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-indigo-400 transition cursor-pointer">
            <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
            <p className="text-sm text-gray-500">
              Rasm yuklash tez orada qo&apos;shiladi
            </p>
            <p className="text-xs text-gray-400 mt-1">
              Hozircha standart rasm qo&apos;yiladi
            </p>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Video darslar
          </label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center bg-gray-50">
            <Video className="w-8 h-8 text-gray-400 mx-auto mb-2" />
            <p className="text-sm text-gray-500">
              Video yuklash funksiyasi tez orada qo&apos;shiladi
            </p>
            <p className="text-xs text-gray-400 mt-1">
              Hozircha kursni saqlab, darslar ro&apos;yxatini keyin to&apos;ldirishingiz mumkin
            </p>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-700 text-white font-medium py-3 rounded-md hover:bg-indigo-800 disabled:opacity-60"
        >
          {loading ? "Saqlanmoqda..." : "Kursni saqlash"}
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
        <CreateCourseForm />
        <Footer />
      </main>
    </RequireRole>
  );
}