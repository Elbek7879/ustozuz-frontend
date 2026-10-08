import { useId } from "react";
import Link from "next/link";

// Logotip: favicon bilan bir xil "U" belgisi va UstozUz yozuvi
export default function Logo({ light = false }: { light?: boolean }) {
  const gradientId = useId();
  return (
    <Link href="/" className="flex items-center gap-2 shrink-0" aria-label="UstozUz bosh sahifa">
      <svg viewBox="0 0 64 64" className="w-8 h-8" aria-hidden>
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#4f46e5" />
            <stop offset="1" stopColor="#7c3aed" />
          </linearGradient>
        </defs>
        <rect width="64" height="64" rx="16" fill={`url(#${gradientId})`} />
        <path
          d="M20 17v18a12 12 0 0 0 24 0V17"
          fill="none"
          stroke="#fff"
          strokeWidth="7"
          strokeLinecap="round"
        />
      </svg>
      <span className={`text-xl font-extrabold tracking-tight ${light ? "text-white" : "text-gray-900"}`}>
        Ustoz<span className={light ? "text-indigo-300" : "text-indigo-600"}>Uz</span>
      </span>
    </Link>
  );
}
