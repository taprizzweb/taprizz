// The owner's plans and prices. Everything on the pricing section and the /start order page comes from here, so a change is made once.
// Nothing is paid on the website: the team talks to the customer first.

export type Feature = { text: string; included?: boolean };
export type Pkg = { id: "starter" | "growth" | "pro"; name: string; price: number; tagline: string; lead: string; features: Feature[]; tag?: string; special?: boolean };

export const PACKAGES: Pkg[] = [
  {
    id: "starter", name: "Starter", price: 1700, tagline: "Everything to start collecting real Google reviews.", lead: "You get",
    features: [
      { text: "AI Review page: guests tap stars and options, and a review is written from their own choices (editable, never invented)" },
      { text: "Menu link and offers strip on your guest page" },
      { text: "Search keyword strip for your business" },
      { text: "WhatsApp contact capture (guests share only if they choose)" },
      { text: "Gallery photos (up to 2) and extra link buttons (up to 2)" },
      { text: "Basic monthly report" },
      { text: "Review replies by copy" },
      { text: "Your own digital menu and table ordering (Taprizz POS)", included: false },
    ],
  },
  {
    id: "growth", name: "Growth", price: 2700, tagline: "Hear every complaint first, and run offers and events.", lead: "Everything in Starter, plus",
    features: [
      { text: "Your own digital menu and table ordering (Taprizz POS): free with this plan" },
      { text: "Your first WhatsApp campaign is free" },
      { text: "Complaint and suggestion inbox, with voice notes" },
      { text: "Offers with claim codes, and events" },
      { text: "Creators corner: guests tag, follow and share photos or clips" },
      { text: "More gallery photos (up to 6) and link buttons (up to 5)" },
      { text: "Full monthly report" },
    ],
  },
  {
    id: "pro", name: "Pro", price: 3500, tagline: "The most complete plan, for cafes and restaurants that run the whole floor on Taprizz.", lead: "Everything in Growth, plus", tag: "Most premium plan", special: true,
    features: [
      { text: "Your own digital menu and table ordering (Taprizz POS) with no separate charges" },
      { text: "Gulabi Nagri: membership with discounts on your listing, and be the first to get listed" },
      { text: "Staff complaints and reports: see feedback and thank-yous for each person, so you know who is doing well and where each person can improve" },
      { text: "Call server bell and membership" },
      { text: "Content help: editing, posting and a calendar" },
      { text: "Most gallery photos (up to 15) and link buttons (up to 12)" },
      { text: "Monthly report with a call" },
      { text: "More WhatsApp campaigns included, up to a cap" },
      { text: "All upcoming updates and new features, as we ship them" },
    ],
  },
];

// 1 month: no discount. 6 months: 5% off. 12 months: 10% off, and 15% off on Pro (special offer).
export const termsFor = (pkg: Pkg) => [
  { months: 1, off: 0, label: "1 month", special: false },
  { months: 6, off: 5, label: "6 months", special: false },
  { months: 12, off: pkg.id === "pro" ? 15 : 10, label: "12 months", special: pkg.id === "pro" },
];
export type Term = ReturnType<typeof termsFor>[number];
export const fullPrice = (pkg: Pkg, t: Term) => pkg.price * t.months;
export const totalFor = (pkg: Pkg, t: Term) => Math.round(fullPrice(pkg, t) * (1 - t.off / 100));
export const savedFor = (pkg: Pkg, t: Term) => fullPrice(pkg, t) - totalFor(pkg, t);
/** The discount in plain words: how many months of this plan are free. */
export const freeMonths = (pkg: Pkg, t: Term) => Math.round((savedFor(pkg, t) / pkg.price) * 10) / 10;

// What goes on the table. To change a rule, change it here. The team confirms the final quote with every customer.
export const KIT = {
  freeNfcTabletops: 2,   // with an app plan: 2 NFC-based tabletops free, or
  freeQrTabletops: 4,    // 4 QR-based tabletops free
  tabletopPrice: { qr: 250, nfc: 450 }, // each tabletop after the free ones: QR-based Rs 250, NFC-based Rs 450
  platePrice: { qr: 600, nfcqr: 700 }, // AI Review only: the plate by itself
} as const;
export const PLACEMENTS = [
  { id: "tabletop", label: "Tabletops", help: "A sturdy stand that sits on the table." },
  { id: "standee", label: "QR standees", help: "A tall stand for counters, doors and walls." },
  { id: "plate", label: "QR plates", help: "A slim plate that sits flat on the table." },
] as const;

// AI QR (the review plates on their own). Monthly price depends on how long the customer pays for: 550 a month for 1 month, 500 a month for 6 months, 400 a month for a year.
export const AI_QR_TERMS = [
  { months: 1, perMonth: 550, label: "1 month" },
  { months: 6, perMonth: 500, label: "6 months" },
  { months: 12, perMonth: 400, label: "12 months" },
] as const;
export type AiTerm = (typeof AI_QR_TERMS)[number];
export const aiTotal = (t: AiTerm) => t.perMonth * t.months;
export const aiSaved = (t: AiTerm) => AI_QR_TERMS[0].perMonth * t.months - aiTotal(t);
/** One-time setup: Rs 2,000 for one plate, Rs 4,000 for two, and Rs 4,000 stays the same for three or more. */
export const SETUP_PER_PLATE = 2000;
export const SETUP_CAP = 4000;
export const setupFee = (plates: number) => (plates <= 0 ? 0 : Math.min(SETUP_PER_PLATE * plates, SETUP_CAP));
