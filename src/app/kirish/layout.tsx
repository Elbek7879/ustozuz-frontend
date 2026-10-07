import type { Metadata } from "next";

export const metadata: Metadata = { title: "Tizimga kirish" };

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
