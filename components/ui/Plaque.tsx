// The plate shown in the hero: a real Taprizz welcome kit (public/plaques/hero-plate.webp).
export function Plaque({ className = "" }: { className?: string }) {
  return (
    <div className={`relative aspect-[760/988] w-full max-w-[360px] overflow-hidden rounded-[26px] shadow-[0_30px_80px_-20px_rgba(255,255,255,0.18)] ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/plaques/hero-plate.webp" alt="A Taprizz welcome kit plate with the Taprizz NFC tap sign and a QR code" width={760} height={988} fetchPriority="high" decoding="async" className="h-full w-full object-cover" draggable={false} />
    </div>
  );
}
