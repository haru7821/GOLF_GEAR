import type { MetadataRoute } from "next";
import { BRANDS } from "@/data/brands";
import { siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: siteUrl, changeFrequency: "monthly", priority: 1 },
    { url: `${siteUrl}/brands`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteUrl}/lofts`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteUrl}/compare`, changeFrequency: "monthly", priority: 0.7 },
    ...BRANDS.map((b) => ({
      url: `${siteUrl}/brands/${b.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
