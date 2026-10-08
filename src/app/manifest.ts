import type { MetadataRoute } from "next";

// Telefonda "Bosh ekranga qo'shish" — sayt ilova kabi (manzil qatorisiz) ochiladi
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "UstozUz — Onlayn ta'lim platformasi",
    short_name: "UstozUz",
    description: "O'zbekistondagi eng yaxshi ustozlardan onlayn video kurslar.",
    lang: "uz",
    start_url: "/",
    scope: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#ffffff",
    theme_color: "#4f46e5",
    categories: ["education"],
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/icons/maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
    shortcuts: [
      { name: "Mening kurslarim", url: "/talaba/kurslarim", icons: [{ src: "/icons/icon-192.png", sizes: "192x192" }] },
      { name: "Barcha kurslar", url: "/kurslar", icons: [{ src: "/icons/icon-192.png", sizes: "192x192" }] },
    ],
  };
}
