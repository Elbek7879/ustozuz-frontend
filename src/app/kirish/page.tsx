"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import Header from "@/components/Header";
import { useAuth, ApiError } from "@/lib/auth/AuthContext";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      await login(form.email, form.password);
      toast.success("Xush kelibsiz!");
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
          Tizimga kirish
        </h1>
        <p className="text-gray-500 text-sm mb-8">
          UstozUz&apos;ga xush kelibsiz
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
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
            <div className="flex items-center justify-between mb-1">
              <label className="block text-sm font-medium text-gray-700">
                Parol
              </label>
              <Link
                href="/parolni-tiklash"
                className="text-xs font-medium text-indigo-700 hover:underline"
              >
                Parolni unutdingizmi?
              </Link>
            </div>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-md px-4 py-2.5 text-sm focus:outline-none focus:border-indigo-500"
              placeholder="Parolingiz"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-700 text-white font-medium py-2.5 rounded-md hover:bg-indigo-800 disabled:opacity-60"
          >
            {loading ? "Kirilmoqda..." : "Tizimga kirish"}
          </button>
        </form>

        <p className="text-sm text-gray-500 mt-6 text-center">
          Hisobingiz yo&apos;qmi?{" "}
          <Link href="/royxatdan-otish" className="text-indigo-700 font-medium hover:underline">
            Ro&apos;yxatdan o&apos;ting
          </Link>
        </p>
      </section>
    </main>
  );
}