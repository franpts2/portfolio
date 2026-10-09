export interface Project {
	readonly slug: string;
	readonly title: string;
	readonly tagline: string;
	readonly description: string;
	readonly role: string;
	readonly year: number | null;
	readonly status: "shipped" | "building";
	readonly tech: readonly string[];
	readonly repo: string;
	readonly media: string;
	readonly mediaType: "image" | "video";
}

export const projects: readonly Project[] = [
	{
		slug: "junto",
		title: "junto.",
		tagline: "A social network built around what people read, watch and listen to",
		description:
			"Junto combines traditional social networking with media discovery. Users connect, share and discuss their favourite movies, books and music. I worked across the full stack: normalised PostgreSQL schema, Google OAuth, real-time messaging and AJAX feed updates.",
		role: "Full-stack, Schema design",
		year: 2025,
		status: "shipped",
		tech: ["Laravel", "PHP", "JavaScript", "Tailwind", "PostgreSQL", "Docker"],
		repo: "https://github.com/franpts2/junto.",
		media: "/images/projects/junto/video.mp4",
		mediaType: "video",
	},
	{
		slug: "artflow",
		title: "artflow",
		tagline: "A freelancing marketplace that puts human artists first",
		description:
			"Built as a response to AI-generated art, artflow is a platform that celebrates human creativity. Artists showcase services, connect with clients and keep control of pricing. I led frontend development and interface design.",
		role: "Frontend, Interface design",
		year: 2025,
		status: "shipped",
		tech: ["HTML", "CSS", "PHP", "JavaScript", "SQLite"],
		repo: "https://github.com/franpts2/artflow",
		media: "/images/projects/artflow/1.png",
		mediaType: "image",
	},
	{
		slug: "focusly",
		title: "focusly",
		tagline: "Every study tool a student actually needs, in one app",
		description:
			"Focusly turns studying into a smoother experience: personalised quizzes, flashcards, a Pomodoro timer and a peer forum. I built the mobile app in Flutter and designed the interface.",
		role: "Mobile, Interface design",
		year: 2025,
		status: "shipped",
		tech: ["Flutter", "Dart", "Firebase"],
		repo: "https://github.com/franpts2/focusly",
		media: "/images/projects/focusly/1.png",
		mediaType: "image",
	},
] as const;
