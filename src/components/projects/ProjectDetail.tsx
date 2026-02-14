import React, { useContext, useRef, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import projectsData from "../../data/projects.json" with { type: "json" };
import Button from "../ui/Button.tsx";
import { icons } from "../../assets/icons.ts";
import { Icon } from "@iconify/react";
import { ThemeContext } from "../ThemeProvider.tsx";
import Tag from "../ui/Tag.tsx";
import CircleFlip from "../ui/CircleFlip.tsx";
import Gallery from "./Gallery.tsx";
import { slugify } from "../../utils/format.ts";

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

	return (
		<div className="project-detail relative min-h-screen flex flex-col items-center gap-6 sm:gap-8 md:gap-10 px-4 sm:px-6 md:px-8">
			<div className="w-full max-w-4xl mt-14 sm:mt-8 md:mt-14 mb-6 sm:mb-8 md:mb-10 flex flex-col gap-6 sm:gap-8 md:gap-10">
				<div className="flex flex-col gap-4">
					<motion.div
						className="flex flex-row justify-between items-center gap-2"
						initial={{ opacity: 0, y: -20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
					>
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
							<p className="text-sm sm:text-base">Back to projects</p>
						</div>

						<Button
							text="Check it out!"
							icon={icons.arrowOutward.fill}
							onClick={() => window.open(project.codeLink, "_blank")}
						/>
					</motion.div>

					{/* header */}
					<motion.div
						className="flex flex-col lg:flex-row w-full justify-between items-start lg:items-end gap-4"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.1 }}
					>
						<div
							className={`flex gap-2 sm:gap-3 text-primary-accent cursor-default ${useColumnLayout ? "flex-col items-start" : "flex-col sm:flex-row items-start sm:items-end"}`}
						>
							<h1
								ref={titleRef}
								className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black"
							>
								{project.title}
							</h1>
							<h2
								ref={descRef}
								className="text-xl sm:text-2xl md:text-3xl font-light"
							>
								{project.description}
							</h2>
						</div>

						<div className="flex flex-row flex-wrap gap-2">
							{project.tags.map((tag, index) => (
								<Tag key={index} text={tag} />
							))}
						</div>
					</motion.div>
				</div>

				{/* gallery */}
				<motion.div
					initial={{ opacity: 0, scale: 0.95 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ duration: 0.6, delay: 0.2 }}
				>
					<Gallery projectId={projectId} />
				</motion.div>

				<motion.p
					className="text-sm sm:text-base leading-relaxed"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.3 }}
				>
					{project.longDescription}
				</motion.p>

				<motion.div
					className="flex flex-col lg:flex-row justify-between gap-8 lg:gap-4"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.4 }}
				>
					{/* tech */}
					<div className="flex flex-col gap-2">
						<h3 className="text-primary-accent font-bold text-base sm:text-lg">
							Tech Stack
						</h3>
						<div className="flex flex-row flex-wrap gap-2 sm:gap-3">
							{project.tech.map((t, index) => (
								<img
									key={index}
									src={`https://skillicons.dev/icons?i=${t}&theme=${iconTheme}`}
									alt={t}
									width="60"
									height="60"
									className="w-12 h-12 sm:w-14 sm:h-14 md:w-15 md:h-15"
								/>
							))}
						</div>
					</div>

					{/* team */}
					<div className="flex flex-col gap-2">
						<h3 className="text-primary-accent font-bold text-base sm:text-lg">
							Development Team
						</h3>
						<div className="flex flex-row flex-wrap gap-2 sm:gap-3">
							{project.team.map((t, index) => (
								<CircleFlip
									key={index}
									src={`/images/people/${slugify(t)}.png`}
									alt={t}
									fallbackSrc={`/images/people/default-${isDark ? "dark" : "light"}.png`}
								/>
							))}
						</div>
					</div>
				</motion.div>
			</div>
		</div>
	);
}

export default ProjectDetail;
