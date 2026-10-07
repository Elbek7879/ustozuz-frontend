"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { CreditCard, Smartphone, Lock } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useCart } from "@/lib/cart/CartContext";

const methods = [
  { id: "payme", title: "Payme", desc: "Payme ilovasi orqali to'lash", icon: Smartphone },
  { id: "click", title: "Click", desc: "Click ilovasi orqali to'lash", icon: Smartphone },
  { id: "card", title: "Uzcard / Humo", desc: "Bank kartasi orqali to'lash", icon: CreditCard },
];

export default function CheckoutPage() {
  const router = useRouter();
  const { items, total, clearCart } = useCart();
  const [method, setMethod] = useState("payme");
  const [paid, setPaid] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "" });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log("Buyurtma:", { ...form, method, items });
    setPaid(true);
    clearCart();
    toast.success("To'lov qabul qilindi");
    router.push("/tolov/muvaffaqiyat");
  }

  if (items.length === 0 && !paid) {
    return (
      <main>
        <Header />
        <section className="max-w-xl mx-auto px-6 py-24 text-center">
          <p className="text-gray-500 mb-4">
            To&apos;lash uchun savatda kurs bo&apos;lishi kerak.
          </p>
          <Link
            href="/kurslar"
            className="text-indigo-700 font-medium hover:underline"
          >
            Kurslarni ko&apos;rish →
          </Link>
        </section>
        <Footer />
      </main>
    );
  }

  return (
    <main>
      <Header />

      <section className="max-w-5xl mx-auto px-6 py-10">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">
          To&apos;lovni rasmiylashtirish
        </h1>

        <form
          onSubmit={handleSubmit}
          className="grid md:grid-cols-[1fr_360px] gap-10"
        >
          <div className="space-y-8">
            <div>
              <h2 className="font-semibold text-gray-900 mb-4">
                Shaxsiy ma&apos;lumotlar
              </h2>
              <div className="space-y-4">
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
                    placeholder="Elbek Abduraximov"
                    className="w-full border border-gray-300 rounded-md px-4 py-2.5 text-sm focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Telefon raqam
                  </label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3 border border-r-0 border-gray-300 rounded-l-md bg-gray-50 text-sm text-gray-600">
                      +998
                    </span>
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      required
                      inputMode="numeric"
                      pattern="[0-9]{9}"
                      maxLength={9}
                      placeholder="901234567"
                      className="w-full border border-gray-300 rounded-r-md px-4 py-2.5 text-sm focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="font-semibold text-gray-900 mb-4">
                To&apos;lov usuli
              </h2>
              <div className="space-y-3">
                {methods.map((m) => {
                  const Icon = m.icon;
                  const selected = method === m.id;
                  return (
                    <label
                      key={m.id}
                      className={`flex items-center gap-4 border rounded-lg p-4 cursor-pointer transition ${
                        selected
                          ? "border-indigo-600 bg-indigo-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <input
                        type="radio"
                        name="method"
                        value={m.id}
                        checked={selected}
                        onChange={() => setMethod(m.id)}
                        className="sr-only"
                      />
                      <div
                        className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          selected ? "bg-indigo-600" : "bg-gray-100"
                        }`}
                      >
                        <Icon
                          className={`w-5 h-5 ${
                            selected ? "text-white" : "text-gray-500"
                          }`}
                        />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900 text-sm">
                          {m.title}
                        </p>
                        <p className="text-xs text-gray-500">{m.desc}</p>
                      </div>
                      <div
                        className={`w-4 h-4 rounded-full border-2 ${
                          selected
                            ? "border-indigo-600 bg-indigo-600 ring-2 ring-white ring-inset"
                            : "border-gray-300"
                        }`}
                      />
                    </label>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="border border-gray-200 rounded-xl p-5 h-fit md:sticky md:top-20">
            <h2 className="font-semibold text-gray-900 mb-4">Buyurtma</h2>

            <div className="space-y-3 pb-4 border-b border-gray-200">
              {items.map((c) => (
                <div key={c.title} className="flex justify-between gap-3 text-sm">
                  <span className="text-gray-700 line-clamp-2">{c.title}</span>
                  <span className="font-medium text-gray-900 shrink-0">
                    {c.price}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex justify-between font-bold text-gray-900 text-base pt-4">
              <span>Jami</span>
              <span>{total.toLocaleString("uz-UZ")} so&apos;m</span>
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-indigo-700 text-white font-medium py-3 rounded-md hover:bg-indigo-800 mt-5"
            >
              <Lock className="w-4 h-4" />
              To&apos;lash
            </button>

            <p className="text-xs text-gray-400 mt-3 text-center">
              Bu namunaviy sahifa: hozircha haqiqiy to&apos;lov o&apos;tmaydi.
            </p>
          </div>
        </form>
      </section>

      <Footer />
    </main>
  );
}