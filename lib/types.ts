export type Product = {
  id: string;
  name: string;
  tagline: string;
  price: number; // MRP in INR
  discount: number; // percent
  images: string[];
  stock: number;
  active: boolean;
  badge: string;
  features: string[];
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
    whatsapp: string;
    email: string;
    phone: string;
    city: string;
    upiId: string;
    upiName: string;
    announcement: string;
    introVideo: string; // YouTube id/url or mp4 url (the 1:40 teaser)
    fullDemoVideo: string; // YouTube id/url or mp4 url
    demoBusiness: string;
  };
  hero: { eyebrow: string; title: string; highlight: string; subtitle: string; cta: string; stats: { value: string; label: string }[] };
  importance: { title: string; subtitle: string; points: { title: string; text: string }[] };
  showcase: { title: string; subtitle: string; steps: { title: string; text: string }[] };
  how: { title: string; steps: { title: string; text: string }[] };
  demo: { title: string; subtitle: string; question: string; options: string[] };
  comparison: { title: string; subtitle: string; columns: string[]; rows: { feature: string; values: string[] }[] };
  products: Product[];
  addons: Addon[];
  plans: Plan[];
  audience: { title: string; items: { name: string; text: string }[] };
  about: { title: string; text: string; points: string[] };
  faq: { q: string; a: string }[];
  roadmap: { title: string; subtitle: string; items: { name: string; text: string; status: string }[] };
  footer: { instagram: string; instagramHandle: string; tagline: string; disclaimer: string };
  legal: { updated: string; terms: string; privacy: string; refund: string };
  testimonialsNote: string;
};
