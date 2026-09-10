import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

// 정적 export(GitHub Pages)에서 파일로 떨어지도록 고정한다
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
