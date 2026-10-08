"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import AuthShell, { authButtonClass, authInputClass } from "@/components/AuthShell";
import PasswordInput from "@/components/PasswordInput";
import { useAuth, ApiError } from "@/lib/auth/AuthContext";
import { nextPath } from "@/lib/auth/redirect";

export default function RegisterPage() {
  const router = useRouter();
  const { register, user, loading: authLoading } = useAuth();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  // ?next=... ikkinchi sahifaga ham o'tsin (masalan to'lovdan kelganda)
  const [query, setQuery] = useState("");

  useEffect(() => {
    setQuery(window.location.search);
  }, []);

  // Tizimga kirgan foydalanuvchi bu sahifada qolmaydi (ro'yxatdan o'tgach ham shu yerdan yo'naltiriladi)
  useEffect(() => {
    if (!authLoading && user) router.replace(nextPath());
  }, [authLoading, user, router]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      await register(form.name, form.email, form.password);
      toast.success("Ro'yxatdan muvaffaqiyatli o'tdingiz");
    } catch (err) {
      const message = err instanceof ApiError ? err.message : "Xatolik yuz berdi";
      toast.error(message);
      setLoading(false);
    }
  }

  return (
    <AuthShell>
      <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Hisob yarating</h1>
      <p className="text-gray-500 mt-2 mb-8">
        Bepul ro&apos;yxatdan o&apos;ting va bugunoq o&apos;rganishni boshlang
      </p>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1.5">
            Ism va familiya
          </label>
          <input
            id="name"
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            autoComplete="name"
            className={authInputClass}
            placeholder="Elbek Abduraximov"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">
            Elektron pochta
          </label>
          <input
            id="email"
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            autoComplete="email"
            autoCapitalize="none"
            className={authInputClass}
            placeholder="email@misol.uz"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1.5">
            Parol
          </label>
          <PasswordInput
            id="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
            minLength={6}
            autoComplete="new-password"
            placeholder="Kamida 6 ta belgi"
          />
        </div>

        <button type="submit" disabled={loading} className={authButtonClass}>
          {loading ? "Yuborilmoqda..." : "Ro'yxatdan o'tish"}
        </button>

        <p className="text-xs text-gray-400 text-center">
          Ro&apos;yxatdan o&apos;tish orqali{" "}
          <Link href="/shartlar" className="underline hover:text-gray-600">
            foydalanish shartlari
          </Link>{" "}
          va{" "}
          <Link href="/maxfiylik" className="underline hover:text-gray-600">
            maxfiylik siyosatiga
          </Link>{" "}
          rozilik bildirasiz.
        </p>
      </form>

      <p className="text-sm text-gray-500 mt-8 text-center">
        Allaqachon hisobingiz bormi?{" "}
        <Link href={`/kirish${query}`} className="text-indigo-700 font-semibold hover:underline">
          Tizimga kiring
        </Link>
      </p>
    </AuthShell>
  );
}
