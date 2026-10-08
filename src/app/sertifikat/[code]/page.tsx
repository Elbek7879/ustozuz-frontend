import Link from "next/link";
import { BadgeCheck, ShieldX, Award, BookOpen, CalendarDays, GraduationCap, Hash, Download, FileText } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ApiError, verifyCertificate, type ApiPublicCertificate } from "@/lib/api";
import { formatDate } from "@/lib/format";

async function load(code: string): Promise<ApiPublicCertificate | null> {
  try {
    return await verifyCertificate(code);
  } catch (err) {
    if (err instanceof ApiError && err.status === 404) return null;
    throw err;
  }
}

export async function generateMetadata({ params }: { params: Promise<{ code: string }> }) {
  const { code } = await params;
  const cert = await load(code).catch(() => null);
  return cert
    ? {
        title: `Sertifikat — ${cert.studentName}`,
        description: `${cert.studentName} "${cert.courseTitle}" kursini UstozUz platformasida muvaffaqiyatli tugatgan.`,
        robots: { index: false },
      }
    : { title: "Sertifikat topilmadi", robots: { index: false } };
}

// QR kod yoki havola orqali ochiladigan ochiq tekshiruv sahifasi
export default async function VerifyCertificatePage({ params }: { params: Promise<{ code: string }> }) {
  const { code } = await params;
  const cert = await load(code);

  return (
    <main>
      <Header />

      <section className="relative overflow-hidden bg-gradient-to-b from-indigo-50 via-white to-white">
        <div className="pointer-events-none absolute -top-24 right-0 w-96 h-96 rounded-full bg-purple-200/40 blur-3xl" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 py-12 md:py-16">
          {cert ? (
            <>
              <div className="text-center">
                <span className="inline-flex w-16 h-16 rounded-2xl bg-emerald-500 text-white items-center justify-center shadow-lg shadow-emerald-500/30">
                  <BadgeCheck className="w-9 h-9" />
                </span>
                <h1 className="mt-5 text-2xl md:text-4xl font-extrabold tracking-tight text-gray-900">
                  Sertifikat haqiqiy
                </h1>
                <p className="mt-2 text-gray-600">
                  Bu sertifikat UstozUz platformasi tomonidan berilgan va tasdiqlangan.
                </p>
              </div>

              {/* Sertifikatning o'zi (serverda chizilgan rasm) */}
              <div className="mt-8 rounded-2xl overflow-hidden bg-white shadow-2xl shadow-indigo-200/60 ring-1 ring-gray-200 aspect-[2000/1414]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`/sertifikat/${code}/rasm`}
                  alt={`${cert.studentName} — sertifikat`}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="mt-4 flex flex-col sm:flex-row justify-center gap-3">
                <a
                  href={`/sertifikat/${code}/rasm?yuklab=1`}
                  download
                  className="flex items-center justify-center gap-2 bg-indigo-600 text-white font-semibold px-6 py-3 rounded-xl hover:bg-indigo-700 transition"
                >
                  <Download className="w-4 h-4" />
                  Yuklab olish (PNG)
                </a>
                <a
                  href={`/sertifikat/${code}/pdf`}
                  download
                  className="flex items-center justify-center gap-2 ring-1 ring-gray-200 bg-white text-gray-800 font-semibold px-6 py-3 rounded-xl hover:bg-gray-50 transition"
                >
                  <FileText className="w-4 h-4" />
                  PDF yuklab olish
                </a>
              </div>

              <div className="mt-8 max-w-2xl mx-auto w-full rounded-3xl bg-white ring-1 ring-gray-200 shadow-xl shadow-indigo-100/50 overflow-hidden">
                <div className="h-1.5 bg-gradient-to-r from-indigo-600 via-purple-600 to-fuchsia-500" />
                <div className="p-6 md:p-8">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-600">Sertifikat egasi</p>
                  <p className="mt-1 text-2xl md:text-3xl font-extrabold text-gray-900">{cert.studentName}</p>

                  <dl className="mt-6 grid sm:grid-cols-2 gap-4">
                    {[
                      { icon: BookOpen, label: "Kurs", value: cert.courseTitle },
                      { icon: GraduationCap, label: "Ustoz", value: cert.instructorName },
                      { icon: CalendarDays, label: "Berilgan sana", value: formatDate(cert.issuedAt) },
                      { icon: Hash, label: "Sertifikat raqami", value: cert.number },
                    ].map(({ icon: Icon, label, value }) => (
                      <div key={label} className="flex items-start gap-3 rounded-2xl bg-gray-50 p-4">
                        <span className="w-9 h-9 rounded-xl bg-white ring-1 ring-gray-200 flex items-center justify-center shrink-0">
                          <Icon className="w-4 h-4 text-indigo-600" />
                        </span>
                        <div className="min-w-0">
                          <dt className="text-xs text-gray-500">{label}</dt>
                          <dd className="text-sm font-semibold text-gray-900 break-words">{value}</dd>
                        </div>
                      </div>
                    ))}
                  </dl>

                  <div className="mt-6 flex flex-col sm:flex-row gap-3">
                    <Link
                      href={`/kurslar/${cert.courseSlug}`}
                      className="flex-1 flex items-center justify-center gap-2 bg-indigo-600 text-white font-semibold py-3 rounded-xl hover:bg-indigo-700 transition"
                    >
                      <Award className="w-4 h-4" />
                      Kurs bilan tanishish
                    </Link>
                    <Link
                      href="/kurslar"
                      className="flex-1 flex items-center justify-center gap-2 ring-1 ring-gray-200 text-gray-700 font-semibold py-3 rounded-xl hover:bg-gray-50 transition"
                    >
                      Barcha kurslar
                    </Link>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="text-center">
              <span className="inline-flex w-16 h-16 rounded-2xl bg-red-50 text-red-600 items-center justify-center ring-1 ring-red-100">
                <ShieldX className="w-9 h-9" />
              </span>
              <h1 className="mt-5 text-2xl md:text-3xl font-extrabold tracking-tight text-gray-900">Sertifikat topilmadi</h1>
              <p className="mt-2 text-gray-600 max-w-md mx-auto">
                Havola noto&apos;g&apos;ri yoki sertifikat mavjud emas. Iltimos, QR kodni qayta skanerlang yoki havolani
                to&apos;liq nusxa oling.
              </p>
              <Link
                href="/"
                className="mt-6 inline-flex items-center gap-2 bg-indigo-600 text-white font-semibold px-6 py-3 rounded-xl hover:bg-indigo-700 transition"
              >
                Bosh sahifaga
              </Link>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
