import React from "react";
import ProjectCard from "./ProjectCard.tsx";
import projectsData from "../data/projects.json" with { type: "json" };

const ProjectCardList = () => {
	return (
		<div className="flex flex-col gap-8 items-center">
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
				{projectsData.map((project) => (
					<ProjectCard key={project.id} project={project} />
				))}
			</div>
			<p className="text-secondary mb-4">& many more to come...</p>
		</div>
	);
};

export default ProjectCardList;
