import React, { useContext } from "react";
import Badge from "../ui/Badge.tsx";
import { Icon } from "@iconify/react";
import { icons } from "../../assets/icons.ts";
import { ThemeContext } from "../ThemeProvider.tsx";
import { Link } from "react-router-dom";

type Project = {
	id: string;
	title: string;
	description: string;
	longDescription: string;
	tech: string[];
	tags: string[];
	team: string[];
	codeLink: string;
	isDone: boolean;
};

type ProjectCardProps = {
	project: Project;
};

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
	const { id, title, description, tech, tags, isDone } = project;
	const { isDark } = useContext(ThemeContext);
	const iconTheme = isDark ? "dark" : "light";
	const isCollab = tags.includes("collaborative");

	return (
		<Link to={`/projects/${id}`} className="project-card block h-full">
			<div className="bg-secondary-bg rounded-2xl p-8 flex flex-col w-full h-full gap-3 cursor-pointer shadow-lg transition-transform duration-300 ease-in-out hover:scale-105">
				{/* header */}
				<div className="flex flex-row justify-between items-center">
					<h1 className="text-2xl text-primary-accent">{title}</h1>
					<Badge variant={isDone ? "done" : "in progress"} />
				</div>

				{/* description */}
				<p className="text-left">{description}</p>

				{/* icons */}
				<div className="flex flex-row justify-between items-center mt-auto">
					<div className="flex flex-row gap-1">
						{tech.map((t, index) => (
							<img
								key={index}
								src={`https://skillicons.dev/icons?i=${t}&theme=${iconTheme}`}
								alt={t}
								width="24"
								height="24"
							/>
						))}
					</div>
					<Icon
						icon={isCollab ? icons.group.fill : icons.about.fill}
						height={24}
					/>
				</div>
			</div>
		</Link>
	);
};

export default ProjectCard;
