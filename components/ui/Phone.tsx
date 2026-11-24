// A phone frame around a real screenshot of the Taprizz guest or owner screens (public/shots).
export function Phone({ src, alt, className = "", priority = false }: { src: string; alt: string; className?: string; priority?: boolean }) {
  return (
    <div className={`relative aspect-[1170/2532] overflow-hidden rounded-[34px] border-[6px] border-[#2b2c30] bg-black shadow-[0_30px_70px_-25px_rgba(0,0,0,0.9)] ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} width={520} height={1125} loading={priority ? "eager" : "lazy"} draggable={false} className="h-full w-full object-cover" />
    </div>
  );
}
