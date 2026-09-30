import type { MetadataRoute } from "next";
import { profile, ui } from "@/content/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: ui.meta.siteName,
    short_name: profile.name,
    description: ui.meta.description,
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#0a0a0a",
    theme_color: "#0a0a0a",
    lang: "en",
    categories: ["design", "portfolio", "productivity"],
    icons: [
      { src: "/icon.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  };
}
