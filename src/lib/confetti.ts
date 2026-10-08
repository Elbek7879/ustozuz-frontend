// Kurs tugaganda ekranga rangli konfetti sochadi (kutubxonasiz, bitta canvas)
export function fireConfetti(duration = 2600) {
  if (typeof window === "undefined" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const canvas = document.createElement("canvas");
  canvas.style.cssText = "position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:200";
  document.body.appendChild(canvas);
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    canvas.remove();
    return;
  }

  const dpr = window.devicePixelRatio || 1;
  const w = window.innerWidth;
  const h = window.innerHeight;
  canvas.width = w * dpr;
  canvas.height = h * dpr;
  ctx.scale(dpr, dpr);

  const colors = ["#4f46e5", "#7c3aed", "#ec4899", "#f59e0b", "#10b981", "#06b6d4"];
  // Ikki pastki burchakdan markazga qarab otiladi
  const pieces = Array.from({ length: 180 }, (_, i) => {
    const left = i % 2 === 0;
    return {
      x: left ? 0 : w,
      y: h * 0.75,
      vx: (left ? 1 : -1) * (3 + Math.random() * 9),
      vy: -(9 + Math.random() * 12),
      size: 6 + Math.random() * 6,
      rot: Math.random() * Math.PI,
      vr: (Math.random() - 0.5) * 0.3,
      color: colors[i % colors.length],
    };
  });

  const total = duration + 900;
  const start = performance.now();
  const frame = (now: number) => {
    const t = now - start;
    ctx.clearRect(0, 0, w, h);
    ctx.globalAlpha = t < duration ? 1 : Math.max(0, 1 - (t - duration) / 900);
    for (const p of pieces) {
      p.vy = Math.min(p.vy + 0.32, 5);
      p.vx *= 0.985;
      p.x += p.vx;
      p.y += p.vy;
      p.rot += p.vr;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
      ctx.restore();
    }
    if (t < total) requestAnimationFrame(frame);
    else canvas.remove();
  };
  requestAnimationFrame(frame);
}
