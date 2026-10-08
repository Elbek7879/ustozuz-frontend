import { ImageResponse } from "next/og";
import QRCode from "qrcode";
import type { ApiPublicCertificate } from "@/lib/api";

// Sertifikat rasmi (A4 landscape nisbati): serverda chiziladi, shuning uchun har qanday qurilmada bir xil chiqadi
export const CERT_WIDTH = 2000;
export const CERT_HEIGHT = 1414;

const OLD_UA = "Mozilla/5.0 (Windows NT 6.1) AppleWebKit/534.30 (KHTML, like Gecko)";

// Google Fonts'dan TTF shrift oladi; olinmasa null (standart shrift ishlatiladi)
async function googleFont(family: string, weight: number): Promise<ArrayBuffer | null> {
  try {
    const css = await (
      await fetch(`https://fonts.googleapis.com/css2?family=${family.replace(/ /g, "+")}:wght@${weight}`, {
        headers: { "User-Agent": OLD_UA },
      })
    ).text();
    const url = css.match(/src: url\((.+?)\) format\('(opentype|truetype)'\)/)?.[1];
    return url ? await (await fetch(url)).arrayBuffer() : null;
  } catch {
    return null;
  }
}

type Font = { name: string; data: ArrayBuffer; weight: 400 | 500 | 600 | 700 | 800; style: "normal" };
let fontsPromise: Promise<Font[]> | null = null;

async function font(name: string, family: string, weight: Font["weight"]): Promise<Font | null> {
  const data = await googleFont(family, weight);
  return data ? { name, data, weight, style: "normal" } : null;
}

function loadFonts(): Promise<Font[]> {
  if (!fontsPromise) {
    fontsPromise = Promise.all([
      font("Inter", "Inter", 400),
      font("Inter", "Inter", 600),
      font("Inter", "Inter", 800),
      font("Playfair", "Playfair Display", 700),
      font("Signature", "Great Vibes", 400),
    ]).then((list) => {
      const fonts = list.filter((f): f is Font => f !== null);
      if (fonts.length < list.length) fontsPromise = null; // keyingi so'rovda qayta urinib ko'ramiz
      return fonts;
    });
  }
  return fontsPromise;
}

const MONTHS = ["yanvar", "fevral", "mart", "aprel", "may", "iyun", "iyul", "avgust", "sentabr", "oktabr", "noyabr", "dekabr"];

// "8-oktabr, 2026" (Toshkent vaqti bo'yicha)
function uzDate(iso: string) {
  const [y, m, d] = new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Tashkent", year: "numeric", month: "2-digit", day: "2-digit" })
    .format(new Date(iso))
    .split("-")
    .map(Number);
  return `${d}-${MONTHS[m - 1]}, ${y}`;
}

// QR kod — har bir qora katak uchun yo'l (svg path)
function qrPath(text: string) {
  const qr = QRCode.create(text, { errorCorrectionLevel: "M" });
  const size = qr.modules.size;
  let d = "";
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      if (qr.modules.get(x, y)) d += `M${x} ${y}h1v1h-1z`;
    }
  }
  return { d, size };
}

// Rasmiy uslubdagi sertifikat: fil suyagi qog'oz, to'q ko'k ramka, oltin chiziqlar, guilloche naqsh, lentali medal
const NAVY = "#1e1b4b";
const INDIGO = "#312e81";
const GOLD = "#c9a227";
const GOLD_TEXT = "#9a7a14";
const GRAY = "#57534e";

// Medal atrofidagi "tishli" yulduz (burst) nuqtalari
function burstPoints(cx: number, cy: number, outer: number, inner: number, count: number) {
  const pts: string[] = [];
  for (let i = 0; i < count * 2; i++) {
    const r = i % 2 === 0 ? outer : inner;
    const a = (Math.PI * i) / count - Math.PI / 2;
    pts.push(`${(cx + r * Math.cos(a)).toFixed(1)},${(cy + r * Math.sin(a)).toFixed(1)}`);
  }
  return pts.join(" ");
}

export async function certificateImage(cert: ApiPublicCertificate, verifyUrl: string) {
  const fonts = await loadFonts();
  const has = (name: string) => fonts.some((f) => f.name === name);
  const qr = qrPath(verifyUrl);
  const script = has("Signature") ? "Signature" : undefined;
  const serif = has("Playfair") ? "Playfair" : undefined;
  const nameLen = cert.studentName.length;
  const nameSize = script ? (nameLen <= 20 ? 150 : nameLen <= 28 ? 124 : 100) : nameLen <= 20 ? 104 : 84;
  const courseSize = cert.courseTitle.length <= 40 ? 52 : 44;
  const corner = (pos: Record<string, number>) => (
    <div style={{ position: "absolute", width: 22, height: 22, background: GOLD, transform: "rotate(45deg)", ...pos }} />
  );

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          padding: 28,
          background: `linear-gradient(135deg, ${NAVY} 0%, #3730a3 55%, ${NAVY} 100%)`,
          fontFamily: has("Inter") ? "Inter" : "sans-serif",
        }}
      >
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            position: "relative",
            background: "radial-gradient(circle at 50% 45%, #ffffff 0%, #fffdf7 55%, #fbf6e9 100%)",
            padding: "116px 200px 92px",
          }}
        >
          {/* Guilloche naqsh (orqa fonda, juda nozik) */}
          <svg width="1040" height="1040" viewBox="0 0 1040 1040" style={{ position: "absolute", left: 452, top: 159, opacity: 0.09 }}>
            {Array.from({ length: 24 }, (_, i) => (
              <ellipse key={i} cx="520" cy="520" rx="500" ry="170" fill="none" stroke={GOLD} strokeWidth="2" transform={`rotate(${i * 7.5} 520 520)`} />
            ))}
            <circle cx="520" cy="520" r="250" fill="none" stroke={GOLD} strokeWidth="2" />
            <circle cx="520" cy="520" r="262" fill="none" stroke={GOLD} strokeWidth="1" />
          </svg>

          {/* Oltin ichki ramka va burchak bezaklari */}
          <div style={{ position: "absolute", top: 26, left: 26, right: 26, bottom: 26, border: `3px solid ${GOLD}` }} />
          <div style={{ position: "absolute", top: 40, left: 40, right: 40, bottom: 40, border: "1px solid rgba(201,162,39,0.55)" }} />
          {corner({ top: 16, left: 16 })}
          {corner({ top: 16, right: 16 })}
          {corner({ bottom: 16, left: 16 })}
          {corner({ bottom: 16, right: 16 })}

          {/* Logotip (chap yuqori) */}
          <div style={{ position: "absolute", top: 96, left: 104, display: "flex", alignItems: "center", gap: 14 }}>
            <div
              style={{
                width: 60,
                height: 60,
                borderRadius: 16,
                background: "linear-gradient(135deg, #4f46e5, #7c3aed)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#ffffff",
                fontSize: 38,
                fontWeight: 800,
              }}
            >
              U
            </div>
            <div style={{ display: "flex", fontSize: 38, fontWeight: 800, color: NAVY }}>
              <span>Ustoz</span>
              <span style={{ color: "#4f46e5" }}>Uz</span>
            </div>
          </div>

          {/* QR kod va raqam (o'ng yuqori) */}
          <div style={{ position: "absolute", top: 84, right: 100, display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div style={{ display: "flex", padding: 7, background: "#ffffff", border: "2px solid rgba(201,162,39,0.6)", borderRadius: 10 }}>
              <svg width="112" height="112" viewBox={`0 0 ${qr.size} ${qr.size}`} shapeRendering="crispEdges">
                <path d={qr.d} fill={NAVY} />
              </svg>
            </div>
            <div style={{ fontSize: 17, fontWeight: 600, letterSpacing: 2, color: GRAY, marginTop: 8 }}>{`№ ${cert.number}`}</div>
          </div>

          {/* Sarlavha */}
          <div style={{ fontFamily: serif, fontSize: 112, fontWeight: 700, letterSpacing: 22, color: NAVY, lineHeight: 1 }}>SERTIFIKAT</div>
          <div style={{ display: "flex", alignItems: "center", gap: 22, marginTop: 22 }}>
            <div style={{ width: 110, height: 2, background: `linear-gradient(90deg, rgba(201,162,39,0), ${GOLD})` }} />
            <div style={{ fontSize: 24, fontWeight: 600, letterSpacing: 8, color: GOLD_TEXT }}>KURSNI TAMOMLAGANLIK HAQIDA</div>
            <div style={{ width: 110, height: 2, background: `linear-gradient(90deg, ${GOLD}, rgba(201,162,39,0))` }} />
          </div>

          {/* Egasi va kurs: sarlavha bilan pastki qator orasining o'rtasida */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          <div style={{ fontSize: 28, color: GRAY }}>Ushbu sertifikat bilan taqdirlanadi</div>
          <div style={{ fontFamily: script, fontSize: nameSize, color: NAVY, lineHeight: 1.2, marginTop: script ? 4 : 16, maxWidth: 1500, textAlign: "center" }}>
            {cert.studentName}
          </div>
          <div
            style={{
              width: 680,
              height: 2,
              marginTop: script ? -4 : 14,
              background: `linear-gradient(90deg, rgba(201,162,39,0) 0%, ${GOLD} 25%, ${GOLD} 75%, rgba(201,162,39,0) 100%)`,
            }}
          />

          {/* Kurs */}
          <div style={{ fontSize: 27, color: GRAY, marginTop: 38 }}>UstozUz onlayn ta&apos;lim platformasida</div>
          <div
            style={{
              fontFamily: serif,
              fontSize: courseSize,
              fontWeight: 700,
              color: INDIGO,
              marginTop: 12,
              maxWidth: 1400,
              textAlign: "center",
              lineHeight: 1.25,
            }}
          >
            {`«${cert.courseTitle}»`}
          </div>
          <div style={{ fontSize: 27, color: GRAY, marginTop: 12 }}>kursini muvaffaqiyatli tamomlagani uchun berildi.</div>
          </div>

          {/* Sana — medal — imzo */}
          <div style={{ display: "flex", width: "100%", alignItems: "flex-end", justifyContent: "space-between" }}>
            <div style={{ width: 430, display: "flex", flexDirection: "column", alignItems: "center", paddingBottom: 18 }}>
              <div style={{ fontSize: 38, fontWeight: 800, color: NAVY }}>{uzDate(cert.issuedAt)}</div>
              <div style={{ width: 340, height: 2, background: GOLD, marginTop: 14 }} />
              <div style={{ fontSize: 18, fontWeight: 600, letterSpacing: 5, color: GRAY, marginTop: 14 }}>BERILGAN SANA</div>
            </div>

            <div style={{ position: "relative", width: 300, height: 330, display: "flex" }}>
              <svg width="300" height="330" viewBox="0 0 300 330" style={{ position: "absolute", left: 0, top: 0 }}>
                <defs>
                  <linearGradient id="gold" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0" stopColor="#fde68a" />
                    <stop offset="0.5" stopColor="#e3b23c" />
                    <stop offset="1" stopColor="#a8761a" />
                  </linearGradient>
                  <linearGradient id="goldDark" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0" stopColor="#f6c453" />
                    <stop offset="1" stopColor="#9a6b12" />
                  </linearGradient>
                  <linearGradient id="ribbon" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="#4338ca" />
                    <stop offset="1" stopColor={NAVY} />
                  </linearGradient>
                </defs>
                <polygon points="112,180 74,318 100,300 122,324 152,200" fill="url(#ribbon)" />
                <polygon points="188,180 226,318 200,300 178,324 148,200" fill="url(#ribbon)" />
                <polygon points={burstPoints(150, 140, 124, 110, 36)} fill="url(#gold)" />
                <circle cx="150" cy="140" r="96" fill="url(#goldDark)" />
                <circle cx="150" cy="140" r="84" fill="none" stroke="#fff7d6" strokeWidth="2.5" strokeOpacity="0.75" />
                <circle cx="150" cy="140" r="78" fill="none" stroke="#fff7d6" strokeWidth="1" strokeOpacity="0.5" />
              </svg>
              <div
                style={{
                  position: "absolute",
                  left: 70,
                  top: 60,
                  width: 160,
                  height: 160,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#ffffff",
                }}
              >
                <svg width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526" />
                  <circle cx="12" cy="8" r="6" />
                </svg>
                <div style={{ fontSize: 20, fontWeight: 800, letterSpacing: 3, marginTop: 4 }}>USTOZUZ</div>
                <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: 1.5, marginTop: 2 }}>TASDIQLANGAN</div>
              </div>
            </div>

            <div style={{ width: 430, display: "flex", flexDirection: "column", alignItems: "center", paddingBottom: 18 }}>
              <div style={{ fontFamily: script, fontSize: script ? 64 : 34, color: INDIGO, lineHeight: 1.1 }}>{cert.instructorName}</div>
              <div style={{ width: 340, height: 2, background: GOLD, marginTop: 10 }} />
              <div style={{ fontSize: 18, fontWeight: 600, letterSpacing: 5, color: GRAY, marginTop: 14 }}>KURS USTOZI</div>
            </div>
          </div>
        </div>
      </div>
    ),
    { width: CERT_WIDTH, height: CERT_HEIGHT, fonts: fonts.length ? fonts : undefined }
  );
}
