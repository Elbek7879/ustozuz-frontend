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

const siteDescription =
  "O'zbekistondagi eng yaxshi ustozlardan onlayn o'rganing: dasturlash, dizayn, biznes, tillar va boshqa yo'nalishlar bo'yicha video kurslar.";

export const metadata: Metadata = {
  // Ulashish kartochkalaridagi rasm va havolalar shu manzil asosida to'liq yoziladi
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://ustozuz.vercel.app"),
  title: {
    default: "UstozUz — Onlayn ta'lim platformasi",
    template: "%s — UstozUz",
  },
  description: siteDescription,
  openGraph: {
    type: "website",
    siteName: "UstozUz",
    locale: "uz_UZ",
    title: "UstozUz — Onlayn ta'lim platformasi",
    description: siteDescription,
  },
  twitter: {
    card: "summary_large_image",
    title: "UstozUz — Onlayn ta'lim platformasi",
    description: siteDescription,
  },
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
