// Plain data for the home page. It lives outside the client components so the server page can read it too.

// Businesses that use Taprizz. To add, change or remove one, edit this list. Logos live in public/clients.
// An address is only filled in when we have it from the business itself; otherwise just the city shows.
export const CATEGORIES = [
  { id: "cafe", label: "Cafes & Restaurants", one: "cafe or restaurant" },
  { id: "salon", label: "Salons & Spas", one: "salon or spa" },
  { id: "hotel", label: "Hotels", one: "hotel" },
  { id: "gym", label: "Gyms", one: "gym" },
] as const;
export type CategoryId = (typeof CATEGORIES)[number]["id"];

export const CLIENTS: { name: string; slug: string; logo: string; category: CategoryId; addresses: string[] }[] = [
  { name: "Coffeekaart", slug: "coffeekaart", logo: "/clients/coffeekaart.webp", category: "cafe", addresses: ["Gali No. 3, Raja Park, Jaipur 302004", "Coffeekaart II: C-1, Railway Station Road, Gandhi Nagar, Jaipur 302015"] },
  { name: "Green Feast", slug: "greenfeast", logo: "/clients/greenfeast.webp", category: "cafe", addresses: ["C-35 A, Lajpat Marg, C Scheme, Jaipur 302001", "Take away: Sector 3, Jawahar Nagar, Jaipur"] },
];

// Questions an owner asks before booking. They are shown first in the FAQ.
export const OWNER_QA = [
  { q: "Do I need to change my POS?", a: "No. Keep your Pet Pooja or any other POS. Reviews, feedback, offers, your mini link and Gulabi Nagri work alongside it. Taprizz ordering is optional, and billing can stay where it is." },
  { q: "Will this get me fake or bought reviews?", a: "No. A guest chooses what they liked, a draft is written from those choices, and the guest edits it and posts it themselves. We do not post for anyone, and we do not buy or reward reviews." },
  { q: "What if a guest is unhappy?", a: "Every guest can post a review on Google. The app also gives guests a private way to tell you what went wrong, so you can put it right." },
  { q: "Is this only for one outlet?", a: "No. Several outlets can sit under one view, each with its own plaque and page." },
  { q: "What do SEO and GEO mean for my business?", a: "SEO is being found on Google Search and Maps. GEO is being understood and mentioned when people ask an AI assistant, such as ChatGPT or Gemini, for a place near them. Both start from clear, consistent information and honest, recent reviews. Nobody can guarantee a rank or a mention." },
];
