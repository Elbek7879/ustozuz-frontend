"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import Header from "@/components/Header";
import { useAuth, ApiError } from "@/lib/auth/AuthContext";

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuth();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      await register(form.name, form.email, form.password);
      toast.success("Ro'yxatdan muvaffaqiyatli o'tdingiz");
      router.push("/");
    } catch (err) {
      const message = err instanceof ApiError ? err.message : "Xatolik yuz berdi";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main>
      <Header />

      <section className="max-w-md mx-auto px-6 py-16">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Ro&apos;yxatdan o&apos;tish
        </h1>
        <p className="text-gray-500 text-sm mb-8">
          UstozUz&apos;da bugunoq o&apos;rganishni boshlang
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Ism va familiya
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-md px-4 py-2.5 text-sm focus:outline-none focus:border-indigo-500"
              placeholder="Elbek Aliyev"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Elektron pochta
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-md px-4 py-2.5 text-sm focus:outline-none focus:border-indigo-500"
              placeholder="email@misol.uz"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Parol
            </label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              minLength={6}
              className="w-full border border-gray-300 rounded-md px-4 py-2.5 text-sm focus:outline-none focus:border-indigo-500"
              placeholder="Kamida 6 ta belgi"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-700 text-white font-medium py-2.5 rounded-md hover:bg-indigo-800 disabled:opacity-60"
          >
            {loading ? "Yuborilmoqda..." : "Ro'yxatdan o'tish"}
          </button>
        </form>

        <p className="text-sm text-gray-500 mt-6 text-center">
          Allaqachon hisobingiz bormi?{" "}
          <Link href="/kirish" className="text-indigo-700 font-medium hover:underline">
            Tizimga kiring
          </Link>
        </p>
      </section>
    </main>
  );
}