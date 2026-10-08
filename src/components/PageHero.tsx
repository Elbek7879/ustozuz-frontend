// Ichki sahifalarning yuqori qismi: yumshoq gradient fon, sarlavha va ixtiyoriy qo'shimcha (qidiruv va h.k.)
export default function PageHero({
  eyebrow,
  title,
  subtitle,
  children,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-indigo-50 via-indigo-50/40 to-white">
      <div className="pointer-events-none absolute -top-24 right-0 w-96 h-96 rounded-full bg-purple-200/40 blur-3xl" />
      <div className="relative max-w-7xl mx-auto px-6 pt-12 pb-10 md:pt-16 md:pb-12">
        {eyebrow && (
          <p className="text-xs font-bold uppercase tracking-[0.15em] text-indigo-600">{eyebrow}</p>
        )}
        <h1 className="mt-2 text-3xl md:text-5xl font-extrabold tracking-tight text-gray-900">{title}</h1>
        {subtitle && <p className="mt-3 text-gray-600 text-base md:text-lg max-w-2xl">{subtitle}</p>}
        {children}
      </div>
    </section>
  );
}
