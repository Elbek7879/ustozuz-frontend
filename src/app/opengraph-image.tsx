import { ImageResponse } from "next/og";

// Havola Telegram/Instagram/Facebook'da ulashilganda chiqadigan rasm (1200x630)
export const alt = "UstozUz — O'zbekistondagi eng yaxshi ustozlardan onlayn o'rganing";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "linear-gradient(135deg, #312e81 0%, #4f46e5 45%, #7c3aed 100%)",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 76,
              height: 76,
              borderRadius: 20,
              background: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#4f46e5",
              fontSize: 52,
              fontWeight: 800,
            }}
          >
            U
          </div>
          <div style={{ display: "flex", fontSize: 44, fontWeight: 800 }}>
            Ustoz<span style={{ color: "#c7d2fe" }}>Uz</span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ fontSize: 68, fontWeight: 800, lineHeight: 1.1, maxWidth: 950 }}>
            O&apos;zbekistondagi eng yaxshi ustozlardan o&apos;rganing
          </div>
          <div style={{ fontSize: 30, color: "#e0e7ff", maxWidth: 900 }}>
            Dasturlash, dizayn, biznes va tillar bo&apos;yicha video kurslar. Tugatgach — sertifikat.
          </div>
        </div>

        <div style={{ display: "flex", gap: 16 }}>
          {["Video darslar", "Sertifikat", "Tajribali ustozlar", "O'zbek tilida"].map((t) => (
            <div
              key={t}
              style={{
                display: "flex",
                padding: "12px 24px",
                borderRadius: 999,
                background: "rgba(255,255,255,0.15)",
                border: "1px solid rgba(255,255,255,0.3)",
                fontSize: 24,
              }}
            >
              {t}
            </div>
          ))}
        </div>
      </div>
    ),
    size
  );
}
