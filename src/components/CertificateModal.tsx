"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { X, Download, FileText, Link2, ExternalLink, ImageOff } from "lucide-react";

type Props = {
  onClose: () => void;
  studentName: string;
  courseTitle: string;
  number: string;
  // UZ-000001-<imzo>: rasm, PDF va ochiq tekshiruv sahifasi shu kod orqali ochiladi
  verifyCode: string;
};

// Sertifikat oynasi: serverda chizilgan rasm + PNG/PDF yuklab olish
export default function CertificateModal({ onClose, studentName, courseTitle, number, verifyCode }: Props) {
  const [state, setState] = useState<"loading" | "ready" | "error">("loading");
  const [retry, setRetry] = useState(0);
  const base = `/sertifikat/${verifyCode}`;

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

  async function copyLink() {
    const url = `${window.location.origin}${base}`;
    try {
      await navigator.clipboard.writeText(url);
      toast.success("Tekshirish havolasi nusxalandi");
    } catch {
      toast.error("Nusxalab bo'lmadi: " + url);
    }
  }

  const btn =
    "flex items-center justify-center gap-2 text-sm font-semibold py-3 px-4 rounded-xl transition whitespace-nowrap";

  return (
    <div
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Sertifikat"
      className="fixed inset-0 z-[100] bg-gray-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
    >
      <div onClick={(e) => e.stopPropagation()} className="w-full max-w-5xl my-auto">
        <div className="flex items-center justify-between gap-4 mb-3">
          <div className="min-w-0">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-300">Sertifikat · № {number}</p>
            <p className="text-white font-semibold truncate">{courseTitle}</p>
          </div>
          <button
            onClick={onClose}
            aria-label="Yopish"
            className="shrink-0 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="relative w-full aspect-[2000/1414] rounded-2xl overflow-hidden bg-white shadow-2xl ring-1 ring-white/10">
          {state === "loading" && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-indigo-50 to-purple-50">
              <span className="w-10 h-10 rounded-full border-4 border-indigo-100 border-t-indigo-600 animate-spin" />
              <p className="text-sm text-gray-500">Sertifikat tayyorlanmoqda…</p>
            </div>
          )}
          {state === "error" ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-gray-50 text-center px-6">
              <ImageOff className="w-9 h-9 text-gray-300" />
              <p className="text-sm font-medium text-gray-700">Sertifikat rasmini yuklab bo&apos;lmadi</p>
              <button
                onClick={() => {
                  setRetry((r) => r + 1);
                  setState("loading");
                }}
                className="text-sm font-semibold text-indigo-700 hover:underline">
                Qayta urinish
              </button>
            </div>
          ) : (
            // Rasm serverda chiziladi (PNG); next/image optimizatsiyasi shart emas
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={`${base}/rasm${retry ? `?r=${retry}` : ""}`}
              alt={`${studentName} — "${courseTitle}" kursi sertifikati`}
              onLoad={() => setState("ready")}
              onError={() => setState("error")}
              className={`w-full h-full object-contain transition-opacity duration-500 ${state === "ready" ? "opacity-100" : "opacity-0"}`}
            />
          )}
        </div>

        <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
          <a
            href={`${base}/rasm?yuklab=1`}
            download={`UstozUz-sertifikat-${number}.png`}
            className={`${btn} col-span-2 sm:col-span-1 bg-indigo-600 text-white hover:bg-indigo-500 shadow-lg shadow-indigo-900/30`}
          >
            <Download className="w-4 h-4" />
            Yuklab olish (PNG)
          </a>
          <a
            href={`${base}/pdf`}
            download={`UstozUz-sertifikat-${number}.pdf`}
            className={`${btn} bg-white text-gray-900 hover:bg-gray-100`}
          >
            <FileText className="w-4 h-4" />
            PDF
          </a>
          <button onClick={copyLink} className={`${btn} bg-white/10 text-white ring-1 ring-white/20 hover:bg-white/20`}>
            <Link2 className="w-4 h-4" />
            Havola
          </button>
          <a
            href={base}
            target="_blank"
            rel="noopener noreferrer"
            className={`${btn} col-span-2 sm:col-span-1 bg-white/10 text-white ring-1 ring-white/20 hover:bg-white/20`}
          >
            <ExternalLink className="w-4 h-4" />
            Tekshirish sahifasi
          </a>
        </div>
      </div>
    </div>
  );
}
