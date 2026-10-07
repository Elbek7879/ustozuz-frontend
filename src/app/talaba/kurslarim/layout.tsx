import type { Metadata } from "next";

export const metadata: Metadata = { title: "Mening kurslarim" };

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
