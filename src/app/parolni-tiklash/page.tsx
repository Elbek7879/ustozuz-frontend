"use client";

import { useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { ArrowLeft, Mail, KeyRound } from "lucide-react";
import Header from "@/components/Header";
import { forgotPasswordRequest, ApiError } from "@/lib/api";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      await forgotPasswordRequest(email);
      setSent(true);
    } catch (err) {
      toast.error(
        err instanceof ApiError ? err.message : "Server bilan bog'lanib bo'lmadi. Qayta urinib ko'ring"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main>
      <Header />

      <section className="max-w-md mx-auto px-6 py-16">
        {!sent ? (
          <>
            <div className="w-14 h-14 rounded-full bg-indigo-50 flex items-center justify-center mb-6">
              <KeyRound className="w-7 h-7 text-indigo-600" />
            </div>

            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Parolni tiklash
            </h1>
            <p className="text-gray-500 text-sm mb-8">
              Ro&apos;yxatdan o&apos;tgan elektron pochtangizni kiriting.
              Parolni yangilash uchun havola yuboramiz.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Elektron pochta
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="email@misol.uz"
                  className="w-full border border-gray-300 rounded-md px-4 py-2.5 text-sm focus:outline-none focus:border-indigo-500"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-indigo-700 text-white font-medium py-2.5 rounded-md hover:bg-indigo-800 disabled:opacity-60"
              >
                {loading ? "Yuborilmoqda..." : "Havola yuborish"}
              </button>
            </form>
          </>
        ) : (
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center mx-auto mb-6">
              <Mail className="w-8 h-8 text-emerald-600" />
            </div>

            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Pochtangizni tekshiring
            </h1>
            <p className="text-gray-500 text-sm">
              Agar <span className="font-medium text-gray-800">{email}</span>{" "}
              manzili ro&apos;yxatdan o&apos;tgan bo&apos;lsa, parolni
              yangilash havolasi yuboriladi.
            </p>
            <p className="text-gray-400 text-xs mt-4">
              Havola 1 soat amal qiladi. Xat bir necha daqiqada kelmasa,
              &quot;Spam&quot; papkasini ham tekshiring.
            </p>

            <button
              onClick={() => setSent(false)}
              className="mt-6 text-sm font-medium text-indigo-700 hover:underline"
            >
              Boshqa manzil kiritish
            </button>
          </div>
        )}

        <Link
          href="/kirish"
          className="flex items-center justify-center gap-1.5 text-sm text-gray-600 hover:text-indigo-700 mt-10"
        >
          <ArrowLeft className="w-4 h-4" />
          Kirish sahifasiga qaytish
        </Link>
      </section>
    </main>
  );
}