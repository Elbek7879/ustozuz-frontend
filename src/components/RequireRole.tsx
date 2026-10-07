"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth/AuthContext";

export default function RequireRole({
  role,
  children,
}: {
  role: "STUDENT" | "INSTRUCTOR" | "ADMIN";
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;
    if (!user) {
      router.push("/kirish");
      return;
    }
    if (user.role !== role) {
      router.push("/");
    }
  }, [user, loading, role, router]);

  if (loading || !user || user.role !== role) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-20 text-center text-gray-400">
        Yuklanmoqda...
      </div>
    );
  }

  return <>{children}</>;
}