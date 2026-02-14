import React from "react";
import ProjectCard from "./ProjectCard.tsx";
import projectsData from "../../data/projects.json" with { type: "json" };

interface ProjectCardListProps {
	filters?: {
		status: "all" | "done" | "in-progress";
		tags: string[];
		tech: string[];
	};
	sortBy: "date" | "name" | "relevance";
	sortOrder: "asc" | "desc";
}

const ProjectCardList: React.FC<ProjectCardListProps> = ({
	filters,
	sortBy,
	sortOrder,
}) => {
	const filteredProjects = projectsData
		.map((project, index) => ({ ...project, originalIndex: index }))
		.filter((project) => {
			if (filters) {
				if (filters.status == "done" && !project.isDone) return false;
				if (filters.status === "in-progress" && project.isDone) return false;

				if (
					filters.tags.length > 0 &&
					!filters.tags.some((tag) => project.tags.includes(tag))
				) {
					return false;
				}

				if (
					filters.tech.length > 0 &&
					!filters.tech.some((lang) => project.tech.includes(lang))
				) {
					return false;
				}
			}
			return true;
		})
		.sort((a, b) => {
			let comparison = 0;

			if (sortBy === "date") {
				// projects without date are in-progress, treat as "now"
				const dateA = a.date ? new Date(a.date).getTime() : Date.now();
				const dateB = b.date ? new Date(b.date).getTime() : Date.now();
				comparison = dateA - dateB;
			} else if (sortBy === "name") {
				// sort alphabetically by title
				comparison = a.title.localeCompare(b.title);
			} else if (sortBy === "relevance") {
				// maintain JSON order using original index
				comparison = a.originalIndex - b.originalIndex;
			}

			// apply sort order
			return sortOrder === "asc" ? comparison : -comparison;
		});

	return (
		<div className="flex flex-col gap-8 items-center">
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
				{filteredProjects.map((project) => (
					<ProjectCard key={project.id} project={project} />
				))}
			</div>
			{filteredProjects.length === 0 && (
				<p className="text-secondary mb-4">No projects match the filters</p>
			)}
			{filteredProjects.length > 0 && (
				<p className="text-secondary mb-4">& many more to come...</p>
			)}
		</div>
	);
};

export default ProjectCardList;
