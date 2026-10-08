"use client";

import { use } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RequireRole from "@/components/RequireRole";
import InstructorNav from "@/components/InstructorNav";
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
        <InstructorNav />

        <section className="max-w-2xl mx-auto px-4 sm:px-6 py-8 md:py-10">
          <h1 className="text-xl md:text-2xl font-bold text-gray-900 mb-6">
            Kursni tahrirlash
          </h1>

          <CourseEditForm courseId={Number(id)} />
        </section>

        <Footer />
      </main>
    </RequireRole>
  );
}
