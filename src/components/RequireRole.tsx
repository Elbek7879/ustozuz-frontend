"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth/AuthContext";
import type { ApiUser } from "@/lib/api";

type Role = ApiUser["role"];

// role berilmasa — tizimga kirgan istalgan foydalanuvchi o'tadi
export default function RequireRole({
  role,
  children,
}: {
  role?: Role | Role[];
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const allowed =
    !!user && (!role || (Array.isArray(role) ? role.includes(user.role) : user.role === role));

  useEffect(() => {
    if (loading) return;
    if (!user) {
      router.push(`/kirish?next=${encodeURIComponent(pathname)}`);
      return;
    }
    if (!allowed) {
      router.push("/");
    }
  }, [user, loading, allowed, pathname, router]);

  if (loading || !allowed) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-20 text-center text-gray-400">
        Yuklanmoqda...
      </div>
    );
  }

  return <>{children}</>;
}
