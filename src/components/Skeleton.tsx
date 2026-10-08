// Ma'lumot yuklanayotganda "Yuklanmoqda..." o'rniga sahifa shaklini ko'rsatadi
export default function Skeleton({ className = "" }: { className?: string }) {
  return <div aria-hidden className={`animate-pulse rounded-xl bg-gray-200/70 ${className}`} />;
}
