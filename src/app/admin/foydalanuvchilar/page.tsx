"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { ArrowLeft, Ban, CheckCircle2, Search } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RequireRole from "@/components/RequireRole";
import Skeleton from "@/components/Skeleton";
import { useAuth } from "@/lib/auth/AuthContext";
import {
  ApiError,
  getAdminUsers,
  setUserRole,
  setUserStatus,
  type ApiAdminUser,
  type ApiUser,
} from "@/lib/api";
import { formatDate } from "@/lib/format";

const roleLabels: Record<ApiUser["role"], string> = {
  STUDENT: "Talaba",
  INSTRUCTOR: "Ustoz",
  ADMIN: "Admin",
};

function UsersTable() {
  const { token, user: me } = useAuth();
  const [users, setUsers] = useState<ApiAdminUser[] | null>(null);
  const [query, setQuery] = useState("");
  const [busyId, setBusyId] = useState<number | null>(null);

  useEffect(() => {
    if (!token) return;
    getAdminUsers(token)
      .then(setUsers)
      .catch(() => toast.error("Foydalanuvchilarni yuklab bo'lmadi"));
  }, [token]);

  function replace(updated: ApiAdminUser) {
    setUsers((prev) => prev?.map((u) => (u.id === updated.id ? updated : u)) ?? null);
  }

  async function toggleBlock(u: ApiAdminUser) {
    if (!token) return;
    const next = u.status === "BLOCKED" ? "ACTIVE" : "BLOCKED";
    if (next === "BLOCKED" && !confirm(`${u.name} bloklansinmi? U tizimga kira olmaydi.`)) return;
    setBusyId(u.id);
    try {
      replace(await setUserStatus(token, u.id, next));
      toast.success(next === "BLOCKED" ? "Foydalanuvchi bloklandi" : "Blokdan chiqarildi");
    } catch (err) {
      toast.error(err instanceof ApiError ? err.message : "Xatolik yuz berdi");
    } finally {
      setBusyId(null);
    }
  }

  async function changeRole(u: ApiAdminUser, role: ApiUser["role"]) {
    if (!token || role === u.role) return;
    setBusyId(u.id);
    try {
      replace(await setUserRole(token, u.id, role));
      toast.success(`Rol o'zgartirildi. Foydalanuvchi qayta kirganda kuchga kiradi`);
    } catch (err) {
      toast.error(err instanceof ApiError ? err.message : "Xatolik yuz berdi");
    } finally {
      setBusyId(null);
    }
  }

  const q = query.trim().toLowerCase();
  const filtered =
    users?.filter((u) => !q || u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q)) ?? [];

  return (
    <section className="max-w-7xl mx-auto px-6 py-10">
      <Link
        href="/admin"
        className="inline-flex items-center gap-1.5 text-sm text-gray-600 hover:text-indigo-700 mb-4"
      >
        <ArrowLeft className="w-4 h-4" />
        Admin panel
      </Link>

      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Foydalanuvchilar</h1>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ism yoki email"
              className="border border-gray-300 rounded-md py-2 pl-9 pr-3 text-sm focus:outline-none focus:border-indigo-500"
            />
          </div>
          <span className="text-sm text-gray-500 whitespace-nowrap">{filtered.length} ta natija</span>
        </div>
      </div>

      {users === null ? (
        <div className="space-y-2">
          {Array.from({ length: 6 }, (_, i) => (
            <Skeleton key={i} className="h-12" />
          ))}
        </div>
      ) : (
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
              {filtered.map((u) => {
                const isMe = u.id === me?.id;
                const busy = busyId === u.id;
                return (
                  <tr key={u.id} className="border-t border-gray-100">
                    <td className="px-5 py-3 font-medium text-gray-900">
                      {u.name}
                      {isMe && <span className="text-xs text-gray-400 ml-1">(siz)</span>}
                    </td>
                    <td className="px-5 py-3 text-gray-500">{u.email}</td>
                    <td className="px-5 py-3">
                      <select
                        value={u.role}
                        disabled={isMe || busy}
                        onChange={(e) => changeRole(u, e.target.value as ApiUser["role"])}
                        aria-label="Rol"
                        className="text-xs font-medium border border-gray-200 rounded-md px-2 py-1 bg-white disabled:opacity-60"
                      >
                        {Object.entries(roleLabels).map(([value, label]) => (
                          <option key={value} value={value}>
                            {label}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="px-5 py-3 text-gray-500">{formatDate(u.createdAt)}</td>
                    <td className="px-5 py-3">
                      <span
                        className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                          u.status === "ACTIVE" ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-700"
                        }`}
                      >
                        {u.status === "ACTIVE" ? "Faol" : "Bloklangan"}
                      </span>
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex items-center justify-end">
                        {!isMe && (
                          <button
                            onClick={() => toggleBlock(u)}
                            disabled={busy}
                            title={u.status === "BLOCKED" ? "Blokdan chiqarish" : "Bloklash"}
                            className={`p-1.5 rounded disabled:opacity-40 ${
                              u.status === "BLOCKED"
                                ? "text-emerald-600 hover:bg-emerald-50"
                                : "text-gray-400 hover:text-red-600 hover:bg-red-50"
                            }`}
                          >
                            {u.status === "BLOCKED" ? (
                              <CheckCircle2 className="w-4 h-4" />
                            ) : (
                              <Ban className="w-4 h-4" />
                            )}
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

export default function UsersPage() {
  return (
    <RequireRole role="ADMIN">
      <main>
        <Header />
        <UsersTable />
        <Footer />
      </main>
    </RequireRole>
  );
}
