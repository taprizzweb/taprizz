import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/lib/cart";

const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata: Metadata = {
  title: "Taprizz | Google Review QR & NFC Plates for Cafes in Jaipur",
  description:
    "More honest Google reviews with NFC and QR plates and AI-written reviews from your guests' own choices. Mini link, SEO and GEO setup for Jaipur cafes and restaurants.",
  keywords: [
    "Google review QR code", "NFC review plate", "NFC QR review stand", "AI review generator for cafes", "get more Google reviews for cafe",
    "Google review stand India", "review QR plate Jaipur", "NFC review plate Jaipur", "cafe marketing Jaipur", "restaurant marketing Jaipur",
    "local SEO Jaipur", "SEO for cafes Jaipur", "GEO optimization for restaurants", "QR menu Jaipur", "link in bio for cafes", "Instagram bio link for restaurants",
    "QR code se Google review", "cafe ke Google reviews badhaye", "Jaipur cafe reviews", "Taprizz",
  ],
  openGraph: {
    title: "Taprizz | Google Review QR & NFC Plates for Cafes in Jaipur",
    description: "NFC and QR review plates, AI-written reviews from your guests' own choices, a mini link for Instagram, and SEO and GEO setup for Jaipur businesses.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={outfit.variable}>
      <body className="font-sans antialiased">
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
