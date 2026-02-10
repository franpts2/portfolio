import React, { useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import projectsData from "../data/projects.json" with { type: "json" };
import Badge from "./Badge.tsx";
import { Icon } from "@iconify/react";
import { icons } from "../assets/icons.ts";
import { ThemeContext } from "./ThemeProvider.tsx";

const ProjectDetail = () => {
	const { projectId } = useParams<{ projectId: string }>();
	const navigate = useNavigate();
	const { isDark } = useContext(ThemeContext);
	const iconTheme = isDark ? "dark" : "light";

	const project = projectsData.find((p) => p.id === projectId);

	if (!project) {
		return (
			<div className="relative min-h-screen flex flex-col items-center justify-center gap-4">
				<h1 className="text-4xl text-primary-accent">Project Not Found</h1>
				<button
					onClick={() => navigate("/projects")}
					className="text-primary-accent hover:underline"
				>
					← Back to Projects
				</button>
			</div>
		);
	}

	return (
		<div className="relative min-h-screen flex flex-col items-center p-8">
			<div className="w-full max-w-4xl">
				{/* Back button */}
				<button
					onClick={() => navigate("/projects")}
					className="text-primary-accent hover:underline mb-8 flex items-center gap-2"
				>
					<Icon icon={icons.left.fill} height={20} />
					Back to Projects
				</button>

				{/* Project Header */}
				<div className="bg-secondary-bg rounded-2xl p-8 shadow-lg">
					<div className="flex flex-row justify-between items-start mb-6">
						<h1 className="font-black text-4xl text-primary-accent">
							{project.title}
						</h1>
						<Badge variant={project.isDone ? "done" : "in progress"} />
					</div>

					{/* Description */}
					<p className="text-lg mb-8">{project.description}</p>

					{/* Tech Stack */}
					<div className="mb-6">
						<h2 className="text-xl text-primary-accent mb-3 font-semibold">
							Tech Stack
						</h2>
						<div className="flex flex-row gap-3 flex-wrap">
							{project.tech.map((t, index) => (
								<div key={index} className="flex flex-col items-center gap-1">
									<img
										src={`https://skillicons.dev/icons?i=${t}&theme=${iconTheme}`}
										alt={t}
										width="48"
										height="48"
									/>
									<span className="text-sm capitalize">{t}</span>
								</div>
							))}
						</div>
					</div>

					{/* Collaboration Status */}
					<div className="flex items-center gap-2 text-lg">
						<Icon
							icon={project.isCollab ? icons.group.fill : icons.about.fill}
							height={24}
						/>
						<span>
							{project.isCollab ? "Collaborative Project" : "Solo Project"}
						</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProjectDetail;
