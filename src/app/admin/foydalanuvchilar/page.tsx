"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowLeft, Trash2, Ban } from "lucide-react";

const initialUsers = [
  { name: "Elbek Aliyev", email: "elbek@misol.uz", role: "Talaba", joined: "12.01.2026", status: "Faol" },
  { name: "Aziz Karimov", email: "aziz@misol.uz", role: "Ustoz", joined: "03.11.2025", status: "Faol" },
  { name: "Nilufar Yusupova", email: "nilufar@misol.uz", role: "Ustoz", joined: "18.09.2025", status: "Faol" },
  { name: "Sardor Tojiyev", email: "sardor@misol.uz", role: "Ustoz", joined: "05.02.2026", status: "Kutilmoqda" },
  { name: "Malika Nazarova", email: "malika@misol.uz", role: "Talaba", joined: "22.03.2026", status: "Faol" },
  { name: "Jasur Rahimov", email: "jasur@misol.uz", role: "Ustoz", joined: "14.08.2025", status: "Faol" },
];

export default function UsersPage() {
  const [users, setUsers] = useState(initialUsers);

  function handleDelete(email: string) {
    if (confirm("Bu foydalanuvchini o'chirmoqchimisiz?")) {
      setUsers((prev) => prev.filter((u) => u.email !== email));
    }
  }

  function handleBlock(email: string) {
    setUsers((prev) =>
      prev.map((u) =>
        u.email === email
          ? { ...u, status: u.status === "Bloklangan" ? "Faol" : "Bloklangan" }
          : u
      )
    );
  }

  return (
    <main>
      <Header />

      <section className="max-w-7xl mx-auto px-6 py-10">
        <Link
          href="/admin"
          className="inline-flex items-center gap-1.5 text-sm text-gray-600 hover:text-indigo-700 mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Admin panel
        </Link>

        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900">
            Foydalanuvchilar
          </h1>
          <span className="text-sm text-gray-500">{users.length} ta natija</span>
        </div>

        <div className="border border-gray-200 rounded-xl overflow-hidden overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-left text-gray-500">
              <tr>
                <th className="px-5 py-3 font-medium">Ism</th>
                <th className="px-5 py-3 font-medium">Email</th>
                <th className="px-5 py-3 font-medium">Rol</th>
                <th className="px-5 py-3 font-medium">Qo&apos;shilgan sana</th>
                <th className="px-5 py-3 font-medium">Holat</th>
                <th className="px-5 py-3 font-medium text-right">Amallar</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.email} className="border-t border-gray-100">
                  <td className="px-5 py-3 font-medium text-gray-900">
                    {u.name}
                  </td>
                  <td className="px-5 py-3 text-gray-500">{u.email}</td>
                  <td className="px-5 py-3">
                    <span
                      className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                        u.role === "Ustoz"
                          ? "bg-indigo-50 text-indigo-700"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {u.role}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-gray-500">{u.joined}</td>
                  <td className="px-5 py-3">
                    <span
                      className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                        u.status === "Faol"
                          ? "bg-emerald-50 text-emerald-700"
                          : u.status === "Bloklangan"
                          ? "bg-red-50 text-red-700"
                          : "bg-amber-50 text-amber-700"
                      }`}
                    >
                      {u.status}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleBlock(u.email)}
                        title="Bloklash/Blokdan chiqarish"
                        className="p-1.5 text-gray-400 hover:text-amber-600 hover:bg-amber-50 rounded"
                      >
                        <Ban className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(u.email)}
                        title="O'chirish"
                        className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="text-xs text-gray-400 mt-4">
          Eslatma: bu o&apos;zgarishlar hozircha faqat shu sahifada
          ko&apos;rinadi, backend ulanmagani uchun sahifani yangilasangiz
          qayta tiklanadi.
        </p>
      </section>

      <Footer />
    </main>
  );
}