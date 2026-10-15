import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { landings } from "@/lib/landing";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: `${SITE_URL}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    ...landings.map((l) => ({ url: `${SITE_URL}/${l.slug}`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.8 })),
    { url: `${SITE_URL}/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    { url: `${SITE_URL}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    { url: `${SITE_URL}/refund`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
  ];
}
