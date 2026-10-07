"use client";

import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import type { Course } from "@/lib/courses";

type CartContextType = {
  items: Course[];
  addItem: (course: Course) => void;
  removeItem: (title: string) => void;
  isInCart: (title: string) => boolean;
  total: number;
  clearCart: () => void;
};

const CartContext = createContext<CartContextType | null>(null);

function parsePrice(price: string): number {
  if (typeof price !== "string") return 0;
  return Number(price.replace(/[^\d]/g, ""));
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<Course[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("ustozuz_cart");
      if (saved) setItems(JSON.parse(saved));
    } catch {
      setItems([]);
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem("ustozuz_cart", JSON.stringify(items));
  }, [items, hydrated]);

  function addItem(course: Course) {
    if (items.some((c) => c.title === course.title)) return;
    setItems((prev) => [...prev, course]);
    toast.success(`"${course.title}" savatga qo'shildi`);
  }

  function removeItem(title: string) {
    setItems((prev) => prev.filter((c) => c.title !== title));
  }

  function isInCart(title: string) {
    return items.some((c) => c.title === title);
  }

  function clearCart() {
    setItems([]);
  }

  const total = items.reduce((sum, c) => sum + parsePrice(c.price), 0);

  return (
    <CartContext.Provider
      value={{ items, addItem, removeItem, isInCart, total, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart CartProvider ichida ishlatilishi kerak");
  return ctx;
}