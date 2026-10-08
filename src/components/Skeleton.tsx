// Kichik aylanuvchi yuklanish belgisi
export function Spinner({ className = "" }: { className?: string }) {
  return (
    <div role="status" aria-label="Yuklanmoqda" className={`flex justify-center py-24 ${className}`}>
      <span className="w-9 h-9 rounded-full border-4 border-indigo-100 border-t-indigo-600 animate-spin" />
    </div>
  );
}

// Ma'lumot yuklanayotganda "Yuklanmoqda..." o'rniga sahifa shaklini ko'rsatadi
export default function Skeleton({ className = "" }: { className?: string }) {
  return <div aria-hidden className={`animate-pulse rounded-xl bg-gray-200/70 ${className}`} />;
}
