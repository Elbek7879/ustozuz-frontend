"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { useAuth } from "@/lib/auth/AuthContext";
import { getEnrolledCourses } from "@/lib/api";

type EnrolledContextType = {
  // Foydalanuvchi sotib olgan kurslar id'lari
  enrolledIds: Set<number>;
  isEnrolled: (courseId: number) => boolean;
  refresh: () => Promise<void>;
};

const EnrolledContext = createContext<EnrolledContextType | null>(null);

export function EnrolledProvider({ children }: { children: React.ReactNode }) {
  const { token } = useAuth();
  const [enrolledIds, setEnrolledIds] = useState<Set<number>>(new Set());

  const refresh = useCallback(async () => {
    if (!token) {
      setEnrolledIds(new Set());
      return;
    }
    try {
      const courses = await getEnrolledCourses(token);
      setEnrolledIds(new Set(courses.map((c) => c.courseId)));
    } catch {
      // Muhim emas: tugmalar oddiy "Savatga qo'shish" ko'rinishida qoladi
    }
  }, [token]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return (
    <EnrolledContext.Provider
      value={{ enrolledIds, isEnrolled: (id) => enrolledIds.has(id), refresh }}
    >
      {children}
    </EnrolledContext.Provider>
  );
}

export function useEnrolled() {
  const ctx = useContext(EnrolledContext);
  if (!ctx) throw new Error("useEnrolled EnrolledProvider ichida ishlatilishi kerak");
  return ctx;
}
