// The real Taprizz plaque artwork (public/plaques/*.png).
export type PlaqueVariant = "graphite" | "blue";

export function Plaque({ variant = "graphite", className = "" }: { brand?: string; variant?: PlaqueVariant; className?: string }) {
  return (
    <div className={`relative aspect-square w-full max-w-[360px] overflow-hidden rounded-[28px] border border-gold-400/30 shadow-[0_30px_80px_-20px_rgba(212,169,55,0.35)] ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={`/plaques/${variant}.png`} alt={`Taprizz ${variant} review plaque with NFC tap and QR code`} className="h-full w-full object-cover" draggable={false} />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(115deg,transparent_35%,rgba(255,255,255,0.18)_50%,transparent_65%)]" />
    </div>
  );
}
