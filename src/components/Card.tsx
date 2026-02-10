import React, { useContext } from "react";
import Badge from "./Badge.tsx";
import { Icon } from "@iconify/react";
import { icons } from "../assets/icons.js";
import { ThemeContext } from "./ThemeProvider.tsx";
import { Link } from "react-router-dom";

type Project = {
	id: string;
	title: string;
	description: string;
	tech: string[];
	isDone: boolean;
	isCollab: boolean;
};

type CardProps = {
	project: Project;
};

const Card: React.FC<CardProps> = ({ project }) => {
	const { id, title, description, tech, isDone, isCollab } = project;
	const { isDark } = useContext(ThemeContext);
	const iconTheme = isDark ? "dark" : "light";
	return (
		<Link to={`/projects/${id}`} className="project-card">
			<div className="bg-secondary-bg rounded-2xl p-8 flex flex-col w-xs gap-3 cursor-pointer shadow-lg transition-transform duration-300 ease-in-out hover:scale-105">
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
								width="30"
								height="30"
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

export default Card;
