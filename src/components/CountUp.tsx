"use client";

import { useEffect, useRef } from "react";
import { formatNumber } from "@/lib/format";

function format(n: number, decimals: number, suffix: string) {
  return (decimals ? n.toFixed(decimals) : formatNumber(n)) + suffix;
}

// Raqam ekranga chiqqanda 0 dan haqiqiy qiymatgacha sanab boradi
export default function CountUp({
  value,
  decimals = 0,
  suffix = "",
  duration = 1600,
}: {
  value: number;
  decimals?: number;
  suffix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    el.textContent = format(0, decimals, suffix);
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const p = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          el.textContent = format(value * eased, decimals, suffix);
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.5 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      el.textContent = format(value, decimals, suffix);
    };
  }, [value, decimals, suffix, duration]);

  return <span ref={ref}>{format(value, decimals, suffix)}</span>;
}
