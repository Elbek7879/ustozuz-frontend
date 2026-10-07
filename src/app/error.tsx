"use client";

import { useEffect } from "react";
import Link from "next/link";
import { RefreshCw } from "lucide-react";

// Sahifa yuklanishida kutilmagan xato bo'lsa (masalan, server vaqtincha javob bermasa)
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="min-h-[70vh] flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <Link href="/" className="text-2xl font-bold text-indigo-700">
          Ustoz<span className="text-gray-900">Uz</span>
        </Link>
        <h1 className="text-xl font-bold text-gray-900 mt-8">
          Sahifani yuklab bo&apos;lmadi
        </h1>
        <p className="text-gray-500 text-sm mt-2">
          Server vaqtincha javob bermayapti. Bir necha soniyadan keyin qayta urinib ko&apos;ring.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
          <button
            onClick={reset}
            className="flex items-center justify-center gap-2 bg-indigo-700 text-white font-medium px-6 py-2.5 rounded-md hover:bg-indigo-800"
          >
            <RefreshCw className="w-4 h-4" />
            Qayta urinish
          </button>
          <Link
            href="/"
            className="border border-gray-300 text-gray-700 font-medium px-6 py-2.5 rounded-md hover:bg-gray-50"
          >
            Bosh sahifa
          </Link>
        </div>
      </div>
    </main>
  );
}
