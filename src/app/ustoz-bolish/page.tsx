import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  Clock,
  Wallet,
  Users,
  FileEdit,
  Video,
  Rocket,
} from "lucide-react";

const benefits = [
  {
    title: "O'z sur'atingizda o'rgating",
    desc: "Kurs materiallarini o'zingizga qulay vaqtda tayyorlang va yuklang.",
    icon: Clock,
    color: "text-indigo-600",
    image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=500&q=80",
  },
  {
    title: "Daromad oling",
    desc: "Har bir sotilgan kurs uchun ulush oling, avtomatik hisob-kitob bilan.",
    icon: Wallet,
    color: "text-emerald-600",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=500&q=80",
  },
  {
    title: "Minglab talabalarga yeting",
    desc: "UstozUz orqali butun O'zbekiston bo'ylab talabalarga bilim bering.",
    icon: Users,
    color: "text-amber-600",
    image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=500&q=80",
  },
];

const steps = [
  {
    step: "1",
    title: "Kursingizni rejalashtiring",
    desc: "Mavzuni tanlang va dastur tuzing.",
    icon: FileEdit,
    image: "https://images.unsplash.com/photo-1517842645767-c639042777db?w=500&q=80",
  },
  {
    step: "2",
    title: "Darslarni yozib oling",
    desc: "Video yoki matn ko'rinishida materiallar tayyorlang.",
    icon: Video,
    image: "https://images.unsplash.com/photo-1598550476439-6847785fcea6?w=500&q=80",
  },
  {
    step: "3",
    title: "E'lon qiling",
    desc: "Kursingiz talabalarga taqdim etiladi.",
    icon: Rocket,
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=500&q=80",
  },
];

export default function BecomeInstructorPage() {
  return (
    <main>
      <Header />

      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-900 via-indigo-700 to-purple-700">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-white/10 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight">
              Bilimingizni ulashing, daromad qiling
            </h1>
            <p className="mt-4 text-indigo-100 max-w-md">
              UstozUz&apos;da o&apos;z kursingizni yarating va minglab
              talabalarga o&apos;z tajribangizni o&apos;rgating.
            </p>
            <Link
              href="/royxatdan-otish"
              className="inline-block mt-8 bg-white text-indigo-700 font-semibold px-6 py-3 rounded-md hover:bg-indigo-50"
            >
              Ustoz sifatida boshlash
            </Link>
          </div>

          <div className="relative h-72 rounded-2xl overflow-hidden hidden md:block">
            <Image
              src="https://images.unsplash.com/photo-1509062522246-3755977927d7?w=700&q=80"
              alt="Ustoz dars bermoqda"
              fill
              sizes="500px"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-indigo-900/20" />
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-10 text-center">
          Nega UstozUz&apos;da o&apos;qitish kerak?
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {benefits.map((b) => {
            const Icon = b.icon;
            return (
              <div
                key={b.title}
                className="group border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                <div className="relative h-36 overflow-hidden">
                  <Image
                    src={b.image}
                    alt={b.title}
                    fill
                    sizes="360px"
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-3 left-3 w-11 h-11 rounded-lg bg-white flex items-center justify-center shadow-md">
                    <Icon className={`w-5 h-5 ${b.color}`} />
                  </div>
                </div>

                <div className="p-5 text-center">
                  <h3 className="font-semibold text-gray-900">{b.title}</h3>
                  <p className="text-sm text-gray-500 mt-2">{b.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-10 text-center">
            Qanday ishlaydi
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((s) => {
              const Icon = s.icon;
              return (
                <div
                  key={s.step}
                  className="group bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="relative h-32 overflow-hidden">
                    <Image
                      src={s.image}
                      alt={s.title}
                      fill
                      sizes="360px"
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute top-3 left-3 w-8 h-8 rounded-full bg-indigo-700 text-white font-bold flex items-center justify-center text-sm">
                      {s.step}
                    </div>
                    <div className="absolute bottom-3 right-3 w-9 h-9 rounded-lg bg-white flex items-center justify-center shadow-md">
                      <Icon className="w-4 h-4 text-indigo-700" />
                    </div>
                  </div>

                  <div className="p-5">
                    <h3 className="font-semibold text-gray-900">{s.title}</h3>
                    <p className="text-sm text-gray-500 mt-2">{s.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-6 py-16 text-center">
        <h2 className="text-2xl font-bold text-gray-900">
          Bugun ustoz bo&apos;lishni boshlang
        </h2>
        <p className="text-gray-500 mt-3">
          Ro&apos;yxatdan o&apos;tish bir necha daqiqa vaqt oladi.
        </p>
        <Link
          href="/royxatdan-otish"
          className="inline-block mt-6 bg-indigo-700 text-white font-semibold px-6 py-3 rounded-md hover:bg-indigo-800"
        >
          Ro&apos;yxatdan o&apos;tish
        </Link>
      </section>

      <Footer />
    </main>
  );
}