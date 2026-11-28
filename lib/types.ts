export type Product = {
  id: string;
  name: string;
  tagline: string;
  price: number; // MRP in INR
  discount: number; // percent (used only when salePrice is 0)
  salePrice: number; // direct selling price in INR; 0 = derive from MRP and discount
  images: string[];
  stock: number;
  active: boolean;
  badge: string;
  features: string[];
};

export type Partner = {
  name: string;
  slug: string; // the mini link name: link.taprizz.in/<slug>. Leave empty if the business has no mini link yet.
  image: string; // logo
  category: "cafe" | "salon" | "hotel" | "gym" | "clinic" | "education";
  addresses: string[];
  about?: string; // one short line that helps people recognise the business
};

export type Addon = { id: string; name: string; description: string; price: number; active: boolean };

export type PlanTier = { months: 1 | 3 | 6; price: number; original: number };
export type Plan = {
  id: string;
  name: string;
  tagline: string;
  highlight: boolean;
  tiers: PlanTier[];
  features: { text: string; included: boolean }[];
};

export type SiteContent = {
  settings: {
    brand: string;
    email: string;
    city: string;
    upiId: string;
    upiName: string;
    whatsapp: string; // digits with country code, for wa.me links, e.g. 919672999166
    announcement: string;
  };
  hero: { eyebrow: string; title: string; highlight: string; subtitle: string; cta: string; stats: { value: string; label: string }[] };
  partners: Partner[];
  products: Product[];
  addons: Addon[];
  plans: Plan[];
  faq: { q: string; a: string }[];
  footer: { instagram: string; instagramHandle: string; tagline: string; disclaimer: string };
  legal: { updated: string; terms: string; privacy: string; refund: string };
};
