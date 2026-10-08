import { PlayCircle } from "lucide-react";
import { youtubeEmbedUrl, youtubeId } from "@/lib/video";

// Dars videosi saytning o'zida o'ynaydi. Video bo'lmasa — chiroyli bo'sh holat.
export default function VideoPlayer({
  url,
  title,
  autoplay = false,
}: {
  url: string | null | undefined;
  title: string;
  autoplay?: boolean;
}) {
  const id = youtubeId(url);

  if (!id) {
    return (
      <div className="relative aspect-video rounded-2xl bg-gradient-to-br from-gray-900 to-indigo-950 flex items-center justify-center">
        <div className="text-center px-6">
          <PlayCircle className="w-14 h-14 text-white/40 mx-auto mb-3" />
          <p className="text-white font-medium">{title}</p>
          <p className="text-white/50 text-sm mt-1">Bu dars uchun video hali qo&apos;shilmagan</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative aspect-video rounded-2xl overflow-hidden bg-black shadow-xl">
      <iframe
        src={youtubeEmbedUrl(id, autoplay)}
        title={title}
        className="absolute inset-0 w-full h-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      />
    </div>
  );
}
