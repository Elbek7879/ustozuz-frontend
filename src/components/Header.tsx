"use client";

import { useState } from "react";
import Link from "next/link";
import { ShoppingCart, Menu, X, User, LogOut, BookOpen } from "lucide-react";
import { useCart } from "@/lib/cart/CartContext";
import Logo from "@/components/Logo";
import LiveSearch from "@/components/LiveSearch";
import { useAuth } from "@/lib/auth/AuthContext";

export default function Header() {
  const { items } = useCart();
  const { user, logout, loading } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  function dashboardLink() {
    if (user?.role === "ADMIN") return "/admin";
    if (user?.role === "INSTRUCTOR") return "/ustoz/panel";
    return "/talaba/kurslarim";
  }

  return (
    <header className="sticky top-0 z-50 bg-white/85 backdrop-blur-md border-b border-gray-200/70">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16 gap-6">
        <Logo />

        <div className="hidden md:flex flex-1 max-w-xl">
          <LiveSearch />
        </div>

        <nav className="hidden lg:flex items-center gap-1 text-sm font-medium text-gray-700 shrink-0">
          <Link href="/kategoriyalar" className="px-3 py-2 rounded-lg hover:bg-gray-100 hover:text-indigo-700 transition">
            Kategoriyalar
          </Link>
          <Link href="/ustoz-bolish" className="px-3 py-2 rounded-lg hover:bg-gray-100 hover:text-indigo-700 transition">
            Ustoz bo&apos;lish
          </Link>
        </nav>

        <div className="flex items-center gap-3 shrink-0">
          <Link href="/savat" aria-label="Savat" className="relative p-2 rounded-lg hover:bg-gray-100 hover:text-indigo-700 transition">
            <ShoppingCart className="w-5 h-5" />
            {items.length > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-gradient-to-br from-indigo-600 to-purple-600 text-white text-[10px] font-bold min-w-4 h-4 px-1 rounded-full flex items-center justify-center ring-2 ring-white">
                {items.length}
              </span>
            )}
          </Link>

          {loading ? (
            // Sessiya tekshirilayotganda "Tizimga kirish" bir lahza ko'rinib qolmasin
            <div className="w-8 h-8" aria-hidden />
          ) : user ? (
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen((v) => !v)}
                aria-label="Foydalanuvchi menyusi"
                className="flex items-center gap-2 p-1.5 rounded-full hover:bg-gray-100"
              >
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 text-white text-sm font-semibold flex items-center justify-center ring-2 ring-white shadow-sm">
                  {user.name.charAt(0).toUpperCase()}
                </div>
              </button>

              {userMenuOpen && (
                <div className="absolute right-0 top-12 bg-white rounded-2xl shadow-xl ring-1 ring-black/5 w-56 p-2">
                  <p className="px-3 py-2.5 mb-1 text-sm font-semibold text-gray-900 truncate border-b border-gray-100">
                    {user.name}
                  </p>
                  <Link
                    href={dashboardLink()}
                    onClick={() => setUserMenuOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-2.5 text-sm text-gray-700 rounded-xl hover:bg-gray-50"
                  >
                    <User className="w-4 h-4" />
                    Mening kabinetim
                  </Link>
                  {user.role !== "STUDENT" && (
                    <Link
                      href="/talaba/kurslarim"
                      onClick={() => setUserMenuOpen(false)}
                      className="flex items-center gap-2.5 px-3 py-2.5 text-sm text-gray-700 rounded-xl hover:bg-gray-50"
                    >
                      <BookOpen className="w-4 h-4" />
                      Sotib olgan kurslarim
                    </Link>
                  )}
                  <button
                    onClick={() => {
                      logout();
                      setUserMenuOpen(false);
                    }}
                    className="flex items-center gap-2.5 px-3 py-2.5 text-sm text-red-600 rounded-xl hover:bg-red-50 w-full text-left"
                  >
                    <LogOut className="w-4 h-4" />
                    Chiqish
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link
                href="/kirish"
                className="hidden sm:inline-block text-sm font-medium text-gray-800 hover:text-indigo-700"
              >
                Tizimga kirish
              </Link>
              <Link
                href="/royxatdan-otish"
                className="hidden sm:inline-block bg-indigo-700 text-white text-sm font-semibold px-4 py-2.5 rounded-xl hover:bg-indigo-800 shadow-sm shadow-indigo-200 transition"
              >
                Ro&apos;yxatdan o&apos;tish
              </Link>
            </>
          )}

          <button
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Menyu"
            className="lg:hidden p-2 text-gray-700"
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="lg:hidden border-t border-gray-200 px-6 py-4 space-y-4">
          <LiveSearch mobile onNavigate={() => setMenuOpen(false)} />

          <nav className="flex flex-col gap-3 text-sm font-medium text-gray-700">
            <Link href="/kategoriyalar" onClick={() => setMenuOpen(false)}>
              Kategoriyalar
            </Link>
            <Link href="/ustoz-bolish" onClick={() => setMenuOpen(false)}>
              Ustoz bo&apos;lish
            </Link>
            {!user && (
              <>
                <Link href="/kirish" onClick={() => setMenuOpen(false)}>
                  Tizimga kirish
                </Link>
                <Link
                  href="/royxatdan-otish"
                  onClick={() => setMenuOpen(false)}
                  className="bg-indigo-700 text-white text-center font-semibold px-4 py-2.5 rounded-xl"
                >
                  Ro&apos;yxatdan o&apos;tish
                </Link>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}