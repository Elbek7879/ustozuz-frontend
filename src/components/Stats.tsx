import { BookOpen, GraduationCap, Star, Users } from "lucide-react";
import { getPublicStats } from "@/lib/api";
import CountUp from "@/components/CountUp";

export default async function Stats() {
  const stats = await getPublicStats();

  const items = [
    { value: <CountUp value={stats.totalStudents} suffix="+" />, label: "Talabalar", icon: Users },
    { value: <CountUp value={stats.totalCourses} suffix="+" />, label: "Amaliy kurslar", icon: BookOpen },
    { value: <CountUp value={stats.totalInstructors} suffix="+" />, label: "Tajribali ustozlar", icon: GraduationCap },
    { value: <CountUp value={stats.avgRating} decimals={1} />, label: "O'rtacha reyting", icon: Star },
  ];

  return (
    <section className="max-w-7xl mx-auto px-6 py-8">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-700 via-indigo-600 to-purple-700 px-6 py-10 md:px-12 md:py-14">
        <div className="pointer-events-none absolute -top-20 -right-20 w-72 h-72 rounded-full bg-white/10 blur-2xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-10 w-80 h-80 rounded-full bg-purple-400/20 blur-3xl" />

        <div className="relative grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-6">
          {items.map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.label} className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-2xl bg-white/15 ring-1 ring-white/20 backdrop-blur flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <p className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">{s.value}</p>
                <p className="text-sm text-indigo-100 mt-1">{s.label}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
