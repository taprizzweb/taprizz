import { forPublic, getContent } from "@/lib/content";
import { Navbar } from "@/components/Navbar";
import { CartDrawer } from "@/components/CartDrawer";
import { Hero } from "@/components/sections/Hero";
import { Advantages, BookMeeting, GulabiNetwork, Partners, Products } from "@/components/sections/Home";
import { OWNER_QA } from "@/lib/home-data";
import { Shop } from "@/components/sections/Shop";
import { Plans } from "@/components/sections/Plans";
import { Faq, Footer } from "@/components/sections/Footerish";

export const dynamic = "force-dynamic";

// One short page: who we work with, the two products, what you get, the Jaipur network, then book. The plaque shop and plans stay for the AI Review QR.
export default async function Home() {
  const c = forPublic(await getContent());
  return (
    <main>
      <Navbar brand={c.settings.brand} announcement={c.settings.announcement} />
      <CartDrawer />
      <Hero c={c} />
      <Partners />
      <Products />
      <Advantages />
      <GulabiNetwork />
      <BookMeeting c={c} />
      <Shop c={c} />
      <Plans c={c} />
      <Faq c={{ ...c, faq: [...OWNER_QA, ...c.faq.slice(0, 2)] }} />
      <Footer c={c} />
    </main>
  );
}
