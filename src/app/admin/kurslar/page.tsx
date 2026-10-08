"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { Trash2, EyeOff, Eye, ExternalLink } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RequireRole from "@/components/RequireRole";
import AdminNav from "@/components/AdminNav";
import Skeleton from "@/components/Skeleton";
import { useAuth } from "@/lib/auth/AuthContext";
import {
  ApiError,
  deleteAdminCourse,
  getAdminCourses,
  setAdminCourseStatus,
  type ApiAdminCourse,
  type CourseStatus,
} from "@/lib/api";
import { formatPrice } from "@/lib/format";

const statusLabel: Record<CourseStatus, { text: string; className: string }> = {
  ACTIVE: { text: "Faol", className: "bg-emerald-50 text-emerald-700" },
  DRAFT: { text: "Qoralama", className: "bg-amber-50 text-amber-700" },
  HIDDEN: { text: "Yashirin", className: "bg-gray-100 text-gray-600" },
};

function CoursesTable() {
  const { token } = useAuth();
  const [courses, setCourses] = useState<ApiAdminCourse[] | null>(null);
  const [busyId, setBusyId] = useState<number | null>(null);

  useEffect(() => {
    if (!token) return;
    getAdminCourses(token)
      .then(setCourses)
      .catch(() => toast.error("Kurslarni yuklab bo'lmadi"));
  }, [token]);

  async function changeStatus(c: ApiAdminCourse, status: CourseStatus) {
    if (!token) return;
    setBusyId(c.id);
    try {
      await setAdminCourseStatus(token, c.id, status);
      setCourses((prev) => prev?.map((x) => (x.id === c.id ? { ...x, status } : x)) ?? null);
      toast.success(status === "HIDDEN" ? "Kurs yashirildi" : "Kurs faollashtirildi");
    } catch (err) {
      toast.error(err instanceof ApiError ? err.message : "Xatolik yuz berdi");
    } finally {
      setBusyId(null);
    }
  }

  async function handleDelete(c: ApiAdminCourse) {
    if (!token) return;
    if (!confirm(`"${c.title}" kursini o'chirmoqchimisiz? Bu amalni ortga qaytarib bo'lmaydi.`)) return;
    setBusyId(c.id);
    try {
      await deleteAdminCourse(token, c.id);
      setCourses((prev) => prev?.filter((x) => x.id !== c.id) ?? null);
      toast.success("Kurs o'chirildi");
    } catch (err) {
      toast.error(err instanceof ApiError ? err.message : "Xatolik yuz berdi");
    } finally {
      setBusyId(null);
    }
  }

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8 md:py-10">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-lg md:text-xl font-bold text-gray-900">Barcha kurslar</h1>
        <span className="text-sm text-gray-500">{courses?.length ?? 0} ta natija</span>
      </div>

      {courses === null ? (
        <div className="space-y-2">
          {Array.from({ length: 6 }, (_, i) => (
            <Skeleton key={i} className="h-12" />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl bg-white ring-1 ring-gray-200 overflow-hidden overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-left text-gray-500">
              <tr>
                <th className="px-5 py-3 font-medium">Kurs nomi</th>
                <th className="px-5 py-3 font-medium">Ustoz</th>
                <th className="px-5 py-3 font-medium">Kategoriya</th>
                <th className="px-5 py-3 font-medium">Talabalar</th>
                <th className="px-5 py-3 font-medium">Narx</th>
                <th className="px-5 py-3 font-medium">Holat</th>
                <th className="px-5 py-3 font-medium text-right">Amallar</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((c) => {
                const status = statusLabel[c.status];
                const busy = busyId === c.id;
                return (
                  <tr key={c.id} className="border-t border-gray-100">
                    <td className="px-5 py-3 font-medium text-gray-900 max-w-xs">{c.title}</td>
                    <td className="px-5 py-3 text-gray-500">{c.instructorName}</td>
                    <td className="px-5 py-3">
                      <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-700">
                        {c.category}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-gray-500">{c.studentsCount}</td>
                    <td className="px-5 py-3 font-semibold text-gray-900 whitespace-nowrap">
                      {formatPrice(c.price)}
                    </td>
                    <td className="px-5 py-3">
                      <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${status.className}`}>
                        {status.text}
                      </span>
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex items-center justify-end gap-1">
                        {c.status === "ACTIVE" && (
                          <Link
                            href={`/kurslar/${c.slug}`}
                            title="Ko'rish"
                            className="p-1.5 text-gray-400 hover:text-indigo-700 hover:bg-indigo-50 rounded"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </Link>
                        )}
                        {c.status === "ACTIVE" ? (
                          <button
                            onClick={() => changeStatus(c, "HIDDEN")}
                            disabled={busy}
                            title="Yashirish"
                            className="p-1.5 text-gray-400 hover:text-amber-600 hover:bg-amber-50 rounded disabled:opacity-40"
                          >
                            <EyeOff className="w-4 h-4" />
                          </button>
                        ) : (
                          <button
                            onClick={() => changeStatus(c, "ACTIVE")}
                            disabled={busy}
                            title="Faollashtirish"
                            className="p-1.5 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded disabled:opacity-40"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                        )}
                        <button
                          onClick={() => handleDelete(c)}
                          disabled={busy}
                          title="O'chirish"
                          className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded disabled:opacity-40"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
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

export default function AdminCoursesPage() {
  return (
    <RequireRole role="ADMIN">
      <main>
        <Header />
        <AdminNav />
        <CoursesTable />
        <Footer />
      </main>
    </RequireRole>
  );
}
