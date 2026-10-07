export function formatPrice(amount: number) {
  const withSpaces = Math.round(amount)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  return `${withSpaces} so'm`;
}
export function formatDate(iso: string | null | undefined) {
  if (!iso) return "—";
  const d = new Date(iso);
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  return `${dd}.${mm}.${d.getFullYear()}`;
}

export function timeAgo(iso: string) {
  const minutes = Math.floor((Date.now() - new Date(iso).getTime()) / 60000);
  if (minutes < 1) return "hozirgina";
  if (minutes < 60) return `${minutes} daqiqa oldin`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} soat oldin`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days} kun oldin`;
  return formatDate(iso);
}

// 12950 -> "12 950"
export function formatNumber(n: number) {
  return Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}
