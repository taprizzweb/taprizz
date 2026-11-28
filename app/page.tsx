import { forPublic, getContent } from "@/lib/content";
import { Navbar } from "@/components/Navbar";
import { CartDrawer } from "@/components/CartDrawer";
import { Hero, Marquee } from "@/components/sections/Hero";
import { Advantages, BookMeeting, GulabiNetwork, Partners, Products } from "@/components/sections/Home";
import { OWNER_QA, SCROLL_TEXTS } from "@/lib/home-data";
import { Shop } from "@/components/sections/Shop";
import { Plans } from "@/components/sections/Plans";
import { Pricing } from "@/components/sections/Pricing";
import { Custom } from "@/components/sections/Custom";
import { Faq, Footer } from "@/components/sections/Footerish";
import { faqJsonLd, organizationJsonLd } from "@/lib/seo";

// The page is built once and refreshed every minute, or at once when Admin saves, so visitors get it instantly.
export const revalidate = 60;

// One short page: who we work with, the two products, what you get, the Jaipur network, then book. The plaque shop and plans stay for the AI Review QR.
export default async function Home() {
  const c = forPublic(await getContent());
  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd({ whatsapp: c.settings.whatsapp, instagram: c.footer.instagram })) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd([...OWNER_QA, ...c.faq])) }} />
      <Navbar brand={c.settings.brand} announcement={c.settings.announcement} shop={c.products.some((p) => p.active)} />
      <CartDrawer />
      <Hero c={c} />
      <Marquee items={SCROLL_TEXTS} />
      <Partners partners={c.partners} />
      <GulabiNetwork partners={c.partners} />
      <Products />
      <Pricing c={c} />
      <Advantages />
      <Custom whatsapp={c.settings.whatsapp} />
      <BookMeeting c={c} />
      <Shop c={c} />
      <Plans c={c} />
      <Faq c={{ ...c, faq: [...OWNER_QA, ...c.faq] }} />
      <Footer c={c} />
    </main>
  );
}
