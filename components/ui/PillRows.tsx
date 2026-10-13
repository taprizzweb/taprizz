// Rolling rows of pills: a few bright labelled ones, the rest dim blanks.
const widths = [120, 210, 90, 170, 260, 100, 190, 140];

export function PillRows({ tags }: { tags: string[] }) {
  const rows = 5;
  const per = Math.max(2, Math.ceil(tags.length / rows));
  return (
    <div className="space-y-4 overflow-hidden py-2 [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
      {Array.from({ length: rows }).map((_, r) => {
        const mine = tags.slice(r * per, r * per + per);
        const items: { label?: string; w: number }[] = [];
        for (let k = 0; k < 6; k++) {
          items.push({ w: widths[(r * 3 + k * 2) % widths.length] });
          const label = mine[k % Math.max(1, mine.length)];
          if (label) items.push({ label, w: 0 });
        }
        const row = [...items, ...items];
        return (
          <div key={r} className="flex w-max gap-4" style={{ animation: `marquee ${46 + r * 7}s linear infinite ${r % 2 ? "reverse" : "normal"}`, marginLeft: r * -90 }}>
            {row.map((it, i) =>
              it.label ? (
                <span key={i} className="flex items-center gap-3 whitespace-nowrap rounded-full bg-lime-400 px-7 py-4 text-lg font-medium text-black"><span className="text-xl">+</span>{it.label}</span>
              ) : (
                <span key={i} className="h-[58px] shrink-0 rounded-full bg-lime-dim" style={{ width: it.w }} />
              )
            )}
          </div>
        );
      })}
    </div>
  );
}
