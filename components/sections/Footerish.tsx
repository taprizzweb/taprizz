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
      <a href={igDm(f)} target="_blank" rel="noopener noreferrer" aria-label={`Message us on Instagram ${f.instagramHandle}`} className="fixed bottom-5 right-5 z-40 grid h-14 w-14 place-items-center rounded-full bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] text-white shadow-xl transition hover:scale-110"><InstagramIcon className="h-7 w-7" /></a>
    </footer>
  );
}
