import { getPublicStats } from "@/lib/api";

export default async function Stats() {
  const stats = await getPublicStats();

  const items = [
    { value: `${stats.totalCourses}+`, label: "Kurslar" },
    { value: `${stats.totalStudents}+`, label: "Talabalar" },
    { value: `${stats.totalInstructors}+`, label: "Ustozlar" },
    { value: stats.avgRating.toFixed(1), label: "O'rtacha reyting" },
  ];

  return (
    <section className="bg-indigo-700">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
        {items.map((stat) => (
          <div key={stat.label} className="text-center">
            <p className="text-3xl font-bold text-white">{stat.value}</p>
            <p className="text-sm text-indigo-200 mt-1">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}