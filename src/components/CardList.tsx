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
