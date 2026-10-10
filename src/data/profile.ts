export const profile = {
	name: "Francisca Portugal",
	mark: "f.pt",
	role: "Frontend Engineer",
	location: "Porto, Portugal",
	email: "hello@franciscapt.dev",
	cv: "/CV.pdf",
	portrait: "/images/people/francisca-portugal.png",
	statement:
		"Francisca Portugal is a frontend engineer who builds interfaces that are rigorous underneath and effortless on the surface.",
	bio: [
		"I'm a frontend engineer who ventures into full-stack and mobile to build products that feel effortless. I thrive on interfaces that are technically rigorous under the hood, yet joyful and intuitive for the person using them.",
		"To me, code is a craft where logic meets creativity. I'm motivated to build high-caliber tools that are as profoundly important as they are a delight to interact with.",
	],
} as const;

export const socials = [
	{ label: "GitHub", handle: "franpts2", href: "https://github.com/franpts2" },
	{
		label: "LinkedIn",
		handle: "franciscaportugal",
		href: "https://linkedin.com/in/franciscaportugal",
	},
	{
		label: "X",
		handle: "franpts2",
		href: "https://x.com/franpts2",
	},
] as const;

export const stack = [
	{
		group: "Daily",
		items: ["React", "TypeScript", "Tailwind CSS", "Motion", "Vite", "Git"],
	},
	{
		group: "Also fluent",
		items: ["Svelte", "Flutter", "Dart", "Laravel", "PHP", "PostgreSQL", "Firebase", "Docker"],
	},
	{
		group: "Taught me how things work",
		items: ["C", "C++", "Java", "Python", "Haskell", "Prolog", "SQLite"],
	},
	{
		group: "Design",
		items: ["Figma", "Type", "Motion design", "Accessibility"],
	},
] as const;

export const mediaLoves = [
	{ medium: "Music", detail: "Always have a playlist running, from indie to soundtracks." },
	{ medium: "Books", detail: "Fiction, essays, and anything that sits in the to-be-read pile." },
	{ medium: "Movies", detail: "A good film is my favourite way to unwind." },
] as const;
