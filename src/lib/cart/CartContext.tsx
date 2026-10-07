"use client";

import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import type { ApiCourseCard } from "@/lib/api";

export type CartItem = {
  id: number;
  slug: string;
  title: string;
  instructor: string;
  price: number;
  image: string;
};

type CartContextType = {
  items: CartItem[];
  addItem: (course: ApiCourseCard) => void;
  removeItem: (id: number) => void;
  isInCart: (id: number) => boolean;
  total: number;
  clearCart: () => void;
};

const STORAGE_KEY = "ustozuz_cart";

const CartContext = createContext<CartContextType | null>(null);

// Eski versiyadagi savat elementlarida id yo'q edi — ularni tashlab yuboramiz
function isValidItem(value: unknown): value is CartItem {
  const item = value as CartItem;
  return typeof item?.id === "number" && typeof item?.price === "number" && typeof item?.slug === "string";
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
      setItems(Array.isArray(saved) ? saved.filter(isValidItem) : []);
    } catch {
      setItems([]);
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items, hydrated]);

  function addItem(course: ApiCourseCard) {
    if (items.some((c) => c.id === course.id)) return;
    setItems((prev) => [
      ...prev,
      {
        id: course.id,
        slug: course.slug,
        title: course.title,
        instructor: course.instructorName,
        price: course.price,
        image: course.imageUrl,
      },
    ]);
    toast.success(`"${course.title}" savatga qo'shildi`);
  }

  function removeItem(id: number) {
    setItems((prev) => prev.filter((c) => c.id !== id));
  }

  function isInCart(id: number) {
    return items.some((c) => c.id === id);
  }

  function clearCart() {
    setItems([]);
  }

  const total = items.reduce((sum, c) => sum + c.price, 0);

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
