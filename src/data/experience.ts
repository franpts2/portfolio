export interface Role {
	readonly id: string;
	readonly title: string;
	readonly org: string;
	readonly location: string;
	readonly start: string;
	readonly end: string | null;
	readonly description: string;
	readonly kind: "work" | "community";
}

export const experience: readonly Role[] = [
	{
		id: "niaefeup-pm-tts",
		title: "Project Manager, Time Table Selector",
		org: "NIAEFEUP",
		location: "Porto",
		start: "2026-05",
		end: null,
		description:
			"Coordinator for the Time Table Selector, the official FEUP platform for class exchanges and schedule planning. I set priorities, review contributions and push the scheduling experience forward in React.",
		kind: "work",
	},
	{
		id: "robotair",
		title: "Frontend Intern",
		org: "Robotair — INESC TEC",
		location: "Porto",
		start: "2025-07",
		end: "2025-09",
		description:
			"Led roughly 60% of a UI/UX redesign in React and Tailwind, modernising the Robots, Pipelines and Secrets modules. Shipped the Rigel testing system, optional ROS deployments and a configurable unit-testing interface.",
		kind: "work",
	},
	{
		id: "niaefeup-member",
		title: "Member",
		org: "NIAEFEUP",
		location: "Porto",
		start: "2026-03",
		end: "2026-05",
		description:
			"Contributed to open-source projects for the University of Porto: the uni mobile app in Flutter, the NIAEFEUP website in SvelteKit and Tailwind, and performance work on the Time Table Selector.",
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
