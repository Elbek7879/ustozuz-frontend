"use client";

import { useEffect } from "react";
import { X, Award, Download } from "lucide-react";

type Props = {
  onClose: () => void;
  studentName: string;
  courseTitle: string;
  date: string;
  number?: string;
  sample?: boolean;
};

export default function CertificateModal({
  onClose,
  studentName,
  courseTitle,
  date,
  number,
  sample = false,
}: Props) {
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[100] bg-black/60 flex items-center justify-center p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative bg-white rounded-2xl max-w-xl w-full p-8 shadow-2xl"
      >
        <button
          onClick={onClose}
          aria-label="Yopish"
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="print-area border-2 border-indigo-700 rounded-xl p-8 text-center bg-gradient-to-br from-indigo-50 to-white">
          <div className="w-14 h-14 rounded-full bg-indigo-700 mx-auto flex items-center justify-center mb-4">
            <Award className="w-7 h-7 text-white" />
          </div>

          <p className="text-xs tracking-widest text-indigo-700 font-semibold uppercase">
            UstozUz
          </p>
          <h2 className="text-2xl font-bold text-gray-900 mt-2">
            Tugatish sertifikati
          </h2>

          <p className="text-gray-500 text-sm mt-4">Ushbu sertifikat</p>
          <p className="text-xl font-semibold text-gray-900 mt-1">
            {studentName}
          </p>
          <p className="text-gray-500 text-sm mt-3">tomonidan</p>
          <p className="text-lg font-medium text-indigo-700 mt-1">
            &ldquo;{courseTitle}&rdquo;
          </p>
          <p className="text-gray-500 text-sm mt-1">
            kursi muvaffaqiyatli tugatilganini tasdiqlaydi.
          </p>

          <div className="flex justify-between items-end mt-8 pt-4 border-t border-gray-200 text-left">
            <div>
              <p className="text-xs text-gray-400">Sana</p>
              <p className="text-sm font-medium text-gray-700">{date}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-400">{number ? `№ ${number}` : "Tasdiqlandi"}</p>
              <p className="text-sm font-medium text-gray-700">UstozUz.uz</p>
            </div>
          </div>
        </div>

        {sample ? (
          <p className="text-center text-xs text-gray-400 mt-5">
            Bu — namunaviy ko&apos;rinish. Haqiqiy sertifikat kursni
            tugatgandan so&apos;ng, sizning ismingiz bilan avtomatik yaratiladi.
          </p>
        ) : (
          <button
            onClick={() => window.print()}
            className="print:hidden mt-5 w-full flex items-center justify-center gap-2 bg-indigo-700 text-white font-medium py-2.5 rounded-md hover:bg-indigo-800"
          >
            <Download className="w-4 h-4" />
            Chop etish / PDF saqlash
          </button>
        )}
      </div>
    </div>
  );
}