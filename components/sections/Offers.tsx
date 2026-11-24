import { ArrowUpRight, Check } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { Reveal, SectionHead } from "@/components/ui/Reveal";
import { Phone } from "@/components/ui/Phone";

// The live demo business is "Daily Brew Cafe". Visitors can open it on their own phone.
export const LIVE_DEMO_URL = "https://app.taprizz.in/e/dbcaf3";

const PLAQUE_POINTS = [
  "NFC tap and QR code on a premium plaque",
  "Guest picks stars and what they liked, AI drafts the review, the guest edits it and posts it on Google",
  "A review page made for your business, with your keywords",
  "Ready to order today in the shop below",
];
const PLATFORM_POINTS = [
  "The same AI review, plus a private way to tell you what went wrong",
  "Menu, table ordering and a call-the-waiter button, if you want them",
  "Offers, events and a mini link page for your Instagram bio",
  "A dashboard and phone alerts for your team",
  "A listing in Gulabi Nagri, our Jaipur guest guide (pilot)",
];

export function TwoOffers() {
  return (
    <section id="offers" className="grid-light scroll-mt-20 px-5 py-24 text-ink md:px-8 md:py-32">
      <div className="mx-auto max-w-[1280px]">
        <SectionHead light title="Two ways to work with Taprizz" subtitle="Start with the review plaque. Add the full guest platform whenever you are ready, or begin with both." />
        <div className="grid gap-6 lg:grid-cols-2">
          <Reveal>
            <article className="flex h-full flex-col rounded-[30px] border border-black/10 bg-white p-8 md:p-10">
              <span className="w-fit rounded-full border border-black/20 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em]">AI Review Plaque</span>
              <h3 className="mt-5 text-4xl leading-[1.02] md:text-5xl">A plaque that gets honest reviews written.</h3>
              <ul className="mt-7 space-y-3.5">
                {PLAQUE_POINTS.map((p) => (<li key={p} className="flex gap-3 text-black/70"><Check className="mt-1 h-4 w-4 shrink-0" />{p}</li>))}
              </ul>
              <div className="mt-auto flex flex-wrap gap-3 pt-9">
                <a href="#shop" className="inline-flex items-center gap-2 rounded-full bg-black px-7 py-3.5 font-semibold text-white transition hover:bg-black/85">Shop plaques <ArrowUpRight className="h-4 w-4" /></a>
                <a href="#demo" className="inline-flex items-center gap-2 rounded-full border border-black/25 px-7 py-3.5 font-semibold transition hover:bg-black hover:text-white">Try the review flow</a>
              </div>
            </article>
          </Reveal>
          <Reveal delay={0.08}>
            <article className="flex h-full flex-col rounded-[30px] bg-black p-8 text-white md:p-10">
              <span className="flex w-fit items-center gap-2 rounded-full border border-white/25 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em]">Guest Platform <b className="rounded-full bg-lime-400 px-2 py-0.5 text-[10px] text-black">NEW</b></span>
              <h3 className="mt-5 text-4xl leading-[1.02] md:text-5xl">One tap for the whole guest experience.</h3>
              <ul className="mt-7 space-y-3.5">
                {PLATFORM_POINTS.map((p) => (<li key={p} className="flex gap-3 text-white/70"><Check className="mt-1 h-4 w-4 shrink-0 text-lime-400" />{p}</li>))}
              </ul>
              <div className="mt-auto flex flex-wrap gap-3 pt-9">
                <a href="#book" className="inline-flex items-center gap-2 rounded-full bg-lime-400 px-7 py-3.5 font-semibold text-black transition hover:bg-lime-300">Book a demo <ArrowUpRight className="h-4 w-4" /></a>
                <a href="#platform" className="inline-flex items-center gap-2 rounded-full border border-white/25 px-7 py-3.5 font-semibold transition hover:border-lime-400 hover:text-lime-400">See it on a phone</a>
              </div>
            </article>
          </Reveal>
        </div>
        <Reveal delay={0.1}>
          <p className="mt-8 max-w-3xl text-black/55">SEO and GEO work can be added to either offer, so you are found on Google and in AI answers. See below. Every Taprizz plaque carries a built-in NFC chip, so guests tap their phone to open the page, and a printed QR code as well, so every phone is covered.</p>
        </Reveal>
      </div>
    </section>
  );
}

const SCREENS = [
  { src: "/shots/guest.webp", title: "Guest page", text: "One tap opens your own page: review, menu, offers and a way to raise a complaint." },
  { src: "/shots/review.webp", title: "AI review", text: "Stars, a few taps, and a draft in Hindi, Hinglish or English that the guest can edit." },
  { src: "/shots/menu.webp", title: "Menu and ordering", text: "Guests order from the table. Optional." },
  { src: "/shots/thanks.webp", title: "Order status", text: "Guests see Received, Preparing, Ready and Served." },
  { src: "/shots/kitchen.webp", title: "Kitchen screen", text: "Orders to cook, on the cook's own phone." },
  { src: "/shots/dashboard.webp", title: "Your dashboard", text: "Reviews, feedback, offers and your team in one place." },
  { src: "/shots/minilink.webp", title: "Mini link", text: "One page for your Instagram bio, with buttons you can change yourself." },
];

export function Platform() {
  return (
    <section id="platform" className="scroll-mt-20 bg-black px-5 py-24 text-white md:px-8 md:py-32">
      <div className="mx-auto max-w-[1280px]">
        <SectionHead title="See what your guest sees." subtitle="Real screens from the Taprizz Guest Platform, shown with a demo cafe. Swipe through." />
      </div>
      <div className="mx-auto max-w-[1280px]">
        <div className="-mx-5 flex snap-x snap-mandatory gap-6 overflow-x-auto px-5 pb-6 md:mx-0 md:px-0" tabIndex={0} aria-label="Screens of the Guest Platform">
          {SCREENS.map((s) => (
            <figure key={s.title} className="w-[220px] shrink-0 snap-start md:w-[240px]">
              <Phone src={s.src} alt={`${s.title}: ${s.text}`} />
              <figcaption className="mt-4"><p className="text-lg font-semibold">{s.title}</p><p className="mt-1 text-sm text-white/55">{s.text}</p></figcaption>
            </figure>
          ))}
        </div>
        <Reveal>
          <div className="mt-14 grid items-center gap-8 rounded-[30px] border border-white/12 bg-[#0c0c0c] p-8 md:grid-cols-[auto_1fr_auto] md:p-10">
            <div className="w-fit rounded-2xl bg-white p-3"><QRCodeSVG value={LIVE_DEMO_URL} size={132} /></div>
            <div>
              <h3 className="text-3xl md:text-4xl">Try it on your own phone.</h3>
              <p className="mt-2 max-w-xl text-white/60">Scan the code or open the link. You will land on the guest page of a demo cafe. Look around and tap through. It is a demo, so nothing you order is cooked.</p>
            </div>
            <a href={LIVE_DEMO_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-lime-400 px-7 py-3.5 font-semibold text-black transition hover:bg-lime-300">Open the demo <ArrowUpRight className="h-4 w-4" /></a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

const GULABI = [
  { t: "Ranked by real guests", x: "The top three places in each category get a gold, silver and bronze crown, based on what guests have rated." },
  { t: "Featured offers", x: "Show an offer to guests who are nearby, right where they are choosing where to go." },
  { t: "Nearby, by distance", x: "Guests see places within 10 km of them, so the guide stays useful and local." },
];

export function GulabiNagri() {
  return (
    <section id="gulabi" className="relative scroll-mt-20 overflow-hidden bg-gradient-to-b from-[#1f0d14] to-black px-5 py-24 text-white md:px-8 md:py-32">
      <div className="relative mx-auto grid max-w-[1280px] items-center gap-14 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="min-w-0">
          <Reveal>
            <p className="mb-5 inline-block rounded-full border border-rose-300/40 px-4 py-1.5 text-sm text-rose-200">Pilot in Jaipur</p>
            <h2 className="text-5xl leading-[0.95] md:text-7xl">Gulabi Nagri, a guest guide for the Pink City.</h2>
            <p className="mt-6 max-w-xl text-lg text-white/65">When a guest taps your plaque, they should not just leave. Gulabi Nagri shows them the best cafes, salons, gyms and more near them, ranked by what real guests say. Your business can be listed, featured with an offer, and found by people who are already close by.</p>
          </Reveal>
          <ul className="mt-10 grid gap-4 sm:grid-cols-3">
            {GULABI.map((g, i) => (
              <Reveal key={g.t} delay={i * 0.06}>
                <li className="h-full list-none rounded-[22px] border border-white/12 bg-white/[0.04] p-5">
                  <h3 className="text-xl">{g.t}</h3><p className="mt-2 text-sm text-white/60">{g.x}</p>
                </li>
              </Reveal>
            ))}
          </ul>
          <p className="mt-6 max-w-xl text-sm text-white/45">Gulabi Nagri is a pilot. We are bringing the first businesses on board in Jaipur, and we cannot promise a number of visits or sales.</p>
          <a href="#book" className="mt-8 inline-flex items-center gap-2 rounded-full bg-rose-200 px-8 py-4 font-semibold text-[#1f0d14] transition hover:bg-rose-100">Get listed: book a demo <ArrowUpRight className="h-4 w-4" /></a>
        </div>
        <Reveal delay={0.1}>
          <div className="flex min-w-0 items-start justify-center gap-4">
            <Phone src="/shots/gulabi-home.webp" alt="Gulabi Nagri home: top rated places in Jaipur and featured offers" className="w-[42vw] max-w-[220px]" />
            <Phone src="/shots/gulabi-place.webp" alt="A business page inside Gulabi Nagri with directions, offers and guest rating" className="mt-12 w-[42vw] max-w-[220px]" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
