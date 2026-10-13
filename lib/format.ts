export const inr = (n: number) => "₹" + Math.round(n).toLocaleString("en-IN");
export const discounted = (price: number, discount: number) => Math.round(price * (1 - (discount || 0) / 100));
export function videoEmbed(src: string): { type: "yt" | "mp4" | "none"; url: string } {
  if (!src) return { type: "none", url: "" };
  if (/\.(mp4|webm|mov)(\?|$)/i.test(src)) return { type: "mp4", url: src };
  const m = src.match(/(?:youtu\.be\/|v=|embed\/|shorts\/)([\w-]{11})/) || (src.length === 11 ? [src, src] : null);
  return m ? { type: "yt", url: `https://www.youtube.com/embed/${m[1]}?rel=0&modestbranding=1` } : { type: "mp4", url: src };
}
export const months = (m: number) => (m === 1 ? "1 Month" : `${m} Months`);

type Priced = { price: number; discount: number; salePrice?: number };
// Selling price: an explicit salePrice wins; otherwise MRP minus discount %.
export const sellPrice = (p: Priced) => (p.salePrice && p.salePrice > 0 ? Math.round(p.salePrice) : discounted(p.price, p.discount));
export const offPercent = (p: Priced) => (p.price > 0 ? Math.max(0, Math.round((1 - sellPrice(p) / p.price) * 100)) : 0);
