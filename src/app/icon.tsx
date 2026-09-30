import { ImageResponse } from "next/og";
import { ui } from "@/content/site";

// Monogram favicon matching the header mark (inverted fill). Literal colours: ImageResponse cannot read CSS variables.
export const size = { width: 512, height: 512 };
export const contentType = "image/png";

export function monogram(px: number) {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#171717", color: "#fff", borderRadius: px * 0.2, fontSize: px * 0.42, fontWeight: 600, letterSpacing: -px * 0.02 }}>
        {ui.header.monogram}
      </div>
    ),
    { width: px, height: px },
  );
}

export default function Icon() {
  return monogram(size.width);
}
