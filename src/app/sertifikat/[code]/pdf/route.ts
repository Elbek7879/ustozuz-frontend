import { PDFDocument } from "pdf-lib";
import { certificateImage } from "@/lib/certificate-image";
import { CERT_CACHE, loadCertificate } from "@/lib/certificate-route";

// A4 landscape o'lchami (punktlarda)
const A4_W = 841.89;
const A4_H = 595.28;

// Sertifikat PDF fayli — bosilganda darhol yuklab olinadi
export async function GET(req: Request, { params }: { params: Promise<{ code: string }> }) {
  const { code } = await params;
  const { cert, error } = await loadCertificate(code);
  if (error) return error;

  const origin = new URL(req.url).origin;
  const png = await (await certificateImage(cert, `${origin}/sertifikat/${code}`)).arrayBuffer();

  const pdf = await PDFDocument.create();
  pdf.setTitle(`UstozUz sertifikati — ${cert.studentName}`);
  pdf.setSubject(cert.courseTitle);
  pdf.setAuthor("UstozUz");
  pdf.setCreator("ustozuz.vercel.app");
  const image = await pdf.embedPng(png);
  pdf.addPage([A4_W, A4_H]).drawImage(image, { x: 0, y: 0, width: A4_W, height: A4_H });
  const bytes = await pdf.save();

  return new Response(new Blob([new Uint8Array(bytes)], { type: "application/pdf" }), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="UstozUz-sertifikat-${cert.number}.pdf"`,
      "Cache-Control": CERT_CACHE,
    },
  });
}
