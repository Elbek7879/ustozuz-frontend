"use client";

import { use, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import { KeyRound } from "lucide-react";
import AuthShell, { authButtonClass } from "@/components/AuthShell";
import PasswordInput from "@/components/PasswordInput";
import { resetPasswordRequest, ApiError } from "@/lib/api";

export default function ResetPasswordPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = use(params);
  const router = useRouter();
  const [form, setForm] = useState({ password: "", confirm: "" });
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (form.password !== form.confirm) {
      toast.error("Parollar bir-biriga mos kelmadi");
      return;
    }

    setLoading(true);
    try {
      await resetPasswordRequest(token, form.password);
      toast.success("Parol muvaffaqiyatli yangilandi");
      router.push("/kirish");
    } catch (err) {
      const message = err instanceof ApiError ? err.message : "Xatolik yuz berdi";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthShell>
        <div className="w-14 h-14 rounded-full bg-indigo-50 flex items-center justify-center mb-6">
          <KeyRound className="w-7 h-7 text-indigo-600" />
        </div>

        <h1 className="text-3xl font-bold text-gray-900 tracking-tight mb-2">
          Yangi parol o&apos;rnating
        </h1>
        <p className="text-gray-500 text-sm mb-8">
          Hisobingiz uchun yangi parol kiriting.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Yangi parol
            </label>
            <PasswordInput
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
              minLength={6}
              placeholder="Kamida 6 ta belgi"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Yangi parolni takrorlang
            </label>
            <PasswordInput
              value={form.confirm}
              onChange={(e) => setForm({ ...form, confirm: e.target.value })}
              required
              minLength={6}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={authButtonClass}
          >
            {loading ? "Yangilanmoqda..." : "Parolni yangilash"}
          </button>
        </form>
    </AuthShell>
  );
}