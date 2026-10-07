"use client";

import { useState } from "react";
import Link from "next/link";
import { Award, Eye } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StudentNav from "@/components/StudentNav";
import CertificateModal from "@/components/CertificateModal";
import { myCourses, studentProfile, type MyCourse } from "@/lib/student";
import { slugify } from "@/lib/slug";

const completed = myCourses.filter((c) => c.progress === 100);
const inProgress = myCourses.filter((c) => c.progress < 100);

export default function CertificatesPage() {
  const [selected, setSelected] = useState<MyCourse | null>(null);

  return (
    <main>
      <Header />
      <StudentNav />

      <section className="max-w-7xl mx-auto px-6 py-10">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Sertifikatlarim
        </h1>
        <p className="text-gray-500 text-sm mb-8">
          Tugatgan kurslaringiz uchun olingan sertifikatlar.
        </p>

        {completed.length === 0 ? (
          <div className="text-center py-14 border border-dashed border-gray-300 rounded-xl">
            <div className="w-14 h-14 rounded-full bg-indigo-50 flex items-center justify-center mx-auto mb-4">
              <Award className="w-7 h-7 text-indigo-600" />
            </div>
            <p className="text-gray-500 text-sm">
              Hozircha sertifikatingiz yo&apos;q. Kursni tugating, sertifikat
              shu yerda paydo bo&apos;ladi.
            </p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {completed.map((c) => (
              <div
                key={c.title}
                className="border border-gray-200 rounded-xl overflow-hidden bg-white"
              >
                <div className="h-28 bg-gradient-to-br from-indigo-700 to-purple-600 flex items-center justify-center">
                  <Award className="w-12 h-12 text-white/90" />
                </div>
                <div className="p-5">
                  <h3 className="font-semibold text-gray-900 text-sm line-clamp-2">
                    {c.title}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">{c.instructor}</p>
                  <p className="text-xs text-gray-400 mt-3">
                    Tugatilgan sana: {c.completedAt ?? "—"}
                  </p>
                  <button
                    onClick={() => setSelected(c)}
                    className="mt-4 w-full flex items-center justify-center gap-2 border border-indigo-700 text-indigo-700 text-sm font-medium py-2 rounded-md hover:bg-indigo-50"
                  >
                    <Eye className="w-4 h-4" />
                    Ko&apos;rish
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {inProgress.length > 0 && (
          <div className="mt-14">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Sertifikatga yaqinlashyapsiz
            </h2>
            <div className="space-y-3">
              {inProgress.map((c) => (
                <Link
                  key={c.title}
                  href={`/talaba/kurslarim/${slugify(c.title)}`}
                  className="flex items-center gap-4 border border-gray-200 rounded-lg p-4 hover:border-indigo-300 transition"
                >
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 text-sm truncate">
                      {c.title}
                    </p>
                    <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden mt-2">
                      <div
                        className="h-full bg-indigo-700 rounded-full"
                        style={{ width: `${c.progress}%` }}
                      />
                    </div>
                  </div>
                  <span className="text-sm text-gray-500 shrink-0">
                    {c.progress}%
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </section>

      {selected && (
        <CertificateModal
          onClose={() => setSelected(null)}
          studentName={studentProfile.name}
          courseTitle={selected.title}
          date={selected.completedAt}
        />
      )}

      <Footer />
    </main>
  );
}