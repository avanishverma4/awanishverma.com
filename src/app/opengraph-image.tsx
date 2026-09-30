import { ImageResponse } from "next/og";
import { profile, ui } from "@/content/site";

// Share image, generated at build time from the content file so the facts stay in sync.
// Colours are literal because ImageResponse cannot read CSS variables (values from the dark theme tokens).
export const alt = ui.meta.imageAlt;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", padding: 80, background: "#0a0a0a", color: "#ededed" }}>
        <div style={{ fontSize: 76, fontWeight: 600, letterSpacing: -3 }}>{profile.name}</div>
        <div style={{ marginTop: 12, fontSize: 36, color: "#a0a0a0" }}>{ui.hero.role}</div>
        <div style={{ marginTop: 40, fontSize: 32, maxWidth: 900 }}>{ui.hero.summary}</div>
        <div style={{ marginTop: 56, display: "flex", gap: 64 }}>
          {ui.hero.facts.map((fact) => (
            <div key={fact.label} style={{ display: "flex", flexDirection: "column", borderTop: "1px solid #2e2e2e", paddingTop: 16 }}>
              <div style={{ fontSize: 40, fontWeight: 600 }}>{fact.value}</div>
              <div style={{ fontSize: 24, color: "#a0a0a0" }}>{fact.label}</div>
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
