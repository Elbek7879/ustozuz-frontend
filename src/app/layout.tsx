import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { CartProvider } from "@/lib/cart/CartContext";
import { AuthProvider } from "@/lib/auth/AuthContext";
import { EnrolledProvider } from "@/lib/enrollments/EnrolledContext";

const inter = Inter({
  subsets: ["latin", "latin-ext", "cyrillic"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "UstozUz — Onlayn ta'lim platformasi",
    template: "%s — UstozUz",
  },
  description: "O'zbekistondagi eng yaxshi ustozlardan onlayn o'rganing: dasturlash, dizayn, biznes, tillar va boshqa yo'nalishlar.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uz" className={inter.variable}>
      <body className="antialiased">
        <AuthProvider>
          <EnrolledProvider>
            <CartProvider>
              {children}
              <Toaster position="bottom-center" />
            </CartProvider>
          </EnrolledProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
