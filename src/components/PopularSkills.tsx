import Link from "next/link";
import { ChevronRight, TrendingUp } from "lucide-react";
import { skills, type SkillGroup } from "@/lib/skills";

const featured = skills.find((s) => s.name === "Sun'iy intellekt")!;
const columns: SkillGroup[] = ["Dasturlash", "Dizayn", "Biznes"];

function topSkills(group: SkillGroup) {
  return skills
    .filter((s) => s.group === group)
    .sort((a, b) => b.students - a.students)
    .slice(0, 3);
}

export default function PopularSkills() {
  return (
    <section className="bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-14">
        <h2 className="text-2xl font-bold text-gray-900 pb-4 border-b border-gray-200 mb-8">
          Ommabop ko&apos;nikmalar
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-bold text-gray-900 leading-snug">
              Sun&apos;iy intellekt — bugungi eng talabgir ko&apos;nikma
            </h3>
            <Link
              href={`/kurslar?qidiruv=${encodeURIComponent("intellekt")}`}
              className="group flex items-center justify-between gap-2 mt-4 font-semibold text-indigo-700 hover:text-indigo-900"
            >
              AI kurslarini ko&apos;ring
              <ChevronRight className="w-4 h-4 shrink-0 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href="/ommabop-mavzular"
              className="inline-flex items-center gap-2 mt-6 border border-indigo-700 text-indigo-700 font-medium text-sm px-4 py-2.5 rounded-md hover:bg-indigo-50"
            >
              Barcha ko&apos;nikmalar trendda
              <TrendingUp className="w-4 h-4" />
            </Link>
          </div>

          {columns.map((group) => (
            <div key={group}>
              <h3 className="text-xl font-bold text-gray-900 mb-4">{group}</h3>
              <div className="space-y-4">
                {topSkills(group).map((s) => (
                  <div key={s.name}>
                    <Link
                      href={`/kurslar?qidiruv=${encodeURIComponent(s.name)}`}
                      className="group flex items-center justify-between gap-2 font-semibold text-indigo-700 hover:text-indigo-900"
                    >
                      {s.name}
                      <ChevronRight className="w-4 h-4 shrink-0 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}