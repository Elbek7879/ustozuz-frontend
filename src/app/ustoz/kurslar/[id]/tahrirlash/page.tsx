"use client";

import { use } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RequireRole from "@/components/RequireRole";
import CourseEditForm from "@/components/CourseEditForm";

export default function EditCoursePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  return (
    <RequireRole role="INSTRUCTOR">
      <main>
        <Header />

        <section className="max-w-2xl mx-auto px-6 py-10">
          <Link
            href="/ustoz/panel"
            className="inline-flex items-center gap-1.5 text-sm text-gray-600 hover:text-indigo-700 mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Ustoz paneli
          </Link>

          <h1 className="text-2xl font-bold text-gray-900 mb-8">
            Kursni tahrirlash
          </h1>

          <CourseEditForm courseId={Number(id)} />
        </section>

        <Footer />
      </main>
    </RequireRole>
  );
}
