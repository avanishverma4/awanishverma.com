import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseStudy } from "@/components/CaseStudy";
import { SiteFrame } from "@/components/SiteFrame";
import { profile, projects } from "@/content/site";

// One static page per project; any other slug is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};
  const title = `${project.title} — ${profile.name}`;
  const images = [{ url: project.cover.src, width: project.cover.width, height: project.cover.height, alt: project.cover.alt }];
  return {
    title,
    description: project.tagline,
    alternates: { canonical: `/work/${project.slug}` },
    openGraph: { type: "article", title, description: project.tagline, url: `/work/${project.slug}`, images },
    twitter: { card: "summary_large_image", title, description: project.tagline, images },
  };
}

export default async function WorkPage({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();
  return (
    <SiteFrame>
      <CaseStudy project={project} />
    </SiteFrame>
  );
}
