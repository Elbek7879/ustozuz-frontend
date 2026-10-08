import Link from "next/link";
import { ArrowRight } from "lucide-react";

// Barcha bo'limlar uchun bir xil sarlavha: kichik yorliq, katta sarlavha, izoh va ixtiyoriy havola
export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
  action,
  dark = false,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  subtitle?: string;
  align?: "left" | "center";
  action?: { label: string; href: string };
  dark?: boolean;
}) {
  const centered = align === "center";

  return (
    <div
      className={`flex flex-wrap items-end gap-4 mb-10 ${
        centered ? "justify-center text-center" : "justify-between"
      }`}
    >
      <div className={centered ? "max-w-2xl" : "max-w-2xl"}>
        {eyebrow && (
          <p
            className={`text-xs font-bold uppercase tracking-[0.15em] ${
              dark ? "text-indigo-300" : "text-indigo-600"
            }`}
          >
            {eyebrow}
          </p>
        )}
        <h2
          className={`mt-2 text-3xl md:text-4xl font-bold tracking-tight leading-tight ${
            dark ? "text-white" : "text-gray-900"
          }`}
        >
          {title}
        </h2>
        {subtitle && (
          <p className={`mt-3 text-base md:text-lg ${dark ? "text-gray-300" : "text-gray-500"}`}>
            {subtitle}
          </p>
        )}
      </div>

      {action && (
        <Link
          href={action.href}
          className="group inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-700 hover:text-indigo-800 shrink-0"
        >
          {action.label}
          <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      )}
    </div>
  );
}
