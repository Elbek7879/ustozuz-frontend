// Kirishdan keyin qaytiladigan sahifa (?next=/tolov). Faqat sayt ichidagi yo'llarga ruxsat.
export function nextPath(fallback = "/") {
  if (typeof window === "undefined") return fallback;
  const next = new URLSearchParams(window.location.search).get("next");
  return next && next.startsWith("/") && !next.startsWith("//") ? next : fallback;
}
