import { certificateImage } from "@/lib/certificate-image";
import { CERT_CACHE, loadCertificate } from "@/lib/certificate-route";

// Sertifikat rasmi (PNG). ?yuklab=1 bo'lsa fayl sifatida yuklab olinadi
export async function GET(req: Request, { params }: { params: Promise<{ code: string }> }) {
  const { code } = await params;
  const { cert, error } = await loadCertificate(code);
  if (error) return error;

  const url = new URL(req.url);
  const image = await certificateImage(cert, `${url.origin}/sertifikat/${code}`);
  const headers = new Headers({ "Content-Type": "image/png", "Cache-Control": CERT_CACHE });
  if (url.searchParams.has("yuklab")) {
    headers.set("Content-Disposition", `attachment; filename="UstozUz-sertifikat-${cert.number}.png"`);
  }
  return new Response(await image.arrayBuffer(), { headers });
}
