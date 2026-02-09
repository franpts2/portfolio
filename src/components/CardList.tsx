import React from "react";
import Card from "./Card.tsx";

const projects = [
	{ title: "focusly", description: "All-in-one study app", isDone: true, isCollab: true },
	{
		title: "junto.",
		description:
			"Social platform for sharing music, films, and books",
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
		description:
			"This personal portfolio website!",
        isDone: false,
		isCollab: false,
	},
];

const CardList = () => {
	return (
		<div className="flex flex-row gap-4">
			{projects.map((project) => (
				<Card
					title={project.title}
					description={project.description}
                    isDone={project.isDone}
					isCollab={project.isCollab}
				/>
			))}
		</div>
	);
};

export default CardList;
