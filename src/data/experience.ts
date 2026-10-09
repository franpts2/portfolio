export interface Role {
	readonly id: string;
	readonly title: string;
	readonly org: string;
	readonly location: string;
	readonly start: string;
	readonly end: string | null;
	readonly description: string | readonly string[];
	readonly kind: "work" | "community";
}

export const experience: readonly Role[] = [
	{
		id: "cloudflare",
		title: "Software Engineer Intern",
		org: "Cloudflare",
		location: "Lisbon",
		start: "2026-07",
		end: null,
		description: [
			"Built and shipped a feature-gated Workflows Timeline in the Cloudflare Dashboard with React, TypeScript, Kumo, and ECharts, visualizing live step timing, retries, waits, errors, and concurrency.",
			"Migrated the Workflows list to Kumo and fixed search and cache race conditions while preserving server-side search, pagination, metrics, sorting, and workflow actions.",
		],
		kind: "work",
	},
	{
		id: "niaefeup-pm-tts",
		title: "Project Manager – TTS",
		org: "NIAEFEUP",
		location: "Porto",
		start: "2026-05",
		end: null,
		description: [
			"Lead development and continuous improvement of Time Table Selector, a React app streamlining class exchanges and academic schedule planning for university students.",
			"Progressed from Recruit (Nov 2025 – Mar 2026) to Member (Mar – May 2026), contributing to uni with Flutter and NIAEFEUP's new website with Svelte.",
		],
		kind: "work",
	},
	{
		id: "robotair",
		title: "Frontend Summer Intern",
		org: "Robotair",
		location: "Porto",
		start: "2025-07",
		end: "2025-08",
		description: [
			"Played a central role in the UI/UX redesign of the company's web app, modernizing Robots, Pipelines, and Secrets with React and Tailwind CSS.",
			"Implemented Rigel testing, optional ROS deployments, unit-testing configuration, and critical bug fixes for a production product used by real clients.",
		],
		kind: "work",
	},
	{
		id: "mentoria-up",
		title: "Mentor",
		org: "Mentoria UP",
		location: "Porto",
		start: "2025-09",
		end: null,
		description:
			"Guiding first-year students through academic and social integration at the university.",
		kind: "community",
	},
	{
		id: "vou",
		title: "Volunteer Staff",
		org: "VO.U. — Pelos Animais",
		location: "Porto",
		start: "2024-09",
		end: null,
		description:
			"Animal care and welfare work, plus helping run events that raise awareness and find homes.",
		kind: "community",
	},
] as const;
