import Link from "next/link";
import Image from "next/image";
import { Sparkles, Award, Smartphone, MessageCircle } from "lucide-react";

const features = [
  {
    icon: Sparkles,
    title: "Amaliy loyihalar bilan o'rganing",
    iconBg: "bg-indigo-500/20",
    iconColor: "text-indigo-400",
  },
  {
    icon: Award,
    title: "Har bir kursda sertifikat",
    iconBg: "bg-emerald-500/20",
    iconColor: "text-emerald-400",
  },
  {
    icon: Smartphone,
    title: "Istalgan qurilmadan kirish imkoni",
    iconBg: "bg-amber-500/20",
    iconColor: "text-amber-400",
  },
  {
    icon: MessageCircle,
    title: "Ustoz bilan bevosita aloqa",
    iconBg: "bg-pink-500/20",
    iconColor: "text-pink-400",
  },
];

export default function FeatureBanner() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-16 md:py-24">
      <div className="relative bg-gradient-to-br from-gray-900 via-gray-900 to-indigo-950 rounded-[2rem] overflow-hidden grid md:grid-cols-2 items-center shadow-xl">
        <div className="p-8 md:p-12">
          <p className="text-xs font-bold uppercase tracking-[0.15em] text-indigo-300">Nega UstozUz</p>
          <h2 className="mt-2 text-3xl md:text-4xl font-bold tracking-tight text-white leading-tight">
            Karyerangizni bugundan boshlab qayta quring
          </h2>
          <p className="mt-4 text-gray-400 text-sm md:text-base">
            Shaxsiy rejangiz bilan kelajakdagi ko&apos;nikmalaringizni
            mustahkamlang. O&apos;zbekistondagi minglab mutaxassislar
            UstozUz orqali yangi kasb egallamoqda.
          </p>

          <div className="grid sm:grid-cols-2 gap-4 mt-8">
            {features.map((f) => {
              const Icon = f.icon;
              return (
                <div key={f.title} className="flex items-start gap-3">
                  <div
                    className={`w-9 h-9 rounded-lg ${f.iconBg} flex items-center justify-center shrink-0`}
                  >
                    <Icon className={`w-4 h-4 ${f.iconColor}`} />
                  </div>
                  <p className="text-sm text-gray-200 leading-snug">
                    {f.title}
                  </p>
                </div>
              );
            })}
          </div>

          <Link
            href="/kurslar"
            className="inline-flex items-center gap-2 mt-8 bg-white text-gray-900 font-semibold px-6 py-3.5 rounded-xl hover:bg-indigo-50 text-sm transition"
          >
            Kurslarni ko&apos;rish
          </Link>
        </div>

        <div className="relative h-64 md:h-full min-h-[280px]">
          <Image
            src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80"
            alt="UstozUz orqali o'rganish"
            fill
            sizes="600px"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-transparent to-gray-900/60 md:bg-gradient-to-r md:from-transparent md:to-gray-900" />
        </div>
      </div>
    </section>
  );
}