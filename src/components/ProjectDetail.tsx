import { useParams } from "react-router-dom";
import projectsData from "../data/projects.json" with { type: "json" };
import Button from "./Button.tsx";

function ProjectDetail() {
	const { projectId } = useParams();
	const project = projectsData.find((p: { id: string }) => p.id === projectId);

	if (!project) return <div>Project not found</div>;

	return (
		<div className="project-detail relative min-h-screen flex flex-col items-center gap-10">
			<div className="flex flex-row gap-30 mt-10 w-4xl justify-between items-end">
				<div className="flex flex-row gap-3 items-end text-primary-accent ">
					<h1 className="text-6xl font-black">
						{project.title}
					</h1>
					<h2 className="text-3xl font-light">{project.description}</h2>
				</div>

				<Button />
			</div>
		</div>
	);
}

export default ProjectDetail;
