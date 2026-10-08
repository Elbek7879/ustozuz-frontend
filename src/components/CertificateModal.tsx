"use client";

import { useEffect } from "react";
import { X, Award, Download } from "lucide-react";

type Props = {
  onClose: () => void;
  studentName: string;
  courseTitle: string;
  date: string;
  number?: string;
  instructorName?: string;
  sample?: boolean;
};

export default function CertificateModal({
  onClose,
  studentName,
  courseTitle,
  date,
  number,
  instructorName,
  sample = false,
}: Props) {
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Sertifikat"
      className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
    >
      <div onClick={(e) => e.stopPropagation()} className="relative w-full max-w-2xl my-auto">
        <button
          onClick={onClose}
          aria-label="Yopish"
          className="print:hidden absolute -top-12 right-0 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Sertifikatning o'zi (chop etilganda faqat shu qism chiqadi) */}
        <div className="print-area rounded-2xl bg-white p-2 shadow-2xl">
          <div className="relative overflow-hidden rounded-xl border-2 border-indigo-100 px-5 pt-8 pb-12 sm:px-12 sm:py-10 text-center bg-gradient-to-b from-indigo-50/60 via-white to-white">
            {/* Bezak: yuqori/pastki gradient chiziq va burchak ramkalari */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-indigo-600 via-purple-600 to-fuchsia-500" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1.5 bg-gradient-to-r from-fuchsia-500 via-purple-600 to-indigo-600" />
            <div className="pointer-events-none absolute top-4 left-4 w-7 h-7 border-t-2 border-l-2 border-indigo-300 rounded-tl-lg" />
            <div className="pointer-events-none absolute top-4 right-4 w-7 h-7 border-t-2 border-r-2 border-indigo-300 rounded-tr-lg" />
            <div className="pointer-events-none absolute bottom-4 left-4 w-7 h-7 border-b-2 border-l-2 border-indigo-300 rounded-bl-lg" />
            <div className="pointer-events-none absolute bottom-4 right-4 w-7 h-7 border-b-2 border-r-2 border-indigo-300 rounded-br-lg" />

            <div className="relative">
              <div className="flex items-center justify-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-600 to-purple-600 text-white font-extrabold flex items-center justify-center">
                  U
                </span>
                <span className="text-lg font-extrabold text-gray-900">
                  Ustoz<span className="text-indigo-600">Uz</span>
                </span>
              </div>

              <p className="mt-6 text-[11px] sm:text-xs font-bold tracking-[0.35em] uppercase text-indigo-600">Sertifikat</p>
              <h2 className="mt-1 text-xl sm:text-3xl font-extrabold tracking-tight text-gray-900">
                Kursni muvaffaqiyatli tugatgani uchun
              </h2>

              <p className="mt-6 text-sm text-gray-500">Ushbu sertifikat bilan taqdirlanadi</p>
              <p className="mt-2 text-2xl sm:text-4xl font-extrabold bg-gradient-to-r from-indigo-700 to-purple-600 bg-clip-text text-transparent">
                {studentName}
              </p>
              <div className="mx-auto mt-3 h-px w-56 max-w-full bg-gradient-to-r from-transparent via-indigo-300 to-transparent" />

              <p className="mt-4 text-sm text-gray-500">kurs nomi</p>
              <p className="mt-1 text-base sm:text-lg font-bold text-gray-900">&ldquo;{courseTitle}&rdquo;</p>

              <div className="mt-8 grid grid-cols-[1fr_auto_1fr] items-end gap-3 text-left">
                <div>
                  <p className="text-[11px] uppercase tracking-wider text-gray-400">Sana</p>
                  <p className="text-sm font-semibold text-gray-800">{date}</p>
                  {instructorName && (
                    <>
                      <p className="mt-2 text-[11px] uppercase tracking-wider text-gray-400">Ustoz</p>
                      <p className="text-sm font-semibold text-gray-800">{instructorName}</p>
                    </>
                  )}
                </div>

                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-amber-300 via-amber-400 to-amber-600 ring-4 ring-amber-100 shadow-lg flex items-center justify-center">
                  <Award className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                </div>

                <div className="text-right">
                  <p className="text-[11px] uppercase tracking-wider text-gray-400">{number ? "Raqam" : "Holat"}</p>
                  <p className="text-sm font-semibold text-gray-800">{number ? `№ ${number}` : "Tasdiqlandi"}</p>
                  <p className="mt-2 text-[11px] uppercase tracking-wider text-gray-400">Platforma</p>
                  <p className="text-sm font-semibold text-gray-800">ustozuz.vercel.app</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {sample ? (
          <p className="text-center text-xs text-white/70 mt-4">
            Bu — namunaviy ko&apos;rinish. Haqiqiy sertifikat kursni tugatgandan so&apos;ng, sizning ismingiz bilan
            avtomatik yaratiladi.
          </p>
        ) : (
          <button
            onClick={() => window.print()}
            className="print:hidden mt-4 w-full flex items-center justify-center gap-2 bg-indigo-600 text-white font-semibold py-3 rounded-xl hover:bg-indigo-700 transition"
          >
            <Download className="w-4 h-4" />
            Chop etish / PDF saqlash
          </button>
        )}
      </div>
    </div>
  );
}
