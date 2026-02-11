import React, { useContext, useRef, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import projectsData from "../../data/projects.json" with { type: "json" };
import Button from "../ui/Button.tsx";
import { icons } from "../../assets/icons.ts";
import { Icon } from "@iconify/react";
import { ThemeContext } from "../ThemeProvider.tsx";
import Tag from "../ui/Tag.tsx";
import CircleFlip from "../ui/CircleFlip.tsx";
import Gallery from "./Gallery.tsx";

function ProjectDetail() {
	const { projectId } = useParams<{ projectId: string }>();
	const navigate = useNavigate();
	const project = projectsData.find((p: { id: string }) => p.id === projectId);

	const { isDark } = useContext(ThemeContext);
	const iconTheme = isDark ? "dark" : "light";

	const titleRef = useRef<HTMLHeadingElement>(null);
	const descRef = useRef<HTMLHeadingElement>(null);
	const [useColumnLayout, setUseColumnLayout] = useState(false);

	if (!project || !projectId) return <div>Project not found</div>;

	useEffect(() => {
		const checkTextWrapping = () => {
			if (!titleRef.current || !descRef.current) return;

			// computed styles and line heights
			const titleStyle = window.getComputedStyle(titleRef.current);
			const descStyle = window.getComputedStyle(descRef.current);

			const titleLineHeight = parseFloat(titleStyle.lineHeight);
			const descLineHeight = parseFloat(descStyle.lineHeight);

			// check if actual height is greater than single line height (with some tolerance)
			const titleWrapped =
				titleRef.current.offsetHeight > titleLineHeight * 1.1;
			const descWrapped = descRef.current.offsetHeight > descLineHeight * 1.1;

			setUseColumnLayout(titleWrapped || descWrapped);
		};

		// check after component mounts and on resize
		checkTextWrapping();
		window.addEventListener("resize", checkTextWrapping);

		return () => window.removeEventListener("resize", checkTextWrapping);
	}, [project?.title, project?.description]);

	const normalizeName = (name: string) => {
		return name
			.toLowerCase()
			.normalize("NFD")
			.replace(/[\u0300-\u036f]/g, "")
			.replace(/ç/g, "c")
			.replace(/\s+/g, "-");
	};

	return (
		<div className="project-detail relative min-h-screen flex flex-col items-center gap-10">
			<div className="w-4xl mt-10 mb-10 flex flex-col gap-10">
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
					<div className="flex flex-row w-4xl justify-between items-end">
						<div
							className={`flex gap-3 text-primary-accent cursor-default ${useColumnLayout ? "flex-col items-start" : "flex-row items-end"}`}
						>
							<h1 ref={titleRef} className="text-6xl font-black">
								{project.title}
							</h1>
							<h2 ref={descRef} className="text-3xl font-light">
								{project.description}
							</h2>
						</div>

						<div className="flex flex-row gap-2">
							{project.tags.map((tag, index) => (
								<Tag key={index} text={tag} />
							))}
						</div>
					</div>
				</div>

				{/* gallery */}
				<Gallery projectId={projectId} />

				<p>{project.longDescription}</p>

				<div className="flex flex-row justify-between">
					{/* tech */}
					<div className="flex flex-col gap-2">
						<h3 className="text-primary-accent font-bold text-lg">
							Tech Stack
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

					{/* team */}
					<div className="flex flex-col gap-2">
						<h3 className="text-primary-accent font-bold text-lg">
							Development Team
						</h3>
						<div className="flex flex-row gap-3">
							{project.team.map((t, index) => (
								<CircleFlip
									key={index}
									src={`/images/people/${normalizeName(t)}.png`}
									alt={t}
									fallbackSrc={`/images/people/default-${isDark ? "dark" : "light"}.png`}
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
