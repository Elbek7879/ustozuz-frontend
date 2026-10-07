import type { Metadata } from "next";

export const metadata: Metadata = { title: "Ustoz paneli" };

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
