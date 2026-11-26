// Plain data for the home page. It lives outside the client components so the server page can read it too.

export const CATEGORIES = [
  { id: "cafe", label: "Cafes & Restaurants", one: "cafe or restaurant" },
  { id: "salon", label: "Salons & Spas", one: "salon or spa" },
  { id: "hotel", label: "Hotels & Stays", one: "hotel or homestay" },
  { id: "gym", label: "Gyms", one: "gym" },
  { id: "clinic", label: "Clinics", one: "clinic" },
] as const;
export type CategoryId = (typeof CATEGORIES)[number]["id"];

// Questions an owner asks before booking. They are shown first in the FAQ.
export const OWNER_QA = [
  { q: "Do I need to change my POS?", a: "No. Keep your Pet Pooja or any other POS. Reviews, feedback, offers, your mini link and Gulabi Nagri work alongside it. Taprizz ordering is optional, and billing can stay where it is." },
  { q: "Will this get me fake or bought reviews?", a: "No. A guest chooses what they liked, a draft is written from those choices, and the guest edits it and posts it themselves. We do not post for anyone, and we do not buy or reward reviews." },
  { q: "What if a guest is unhappy?", a: "Every guest can post a review on Google. The app also gives guests a private way to tell you what went wrong, so you can put it right." },
  { q: "Is this only for one outlet?", a: "No. Several outlets can sit under one view, each with its own plaque and page." },
  { q: "What do SEO and GEO mean for my business?", a: "SEO is being found on Google Search and Maps. GEO is being understood and mentioned when people ask an AI assistant, such as ChatGPT or Gemini, for a place near them. Both start from clear, consistent information and honest, recent reviews. Nobody can guarantee a rank or a mention." },
];

// Businesses we have made a demo for. They are NOT partners and have not endorsed Taprizz. Add a name only when a demo for them really exists.
export const DEMO_FOR: { name: string; kind: string }[] = [
  { name: "Nothing Before Coffee, Jal Mahal", kind: "Cafe" },
  { name: "Nothing Before Coffee, C Scheme", kind: "Cafe" },
  { name: "Carbon Cafe", kind: "Coffee bar, Jaipur" },
];

// Plate designs shown one after another in the hero. Add a file to /public/plates and a line here. `note` is shown under the plate (use "Demo design" for a business that is not a partner).
export const HERO_PLATES: { src: string; name: string; w: number; h: number; note?: string }[] = [
  { src: "/plates/chitra-katha.png", name: "Chitra Katha", w: 678, h: 732 },
  { src: "/plates/nbc.png", name: "Nothing Before Coffee", w: 475, h: 716, note: "Demo design" },
];
