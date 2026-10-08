"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Play, X } from "lucide-react";
import VideoPlayer from "@/components/VideoPlayer";
import { coverOf } from "@/lib/images";
import { youtubeId } from "@/lib/video";

// Kurs muqovasi: birinchi darsda video bo'lsa, bosilganda bepul ko'rish oynasi ochiladi
export default function CoursePreview({
  imageUrl,
  title,
  videoUrl,
}: {
  imageUrl: string | null;
  title: string;
  videoUrl: string | null;
}) {
  const [open, setOpen] = useState(false);
  const hasVideo = !!youtubeId(videoUrl);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => hasVideo && setOpen(true)}
        disabled={!hasVideo}
        aria-label={hasVideo ? "Kursni bepul ko'rish" : title}
        className="group relative block w-full aspect-video rounded-3xl overflow-hidden ring-1 ring-white/10 shadow-2xl disabled:cursor-default"
      >
        <Image
          src={coverOf(imageUrl)}
          alt={title}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 400px"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
        {hasVideo && (
          <>
            <span className="absolute inset-0 flex items-center justify-center">
              <span className="relative w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                <span className="absolute inset-0 rounded-full bg-white/60 animate-ping" />
                <Play className="relative w-7 h-7 text-indigo-700 fill-indigo-700 ml-1" />
              </span>
            </span>
            <span className="absolute bottom-4 inset-x-0 text-center text-sm font-semibold text-white">
              Kursni bepul ko&apos;rish
            </span>
          </>
        )}
      </button>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Kursni oldindan ko'rish"
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <div onClick={(e) => e.stopPropagation()} className="w-full max-w-4xl">
            <div className="flex items-center justify-between gap-4 mb-3">
              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-wider text-indigo-300">Bepul dars</p>
                <p className="text-white font-semibold truncate">{title}</p>
              </div>
              <button
                onClick={() => setOpen(false)}
                aria-label="Yopish"
                className="shrink-0 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <VideoPlayer url={videoUrl} title={title} autoplay />
          </div>
        </div>
      )}
    </>
  );
}
