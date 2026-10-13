import { videoEmbed } from "@/lib/format";
import { Play } from "lucide-react";

export function VideoFrame({ src, label }: { src: string; label: string }) {
  const v = videoEmbed(src);
  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-[28px] border border-white/10 bg-[#0a0a0a]">
      {v.type === "yt" && <iframe src={v.url} title={label} className="absolute inset-0 h-full w-full" allow="accelerometer; encrypted-media; picture-in-picture; fullscreen" allowFullScreen loading="lazy" />}
      {v.type === "mp4" && <video src={v.url} controls playsInline preload="metadata" className="absolute inset-0 h-full w-full object-cover" />}
      {v.type === "none" && (
        <div className="absolute inset-0 grid place-items-center text-center">
          <div>
            <div className="mx-auto mb-5 grid h-20 w-20 place-items-center rounded-full bg-lime-400"><Play className="h-8 w-8 fill-black text-black" /></div>
            <p className="text-xl font-semibold">{label}</p>
            <p className="mt-1 text-sm text-white/40">Video will appear here (add the link in Admin → Settings)</p>
          </div>
        </div>
      )}
    </div>
  );
}
