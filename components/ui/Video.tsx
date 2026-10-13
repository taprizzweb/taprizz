import { videoEmbed } from "@/lib/format";
import { Play } from "lucide-react";

export function VideoFrame({ src, label }: { src: string; label: string }) {
  const v = videoEmbed(src);
  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-3xl border border-gold-400/30 bg-black shadow-[0_0_80px_-20px_rgba(212,169,55,0.4)]">
      {v.type === "yt" && (
        <iframe src={v.url} title={label} className="absolute inset-0 h-full w-full" allow="accelerometer; encrypted-media; picture-in-picture; fullscreen" allowFullScreen loading="lazy" />
      )}
      {v.type === "mp4" && <video src={v.url} controls playsInline preload="metadata" className="absolute inset-0 h-full w-full object-cover" />}
      {v.type === "none" && (
        <div className="absolute inset-0 grid place-items-center bg-[radial-gradient(circle_at_center,#1c1a12,#07070a)] text-center">
          <div>
            <div className="mx-auto mb-4 grid h-20 w-20 place-items-center rounded-full border border-gold-400/50 bg-gold-400/10">
              <Play className="h-8 w-8 fill-gold-400 text-gold-400" />
            </div>
            <p className="font-serif text-xl">{label}</p>
            <p className="mt-1 text-sm text-white/40">Video will appear here (add the link in Admin → Settings)</p>
          </div>
        </div>
      )}
    </div>
  );
}
