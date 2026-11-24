import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/lib/cart";

const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata: Metadata = {
  title: "Taprizz | AI review plaques and a guest platform for Jaipur businesses",
  description:
    "Taprizz puts an AI Google review flow on a premium NFC plaque, with an optional guest platform for feedback, ordering, offers and a listing in Gulabi Nagri. Book a demo in Jaipur.",
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
