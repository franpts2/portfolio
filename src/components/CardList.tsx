import React from "react";
import Card from "./Card.tsx";

const projects = [
	{
		title: "focusly",
		description: "All-in-one study app",
		tech: ["flutter", "dart", "firebase"],
		isDone: true,
		isCollab: true,
	},
	{
		title: "junto.",
		description: "Social platform for sharing music, films, and books",
		tech: ["laravel", "php", "js", "tailwind", "postgres" ],
		isDone: true,
		isCollab: true,
	},
	{
		title: "artflow",
		description: "Freelancing website dedicated to artists ",
		tech: ["html", "css", "php", "js", "sqlite"],
		isDone: true,
		isCollab: true,
	},
	{
		title: "portfolio",
		description: "This personal portfolio website!",
		tech: ["react", "tailwind", "ts"],
		isDone: false,
		isCollab: false,
	},
	{
		title: "tix",
		description: "Social media platform for concert tracking and stats",
		tech: ["react", "tailwind", "js"],
		isDone: false,
		isCollab: false,
	},
	{
		title: "space wars",
		description: "A simple Space Invaders Java game using Lanterna.",
		tech: ["java"],
		isDone: true,
		isCollab: true,
	},
	{
		title: "fernando oceano's quest",
		description:
			"2D adventure game with time-tracking, collectibles and sound.",
		tech: ["java"],
		isDone: true,
		isCollab: false,
	},
	{
		title: "whack-a-diglett",
		description: "Whack-a-Mole inspired game in Minix ",
		tech: ["c"],
		isDone: true,
		isCollab: true,
	},
	{
		title: "'24 olympics db",
		description: "2024 Olympics Database",
		tech: ["sqlite"],
		isDone: true,
		isCollab: true,
	},
	{
		title: "route planner",
		description: "Implementation of several route-planning algorithms",
		tech: ["cpp"],
		isDone: true,
		isCollab: true,
	},
	{
		title: "knaptruck",
		description:
			"Solver for a packing/knapsack-style problem using several algorithmic approaches",
		tech: ["cpp"],
		isDone: true,
		isCollab: true,
	},
	{
		title: "serial link",
		description: "Implementation of a serial-port-based file transfer protocol",
		tech: ["c"],
		isDone: true,
		isCollab: true,
	},
	{
		title: "netfetch",
		description: "Lab project implementing a file-download client in C",
		tech: ["c"],
		isDone: true,
		isCollab: true,
	},
	{
		title: "svgtopng",
		description: "Parser of simple SVG files, rendering them to PNG images",
		tech: ["cpp"],
		isDone: true,
		isCollab: true,
	},
    {
		title: "haskell & prolog exs and projects",
		description: "Collection of exs and projects made in prolog and haskell",
		tech: ["haskell"],
		isDone: true,
		isCollab: true,
	},
];

const CardList = () => {
	return (
		<div className="flex flex-col gap-8 items-center">
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
				{projects.map((project, index) => (
					<Card
						key={index}
						title={project.title}
						description={project.description}
						tech={project.tech}
						isDone={project.isDone}
						isCollab={project.isCollab}
					/>
				))}
			</div>
			<p className="text-secondary mb-4">& many more to come...</p>
		</div>
	);
};

export default CardList;
