import Link from "next/link";
import type { ComponentProps } from "react";

// A link to a section of the home page (href is "#id").
// On the home page it is a plain anchor, so the browser scrolls there smoothly and it works
// without JavaScript. From any other page it is a route link to "/#id".
export function SectionLink({ home, href, ...props }: { home: boolean; href: string } & Omit<ComponentProps<"a">, "href">) {
  return home ? <a href={href} {...props} /> : <Link href={`/${href}`} {...props} />;
}
