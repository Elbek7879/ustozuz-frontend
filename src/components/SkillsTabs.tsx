"use client";

import { useState } from "react";
import Link from "next/link";
import { TrendingUp } from "lucide-react";
import { skills, formatNumber } from "@/lib/skills";

const tabs = [
  "Eng ko'p o'rganilgan",
  "Dasturlash",
  "Dizayn",
  "Biznes",
  "Shaxsiy o'sish",
] as const;

export default function SkillsTabs() {
  const [active, setActive] = useState<(typeof tabs)[number]>(tabs[0]);

  const list = (
    active === tabs[0] ? skills : skills.filter((s) => s.group === active)
  )
    .slice()
    .sort((a, b) => b.students - a.students);

  return (
    <div>
      <div className="flex gap-6 overflow-x-auto border-b border-gray-200">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActive(tab)}
            className={`whitespace-nowrap pb-3 text-sm font-medium border-b-2 -mb-px transition ${
              active === tab
                ? "border-indigo-700 text-gray-900"
                : "border-transparent text-gray-500 hover:text-gray-800"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div>
        {list.map((s, i) => (
          <div
            key={s.name}
            className="grid grid-cols-[40px_1fr] md:grid-cols-[48px_1fr_1fr] items-center gap-x-3 gap-y-1 py-5 border-b border-gray-100"
          >
            <span className="text-gray-500 text-sm text-center">{i + 1}</span>

            <div>
              <Link
                href={`/kurslar?qidiruv=${encodeURIComponent(s.name)}`}
                className="text-indigo-700 hover:text-indigo-900 font-medium"
              >
                {s.name}
              </Link>
              <p className="text-xs text-gray-400 mt-0.5">
                {formatNumber(s.students)} ta talaba
              </p>
            </div>

            <p className="col-start-2 md:col-start-auto flex items-center gap-2 text-sm text-gray-600">
              <TrendingUp className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>
                <span className="text-indigo-700">{s.topic}</span> toifasida
                mashhur
              </span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}