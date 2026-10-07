"use client";

import { useState } from "react";
import Link from "next/link";
import { ShoppingCart, Menu, X, Search, User, LogOut } from "lucide-react";
import { useCart } from "@/lib/cart/CartContext";
import { useAuth } from "@/lib/auth/AuthContext";

export default function Header() {
  const { items } = useCart();
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  function dashboardLink() {
    if (user?.role === "ADMIN") return "/admin";
    if (user?.role === "INSTRUCTOR") return "/ustoz/panel";
    return "/talaba/kurslarim";
  }

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16 gap-6">
        <Link href="/" className="text-2xl font-bold text-indigo-700 shrink-0">
          Ustoz<span className="text-gray-900">Uz</span>
        </Link>

        <div className="hidden md:flex flex-1 max-w-xl">
          <div className="relative w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Istalgan narsani qidiring"
              className="w-full border border-gray-300 rounded-full py-2 pl-10 pr-5 text-sm focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>

        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-gray-700 shrink-0">
          <Link href="/kategoriyalar" className="hover:text-indigo-700">
            Kategoriyalar
          </Link>
          <Link href="/ustoz-bolish" className="hover:text-indigo-700">
            Ustoz bo&apos;lish
          </Link>
        </nav>

        <div className="flex items-center gap-3 shrink-0">
          <Link href="/savat" className="relative p-2 hover:text-indigo-700">
            <ShoppingCart className="w-5 h-5" />
            {items.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-indigo-700 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {items.length}
              </span>
            )}
          </Link>

          {user ? (
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen((v) => !v)}
                className="flex items-center gap-2 p-1.5 rounded-full hover:bg-gray-100"
              >
                <div className="w-8 h-8 rounded-full bg-indigo-700 text-white text-xs font-semibold flex items-center justify-center">
                  {user.name.charAt(0).toUpperCase()}
                </div>
              </button>

              {userMenuOpen && (
                <div className="absolute right-0 top-12 bg-white border border-gray-200 rounded-lg shadow-lg w-48 py-2">
                  <p className="px-4 py-2 text-sm font-medium text-gray-900 truncate border-b border-gray-100">
                    {user.name}
                  </p>
                  <Link
                    href={dashboardLink()}
                    onClick={() => setUserMenuOpen(false)}
                    className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    <User className="w-4 h-4" />
                    Mening kabinetim
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setUserMenuOpen(false);
                    }}
                    className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 w-full text-left"
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
                className="hidden sm:inline-block bg-indigo-700 text-white text-sm font-medium px-4 py-2 rounded-md hover:bg-indigo-800"
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
          <input
            type="text"
            placeholder="Istalgan narsani qidiring"
            className="w-full border border-gray-300 rounded-full py-2 px-5 text-sm focus:outline-none focus:border-indigo-500"
          />

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
                  className="bg-indigo-700 text-white text-center px-4 py-2 rounded-md"
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