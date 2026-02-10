import React, { useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import projectsData from "../../data/projects.json" with { type: "json" };
import Button from "../ui/Button.tsx";
import { icons } from "../../assets/icons.ts";
import { Icon } from "@iconify/react";
import { ThemeContext } from "../ThemeProvider.tsx";
import Tag from "../ui/Tag.tsx";

function ProjectDetail() {
	const { projectId } = useParams();
	const navigate = useNavigate();
	const project = projectsData.find((p: { id: string }) => p.id === projectId);

	const { isDark } = useContext(ThemeContext);
	const iconTheme = isDark ? "dark" : "light";

	if (!project) return <div>Project not found</div>;

	return (
		<div className="project-detail relative min-h-screen flex flex-col items-center gap-10">
			<div className="w-4xl mt-10 flex flex-col gap-10">
				<div className="flex flex-col gap-4">
					<div className="flex flex-row justify-between">
						{/* back button */}
						<div
							onClick={() => navigate("/projects")}
							className="flex flex-row gap-2 cursor-pointer w-fit hover:text-secondary group"
						>
							<Icon
								icon={icons.arrowLeft.fill}
								height={24}
								className="transition-transform duration-300 ease-in-out group-hover:-translate-x-1"
							/>
							<p>Back to projects</p>
						</div>

						
                        <Button
							text="Check it out!"
							icon={icons.arrowOutward.fill}
							onClick={() => window.open(project.codeLink, "_blank")}
						/>
					</div>

					{/* header */}
					<div className="flex flex-row gap-30 w-4xl justify-between items-end">
						<div className="flex flex-row gap-3 items-end text-primary-accent cursor-default">
							<h1 className="text-6xl font-black">{project.title}</h1>
							<h2 className="text-3xl font-light">{project.description}</h2>
						</div>

						<div className="flex flex-row gap-2">
							<Tag text="university" />
							<Tag text="collaborative" />
						</div>
					</div>
				</div>

				{/* gallery */}
				<div className="w-auto h-130 bg-secondary-accent rounded-4xl"></div>

				<p>{project.longDescription}</p>

				<div className="flex flex-row justify-between">
					{/* tech */}
					<div className="flex flex-col gap-2">
						<h3 className="text-primary-accent font-bold text-lg">Tech</h3>
						<div className="flex flex-row gap-3">
							{project.tech.map((t, index) => (
								<img
									key={index}
									src={`https://skillicons.dev/icons?i=${t}&theme=${iconTheme}`}
									alt={t}
									width="60"
									height="60"
								/>
							))}
						</div>
					</div>

					{/* team */}
					<div className="flex flex-col gap-2">
						<h3 className="text-primary-accent font-bold text-lg">
							Development Team
						</h3>
						<div className="flex flex-row gap-3">
							{project.tech.map((t, index) => (
								<img
									key={index}
									src={`https://skillicons.dev/icons?i=${t}&theme=${iconTheme}`}
									alt={t}
									width="60"
									height="60"
								/>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default ProjectDetail;
