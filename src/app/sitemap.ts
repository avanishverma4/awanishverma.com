import type { MetadataRoute } from "next";
import { projects, siteUrl } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${siteUrl}/`, changeFrequency: "monthly", priority: 1 },
    ...projects.map((project) => ({ url: `${siteUrl}/work/${project.slug}`, changeFrequency: "yearly" as const, priority: 0.7 })),
  ];
}
