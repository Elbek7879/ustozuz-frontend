import Link from "next/link";
import { ArrowRight, Briefcase, Code2, Palette, Sparkles, TrendingUp } from "lucide-react";
import { skills, type SkillGroup } from "@/lib/skills";
import SectionHeading from "@/components/SectionHeading";

const columns: { group: SkillGroup; icon: typeof Code2; color: string }[] = [
  { group: "Dasturlash", icon: Code2, color: "bg-indigo-50 text-indigo-600" },
  { group: "Dizayn", icon: Palette, color: "bg-pink-50 text-pink-600" },
  { group: "Biznes", icon: Briefcase, color: "bg-amber-50 text-amber-600" },
];

function topSkills(group: SkillGroup) {
  return skills
    .filter((s) => s.group === group)
    .sort((a, b) => b.students - a.students)
    .slice(0, 4);
}

export default function PopularSkills() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-16 md:py-24">
      <SectionHeading
        eyebrow="Trendda"
        title="Ommabop ko'nikmalar"
        subtitle="Ish beruvchilar eng ko'p qidirayotgan bilimlar"
        action={{ label: "Barcha mavzular", href: "/ommabop-mavzular" }}
      />

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <Link
          href={`/kurslar?qidiruv=${encodeURIComponent("intellekt")}`}
          className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-gray-900 to-indigo-950 p-7 flex flex-col text-white min-h-64"
        >
          <div className="pointer-events-none absolute -bottom-16 -right-16 w-56 h-56 rounded-full bg-indigo-500/30 blur-3xl" />
          <span className="relative inline-flex w-fit items-center gap-1.5 text-xs font-semibold bg-white/10 ring-1 ring-white/20 px-2.5 py-1 rounded-full">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            Eng talabgir
          </span>
          <h3 className="relative mt-5 text-2xl font-bold leading-snug">
            Sun&apos;iy intellekt — bugungi eng muhim ko&apos;nikma
          </h3>
          <span className="relative mt-auto pt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-200 group-hover:text-white">
            AI kurslarini ko&apos;rish
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </span>
        </Link>

        {columns.map(({ group, icon: Icon, color }) => (
          <div key={group} className="rounded-3xl bg-white ring-1 ring-gray-200 p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${color}`}>
                <Icon className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">{group}</h3>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              {topSkills(group).map((s) => (
                <Link
                  key={s.name}
                  href={`/kurslar?qidiruv=${encodeURIComponent(s.name)}`}
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-700 bg-gray-50 ring-1 ring-gray-200 px-3 py-1.5 rounded-full hover:bg-indigo-50 hover:text-indigo-700 hover:ring-indigo-200 transition"
                >
                  <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
                  {s.name}
                </Link>
              ))}
            </div>

            <Link
              href={`/kurslar?kategoriya=${encodeURIComponent(group)}`}
              className="group mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-700"
            >
              {group} kurslari
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
