import { useParams, useNavigate } from "react-router-dom";
import projectsData from "../../data/projects.json" with { type: "json" };
import Button from "../Button.tsx";
import { icons } from "../../assets/icons.ts";
import { Icon } from "@iconify/react";

function ProjectDetail() {
	const { projectId } = useParams();
	const navigate = useNavigate();
	const project = projectsData.find((p: { id: string }) => p.id === projectId);

	if (!project) return <div>Project not found</div>;

	return (
		<div className="project-detail relative min-h-screen flex flex-col items-center gap-10">
			<div className="w-4xl mt-10 flex flex-col gap-4">
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

				{/* header */}
				<div className="flex flex-row gap-30 w-4xl justify-between items-end">
					<div className="flex flex-row gap-3 items-end text-primary-accent cursor-default">
						<h1 className="text-6xl font-black">{project.title}</h1>
						<h2 className="text-3xl font-light">{project.description}</h2>
					</div>

					<Button
						text="Check it out!"
						icon={icons.arrowOutward.fill}
						onClick={() => window.open(project.codeLink, "_blank")}
					/>
				</div>
			</div>
		</div>
	);
}

export default ProjectDetail;
