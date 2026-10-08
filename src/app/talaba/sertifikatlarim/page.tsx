"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { Award, Eye, ArrowRight, Search } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StudentNav from "@/components/StudentNav";
import RequireRole from "@/components/RequireRole";
import CertificateModal from "@/components/CertificateModal";
import Skeleton from "@/components/Skeleton";
import { useAuth } from "@/lib/auth/AuthContext";
import {
  getEnrolledCourses,
  getMyCertificates,
  type ApiCertificate,
  type ApiEnrolledCourse,
} from "@/lib/api";
import { formatDate } from "@/lib/format";

function CertificatesContent() {
  const { token } = useAuth();
  const [certificates, setCertificates] = useState<ApiCertificate[] | null>(null);
  const [inProgress, setInProgress] = useState<ApiEnrolledCourse[]>([]);
  const [selected, setSelected] = useState<ApiCertificate | null>(null);

  useEffect(() => {
    if (!token) return;
    Promise.all([getMyCertificates(token), getEnrolledCourses(token)])
      .then(([certs, courses]) => {
        setCertificates(certs);
        setInProgress(courses.filter((c) => c.progress < 100));
      })
      .catch(() => toast.error("Sertifikatlarni yuklab bo'lmadi"));
  }, [token]);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8 md:py-10">
      <h1 className="text-lg md:text-xl font-bold text-gray-900">Sertifikatlarim</h1>
      <p className="mt-1 text-gray-500 text-sm mb-6">Tugatgan kurslaringiz uchun olingan sertifikatlar.</p>

      {certificates === null ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {Array.from({ length: 3 }, (_, i) => (
            <Skeleton key={i} className="h-72 rounded-2xl" />
          ))}
        </div>
      ) : certificates.length === 0 ? (
        <div className="text-center py-14 px-6 rounded-3xl bg-gradient-to-b from-indigo-50 to-white ring-1 ring-indigo-100">
          <div className="w-16 h-16 rounded-2xl bg-white shadow-sm ring-1 ring-indigo-100 flex items-center justify-center mx-auto">
            <Award className="w-8 h-8 text-indigo-600" />
          </div>
          <p className="mt-5 font-bold text-gray-900">Hozircha sertifikatingiz yo&apos;q</p>
          <p className="mt-2 text-gray-500 text-sm max-w-md mx-auto">
            Kursning barcha darslarini tugating — sertifikat shu yerda avtomatik paydo bo&apos;ladi.
          </p>
          {inProgress.length === 0 && (
            <Link
              href="/kurslar"
              className="mt-6 inline-flex items-center gap-2 bg-indigo-600 text-white font-semibold px-6 py-3 rounded-xl hover:bg-indigo-700 transition"
            >
              <Search className="w-4 h-4" />
              Kurslarni ko&apos;rish
            </Link>
          )}
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {certificates.map((c) => (
            <div
              key={c.id}
              className="group rounded-2xl overflow-hidden bg-white ring-1 ring-gray-200 hover:shadow-xl hover:shadow-gray-200/70 hover:-translate-y-1 transition duration-300"
            >
              <div className="relative h-32 overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-fuchsia-500 flex items-center justify-center">
                <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-white/10" />
                <div className="absolute -bottom-12 -left-8 w-28 h-28 rounded-full bg-white/10" />
                <div className="relative text-center text-white">
                  <span className="w-14 h-14 rounded-full bg-white/20 ring-4 ring-white/10 flex items-center justify-center mx-auto">
                    <Award className="w-7 h-7" />
                  </span>
                  <p className="mt-2 text-[11px] font-bold uppercase tracking-[0.25em] text-white/85">Sertifikat</p>
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-bold text-gray-900 leading-snug line-clamp-2">{c.courseTitle}</h3>
                <p className="text-sm text-gray-500 mt-1">{c.instructorName}</p>
                <p className="text-xs text-gray-400 mt-3">
                  № {c.number} • {formatDate(c.issuedAt)}
                </p>
                <button
                  onClick={() => setSelected(c)}
                  className="mt-4 w-full flex items-center justify-center gap-2 bg-indigo-50 text-indigo-700 text-sm font-semibold py-2.5 rounded-xl hover:bg-indigo-600 hover:text-white transition"
                >
                  <Eye className="w-4 h-4" />
                  Ko&apos;rish va yuklab olish
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {inProgress.length > 0 && (
        <div className="mt-12">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Sertifikatga yaqinlashyapsiz</h2>
          <div className="grid md:grid-cols-2 gap-3">
            {inProgress.map((c) => (
              <Link
                key={c.courseId}
                href={`/talaba/kurslarim/${c.slug}`}
                className="group flex items-center gap-4 rounded-2xl bg-white ring-1 ring-gray-200 p-4 hover:ring-indigo-300 transition"
              >
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900 text-sm truncate">{c.title}</p>
                  <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden mt-2.5">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-indigo-600 to-purple-500"
                      style={{ width: `${c.progress}%` }}
                    />
                  </div>
                  <p className="mt-1.5 text-xs text-gray-500">
                    Yana {c.lessonsCount - c.completedLessons} ta dars qoldi
                  </p>
                </div>
                <span className="text-sm font-bold text-gray-700 shrink-0">{c.progress}%</span>
                <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-indigo-600 shrink-0 transition" />
              </Link>
            ))}
          </div>
        </div>
      )}

      {selected && (
        <CertificateModal
          onClose={() => setSelected(null)}
          studentName={selected.studentName}
          courseTitle={selected.courseTitle}
          date={formatDate(selected.issuedAt)}
          number={selected.number}
        />
      )}
    </section>
  );
}

export default function CertificatesPage() {
  return (
    <RequireRole>
      <main>
        <Header />
        <StudentNav />
        <CertificatesContent />
        <Footer />
      </main>
    </RequireRole>
  );
}
