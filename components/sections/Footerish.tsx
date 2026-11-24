"use client";
import { useState } from "react";
import { ChevronDown, Mail, MapPin } from "lucide-react";
import type { SiteContent } from "@/lib/types";
import { SectionHead } from "@/components/ui/Reveal";

export function Faq({ c }: { c: SiteContent }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="grid-light px-5 pb-24 text-ink md:px-8 md:pb-32">
      <div className="mx-auto max-w-[1280px]">
        <SectionHead light title="Questions, answered" />
        <div className="max-w-3xl space-y-3">
          {c.faq.map((f, i) => (
            <div key={f.q} className="rounded-2xl border border-black/10 bg-white">
              <button className="flex w-full items-center justify-between gap-4 p-5 text-left" onClick={() => setOpen(open === i ? null : i)} aria-expanded={open === i}>
                <span className="text-lg font-semibold">{f.q}</span><ChevronDown className={`h-5 w-5 shrink-0 transition ${open === i ? "rotate-180" : ""}`} />
              </button>
              {open === i && <p className="px-5 pb-5 text-black/60">{f.a}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function InstagramIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function WhatsAppIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M12.04 2a9.9 9.9 0 0 0-8.5 14.9L2 22l5.25-1.5A9.93 9.93 0 1 0 12.04 2Zm0 18.1c-1.5 0-2.97-.4-4.25-1.17l-.3-.18-3.1.89.9-3.02-.2-.31A8.1 8.1 0 1 1 12.04 20.1Zm4.45-6.06c-.24-.12-1.44-.71-1.66-.79-.22-.08-.38-.12-.54.12-.16.24-.62.79-.76.95-.14.16-.28.18-.52.06a6.6 6.6 0 0 1-1.94-1.2 7.3 7.3 0 0 1-1.34-1.67c-.14-.24-.02-.37.1-.49.1-.1.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.78-.2-.46-.4-.4-.54-.4h-.46c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2s.86 2.32.98 2.48c.12.16 1.7 2.6 4.1 3.64.58.25 1.03.4 1.38.51.58.18 1.1.16 1.52.1.46-.07 1.44-.59 1.64-1.16.2-.57.2-1.06.14-1.16-.06-.1-.22-.16-.46-.28Z" />
    </svg>
  );
}

// wa.me opens a WhatsApp chat with the business number, with the message already typed.
export const waLink = (number: string, text: string) => `https://wa.me/${number.replace(/\D/g, "")}?text=${encodeURIComponent(text)}`;
export const waShow = (number: string) => { const d = number.replace(/\D/g, ""); return d.length === 12 && d.startsWith("91") ? `+91 ${d.slice(2, 7)} ${d.slice(7)}` : `+${d}`; };

// ig.me opens a direct message thread with the profile.
export const igDm = (f: SiteContent["footer"]) => `https://ig.me/m/${f.instagramHandle.replace(/^@/, "")}`;

export function Footer({ c }: { c: SiteContent }) {
  const s = c.settings;
  const f = c.footer;
  const col = "text-sm text-white/55 transition hover:text-lime-400";
  const head = "mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-white";
  return (
    <footer className="bg-[#0a0a0a] px-5 pt-16 md:px-8">
      <div className="mx-auto grid max-w-[1280px] gap-12 border-b border-white/10 pb-14 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
        <div>
          <img src="/logo-light.svg" alt={s.brand} className="h-14 w-auto" />
          <p className="mt-5 max-w-xs text-sm text-white/55">{f.tagline}</p>
          <div className="mt-6 flex items-center gap-3">
            <a href={f.instagram} target="_blank" rel="noopener noreferrer" aria-label={`Instagram ${f.instagramHandle}`} className="grid h-11 w-11 place-items-center rounded-full border border-white/20 text-white transition hover:border-lime-400 hover:text-lime-400"><InstagramIcon className="h-5 w-5" /></a>
            <a href={f.instagram} target="_blank" rel="noopener noreferrer" className="text-sm text-white/55 hover:text-lime-400">{f.instagramHandle}</a>
          </div>
        </div>
        <nav aria-label="Quick links">
          <p className={head}>Quick links</p>
          <ul className="space-y-3">
            {[["/#partners", "Partners"], ["/#products", "Products"], ["/#advantages", "Advantages"], ["/#gulabi", "Gulabi Nagri"], ["/#book", "Book a meeting"]].map(([h, t]) => (<li key={h}><a href={h} className={col}>{t}</a></li>))}
          </ul>
        </nav>
        <nav aria-label="Policies">
          <p className={head}>Terms &amp; policies</p>
          <ul className="space-y-3">
            {[["/terms", "Terms & Conditions"], ["/privacy", "Privacy Policy"], ["/refund", "Cancellation & Refund Policy"]].map(([h, t]) => (<li key={h}><a href={h} className={col}>{t}</a></li>))}
          </ul>
        </nav>
        <div>
          <p className={head}>Help &amp; support</p>
          <ul className="space-y-3">
            <li><a href="/#contact" className={col}>Contact us</a></li>
            <li><a href="/#contact" className={col}>FAQ</a></li>
            {s.whatsapp && <li><a href={waLink(s.whatsapp, "Hi Taprizz, I found you on your website.")} target="_blank" rel="noopener noreferrer" className={`${col} flex items-center gap-2`}><WhatsAppIcon className="h-4 w-4" />WhatsApp {waShow(s.whatsapp)}</a></li>}
            <li><a href={igDm(f)} target="_blank" rel="noopener noreferrer" className={`${col} flex items-center gap-2`}><InstagramIcon className="h-4 w-4" />DM {f.instagramHandle}</a></li>
            <li><a href={`mailto:${s.email}`} className={`${col} flex items-center gap-2`}><Mail className="h-4 w-4" />{s.email}</a></li>
            <li className="flex items-center gap-2 text-sm text-white/55"><MapPin className="h-4 w-4 shrink-0" />{s.city}</li>
          </ul>
        </div>
      </div>
      <div className="mx-auto max-w-[1280px] pb-24 pt-8 text-xs leading-relaxed text-white/40 md:pb-10">
        <p>© {new Date().getFullYear()} {s.brand}. All rights reserved. Made in Jaipur.</p>
        <p className="mt-4"><b className="text-white/60">Disclaimer:</b> {f.disclaimer}</p>
      </div>
      {s.whatsapp && <a href={waLink(s.whatsapp, "Hi Taprizz, I found you on your website.")} target="_blank" rel="noopener noreferrer" aria-label="Message us on WhatsApp" className="fixed bottom-5 right-5 z-40 grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-xl transition hover:scale-110"><WhatsAppIcon className="h-8 w-8" /></a>}
    </footer>
  );
}
