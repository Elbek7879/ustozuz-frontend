import { ApiError, verifyCertificate, type ApiPublicCertificate } from "@/lib/api";

// Sertifikat rasmi/PDF yo'llari uchun umumiy: kodni tekshiradi, xato bo'lsa tayyor javob qaytaradi
export async function loadCertificate(
  code: string
): Promise<{ cert: ApiPublicCertificate; error?: undefined } | { cert?: undefined; error: Response }> {
  try {
    return { cert: await verifyCertificate(code) };
  } catch (err) {
    if (err instanceof ApiError && err.status === 404) {
      return { error: new Response("Sertifikat topilmadi", { status: 404 }) };
    }
    return { error: new Response("Sertifikatni hozir olib bo'lmadi, birozdan keyin urinib ko'ring", { status: 503 }) };
  }
}

export const CERT_CACHE = "public, max-age=600, s-maxage=3600";
