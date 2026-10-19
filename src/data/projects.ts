export interface Project {
  readonly slug: string;
  readonly title: string;
  readonly tagline: string;
  readonly description: string;
  readonly role: string;
  readonly year: number | null;
  readonly status: "shipped" | "building";
  readonly tech: readonly string[];
  readonly repo?: string;
  readonly demo?: string;
}

export const projects: readonly Project[] = [
  {
    slug: "junto",
    title: "junto.",
    tagline:
      "A social network built around what people read, watch and listen to",
    description:
      "Junto combines traditional social networking with media discovery. Users connect, share and discuss their favourite movies, books and music. I worked across the full stack: normalised PostgreSQL schema, Google OAuth, real-time messaging and AJAX feed updates.",
    role: "Full-stack, Schema design",
    year: 2025,
    status: "shipped",
    tech: ["Laravel", "PHP", "JavaScript", "Tailwind", "PostgreSQL", "Docker"],
    repo: "https://github.com/franpts2/junto.",
  },
  {
    slug: "cadence",
    title: "cadence",
    tagline: "A Spotify-connected music journal with a song for every day",
    description:
      "Cadence turns your listening into a calendar. Connect Spotify, pick one song per day and build an interactive record of your life through music. I designed and built the full-stack app: Spotify OAuth, a drag-and-drop calendar, playlist import and export, and song previews.",
    role: "Full-stack, Interface design",
    year: 2026,
    status: "shipped",
    tech: ["SvelteKit", "Svelte 5", "TypeScript", "Tailwind", "Cloudflare", "Turso", "Drizzle"],
    demo: "https://cadence.franciscapt.dev",
  },
  {
    slug: "portfolio",
    title: "this portfolio",
    tagline: "The site you're reading, built from scratch down to the motion",
    description:
      "Designed and built from scratch with React 19, TypeScript and Tailwind CSS v4. A custom design system, scroll-driven motion, a squishy portrait interaction and a contact form backed by Cloudflare Pages Functions — with accessibility and performance kept in view throughout.",
    role: "Design, Frontend",
    year: 2026,
    status: "shipped",
    tech: ["React", "TypeScript", "Tailwind", "Motion", "Vite", "Cloudflare"],
    repo: "https://github.com/franpts2/portfolio",
  },
] as const;
