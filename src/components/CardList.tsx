import React from "react";
import Card from "./Card.tsx";

const projects = [
	{
		title: "focusly",
		description: "All-in-one study app",
		isDone: true,
		isCollab: true,
	},
	{
		title: "junto.",
		description: "Social platform for sharing music, films, and books",
		isDone: true,
		isCollab: true,
	},
	{
		title: "artflow",
		description: "Freelancing website dedicated to artists ",
		isDone: true,
		isCollab: true,
	},
	{
		title: "portfolio",
		description: "This personal portfolio website!",
		isDone: false,
		isCollab: false,
	},
    {
		title: "tix",
		description: "Social media platform for concert tracking and stats",
		isDone: false,
		isCollab: false,
	},
    {
		title: "space wars",
		description: "A simple Space Invaders Java game using Lanterna.",
		isDone: true,
		isCollab: true,
	},
    {
		title: "fernando oceano's quest",
		description: "2D adventure game with time-tracking, collectibles and sound.",
		isDone: true,
		isCollab: false,
	},
    {
		title: "whack-a-diglett",
		description: "Whack-a-Mole inspired game in Minix ",
		isDone: true,
		isCollab: true,
	},
    {
		title: "'24 olympics db",
		description: "2024 Olympics Database",
		isDone: true,
		isCollab: true,
	},
    {
		title: "route planner",
		description: "Implementation of several route-planning algorithms",
		isDone: true,
		isCollab: true,
	},
    {
		title: "knaptruck",
		description: "Solver for a packing/knapsack-style problem using several algorithmic approaches",
		isDone: true,
		isCollab: true,
	},
    {
		title: "seriallink",
		description: "Implementation of a serial-port-based file transfer protocol. ",
		isDone: true,
		isCollab: true,
	}, 
    {
		title: "netfetch",
		description: "Lab project implementing a file-download client in C",
		isDone: true,
		isCollab: true,
	}, 
    {
		title: "svgtopng",
		description: "Parser of simple SVG files, rendering them to PNG images",
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
