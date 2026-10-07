import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { courses } from "@/lib/courses";
import { Users, BookOpen, Wallet, Star, ArrowRight, UserPlus, BookPlus } from "lucide-react";

const stats = [
  { label: "Jami foydalanuvchilar", value: "12,480", icon: Users, color: "text-indigo-600", bg: "bg-indigo-50" },
  { label: "Jami kurslar", value: courses.length, icon: BookOpen, color: "text-emerald-600", bg: "bg-emerald-50" },
  { label: "Umumiy daromad", value: "48,200,000 so'm", icon: Wallet, color: "text-amber-600", bg: "bg-amber-50" },
  { label: "O'rtacha reyting", value: "4.8", icon: Star, color: "text-pink-600", bg: "bg-pink-50" },
];

const quickLinks = [
  { title: "Foydalanuvchilar", desc: "Talaba va ustozlarni boshqarish", href: "/admin/foydalanuvchilar" },
  { title: "Kurslar", desc: "Barcha kurslarni ko'rish va boshqarish", href: "/admin/kurslar" },
];

const recentActivity = [
  { icon: UserPlus, text: "Malika Nazarova ro'yxatdan o'tdi", time: "5 daqiqa oldin", color: "text-indigo-600", bg: "bg-indigo-50" },
  { icon: BookPlus, text: "Sardor Tojiyev yangi kurs yaratdi", time: "1 soat oldin", color: "text-emerald-600", bg: "bg-emerald-50" },
  { icon: Wallet, text: "Yangi xarid: 249,000 so'm", time: "2 soat oldin", color: "text-amber-600", bg: "bg-amber-50" },
  { icon: UserPlus, text: "Jasur Rahimov ro'yxatdan o'tdi", time: "4 soat oldin", color: "text-indigo-600", bg: "bg-indigo-50" },
];

export default function AdminPage() {
  return (
    <main>
      <Header />

      <section className="max-w-7xl mx-auto px-6 py-10">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Admin panel</h1>
        <p className="text-gray-500 text-sm mb-8">
          UstozUz platformasining umumiy ko&apos;rinishi
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-10">
          {stats.map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.label} className="border border-gray-200 rounded-xl p-5">
                <div className={`w-10 h-10 rounded-lg ${s.bg} flex items-center justify-center mb-3`}>
                  <Icon className={`w-5 h-5 ${s.color}`} />
                </div>
                <p className="text-xl font-bold text-gray-900">{s.value}</p>
                <p className="text-xs text-gray-500 mt-1">{s.label}</p>
              </div>
            );
          })}
        </div>

        <div className="grid md:grid-cols-[2fr_1fr] gap-8">
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Boshqaruv
            </h2>
            <div className="grid sm:grid-cols-2 gap-5">
              {quickLinks.map((link) => (
                <Link
                  key={link.title}
                  href={link.href}
                  className="group flex items-center justify-between border border-gray-200 rounded-xl p-5 hover:border-indigo-300 hover:shadow-md transition-all"
                >
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {link.title}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">{link.desc}</p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-indigo-700 group-hover:translate-x-1 transition-all shrink-0 ml-3" />
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              So&apos;nggi harakatlar
            </h2>
            <div className="border border-gray-200 rounded-xl divide-y divide-gray-100">
              {recentActivity.map((a, i) => {
                const Icon = a.icon;
                return (
                  <div key={i} className="flex items-start gap-3 p-4">
                    <div className={`w-8 h-8 rounded-lg ${a.bg} flex items-center justify-center shrink-0`}>
                      <Icon className={`w-4 h-4 ${a.color}`} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-800">{a.text}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{a.time}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}