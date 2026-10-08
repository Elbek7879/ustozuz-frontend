"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import AuthShell, { authButtonClass, authInputClass } from "@/components/AuthShell";
import PasswordInput from "@/components/PasswordInput";
import { useAuth, ApiError } from "@/lib/auth/AuthContext";
import { nextPath } from "@/lib/auth/redirect";

export default function LoginPage() {
  const router = useRouter();
  const { login, user, loading: authLoading } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  // ?next=... ikkinchi sahifaga ham o'tsin (masalan to'lovdan kelganda)
  const [query, setQuery] = useState("");

  useEffect(() => {
    setQuery(window.location.search);
  }, []);

  // Tizimga kirgan foydalanuvchi bu sahifada qolmaydi (kirgandan keyin ham shu yerdan yo'naltiriladi)
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
      await login(form.email, form.password);
      toast.success("Xush kelibsiz!");
    } catch (err) {
      const message = err instanceof ApiError ? err.message : "Xatolik yuz berdi";
      toast.error(message);
      setLoading(false);
    }
  }

  return (
    <AuthShell>
      <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Xush kelibsiz!</h1>
      <p className="text-gray-500 mt-2 mb-8">
        Hisobingizga kiring va o&apos;qishni davom ettiring
      </p>

      <form onSubmit={handleSubmit} className="space-y-5">
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
          <div className="flex items-center justify-between mb-1.5">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Parol
            </label>
            <Link
              href="/parolni-tiklash"
              className="text-xs font-medium text-indigo-700 hover:underline"
            >
              Parolni unutdingizmi?
            </Link>
          </div>
          <PasswordInput
            id="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
            autoComplete="current-password"
            placeholder="Parolingiz"
          />
        </div>

        <button type="submit" disabled={loading} className={authButtonClass}>
          {loading ? "Kirilmoqda..." : "Tizimga kirish"}
        </button>
      </form>

      <p className="text-sm text-gray-500 mt-8 text-center">
        Hisobingiz yo&apos;qmi?{" "}
        <Link href={`/royxatdan-otish${query}`} className="text-indigo-700 font-semibold hover:underline">
          Ro&apos;yxatdan o&apos;ting
        </Link>
      </p>
    </AuthShell>
  );
}
