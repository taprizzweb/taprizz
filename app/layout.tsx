import type { Metadata, Viewport } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/lib/cart";
import { SITE_URL } from "@/lib/site";

const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

const TITLE = "Taprizz — NFC Google Review Plaques for Cafes & Salons in Jaipur";
const DESC =
  "Taprizz NFC + QR review plaques turn happy guests into 5-star Google reviews with one tap. AI review page, 1-year warranty. Built for premium cafes, salons and venues in Jaipur.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: TITLE, template: "%s" },
  description: DESC,
  applicationName: "Taprizz",
  keywords: ["Google review plaque", "NFC review stand", "get more Google reviews", "QR code Google review", "review management Jaipur", "NFC review card", "Taprizz"],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "Taprizz",
    locale: "en_IN",
    url: "/",
    title: TITLE,
    description: DESC,
    images: [{ url: "/plaques/graphite.png", width: 1181, height: 1181, alt: "Taprizz NFC and QR Google review plaque" }],
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESC, images: ["/plaques/graphite.png"] },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
};

export const viewport: Viewport = { themeColor: "#000000", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={outfit.variable}>
      <body className="font-sans antialiased">
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
