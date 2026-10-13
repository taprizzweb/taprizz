"use client";
import { Plus, Trash2, Upload } from "lucide-react";

type J = any;
const LONG = /text|subtitle|description|answer|^a$|announcement|message|tagline|notes/i;
const label = (k: string) => k.replace(/([A-Z])/g, " $1").replace(/^./, (c) => c.toUpperCase());

function blank(sample: J): J {
  if (Array.isArray(sample)) return [];
  if (sample && typeof sample === "object") return Object.fromEntries(Object.entries(sample).map(([k, v]) => [k, blank(v)]));
  if (typeof sample === "number") return 0;
  if (typeof sample === "boolean") return true;
  return "";
}

async function upload(file: File): Promise<string> {
  const fd = new FormData();
  fd.append("file", file);
  const r = await fetch("/api/admin/upload", { method: "POST", body: fd });
  const j = await r.json();
  if (!r.ok) throw new Error(j.error);
  return j.url;
}

export function JsonEditor({ value, onChange, name = "" }: { value: J; onChange: (v: J) => void; name?: string }) {
  if (Array.isArray(value)) {
    const isImages = name === "images";
    const prim = value.length > 0 && typeof value[0] !== "object";
    const sample = value.length ? value[0] : isImages || /values|options|points|features/.test(name) ? "" : {};
    return (
      <div className="space-y-3">
        {value.map((item: J, i: number) => (
          <div key={i} className={`relative ${prim || typeof item !== "object" ? "flex items-center gap-2" : "rounded-2xl border border-line bg-ink p-4"}`}>
            <div className="flex-1">
              <JsonEditor value={item} name={isImages ? "image" : name} onChange={(v) => onChange(value.map((x: J, j: number) => (j === i ? v : x)))} />
            </div>
            <button type="button" aria-label="Remove" onClick={() => onChange(value.filter((_: J, j: number) => j !== i))} className="shrink-0 p-1 text-red-400 hover:text-red-300"><Trash2 className="h-4 w-4" /></button>
          </div>
        ))}
        <button type="button" onClick={() => onChange([...value, blank(sample)])} className="flex items-center gap-1.5 rounded-full border border-gold-400/40 px-3 py-1.5 text-xs text-gold-300 hover:bg-gold-400/10"><Plus className="h-3.5 w-3.5" /> Add {label(name || "item")}</button>
      </div>
    );
  }
  if (value && typeof value === "object") {
    return (
      <div className="grid gap-3 sm:grid-cols-2">
        {Object.entries(value).map(([k, v]) => {
          const wide = typeof v === "object" || (typeof v === "string" && (LONG.test(k) || v.length > 70));
          return (
            <div key={k} className={wide ? "sm:col-span-2" : ""}>
              <span className="lbl">{label(k)}</span>
              <JsonEditor value={v} name={k} onChange={(nv) => onChange({ ...value, [k]: nv })} />
            </div>
          );
        })}
      </div>
    );
  }
  if (typeof value === "boolean") {
    return (
      <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={value} onChange={(e) => onChange(e.target.checked)} className="h-4 w-4 accent-[#d4a937]" /> {value ? "Yes" : "No"}</label>
    );
  }
  if (typeof value === "number") {
    return <input type="number" className="input" value={Number.isFinite(value) ? value : 0} onChange={(e) => onChange(Number(e.target.value))} />;
  }
  const str = String(value ?? "");
  const isImg = name === "image";
  if (isImg) {
    return (
      <div className="flex items-center gap-2">
        {str && /* eslint-disable-next-line @next/next/no-img-element */ <img src={str} alt="" className="h-10 w-10 rounded object-cover" />}
        <input className="input" value={str} placeholder="Image URL or upload →" onChange={(e) => onChange(e.target.value)} />
        <label className="cursor-pointer rounded-lg border border-line p-2 hover:border-gold-400" title="Upload image">
          <Upload className="h-4 w-4" />
          <input type="file" accept="image/*" className="hidden" onChange={async (e) => { const f = e.target.files?.[0]; if (!f) return; try { onChange(await upload(f)); } catch (x: any) { alert(x.message); } }} />
        </label>
      </div>
    );
  }
  return LONG.test(name) || str.length > 70 ? (
    <textarea className="input" rows={3} value={str} onChange={(e) => onChange(e.target.value)} />
  ) : (
    <input className="input" value={str} onChange={(e) => onChange(e.target.value)} />
  );
}
