import { Icon } from "@iconify/react";
import { Reveal } from "../Reveal.js";
import { projects } from "../../data/projects.js";
import { icons } from "../../assets/icons.js";

const selectedSlugs = ["junto", "artflow", "focusly"] as const;

export function WorkSection() {
	const selected = selectedSlugs
		.map((slug) => projects.find((p) => p.slug === slug))
		.filter(Boolean);

	return (
		<section
			id="work"
			className="section"
			aria-labelledby="work-heading"
		>
			<div className="container-main">
				<Reveal className="mb-12">
					<span className="t-label">Selected Work</span>
					<h2
						id="work-heading"
						className="t-headline text-4xl sm:text-5xl mt-3 accent-dot"
					>
						Projects worth sharing
					</h2>
				</Reveal>

				<div className="flex flex-col">
					{selected.map((project, idx) =>
						project ? (
							<Reveal key={project.slug} delay={idx * 0.1}>
								<article className="group hairline first:border-t-0">
									<a
										href={project.repo}
										target="_blank"
										rel="noopener noreferrer"
										className="block py-8 sm:py-10"
										aria-label={`${project.title} — ${project.tagline}`}
									>
										<div className="grid sm:grid-cols-12 gap-4 sm:gap-8 items-start">
											<div className="sm:col-span-1">
												<span className="t-label">0{idx + 1}</span>
											</div>

											<div className="sm:col-span-5">
												<h3 className="font-display font-semibold text-2xl sm:text-3xl text-(--color-ink) group-hover:text-(--color-accent) transition-colors">
													{project.title}
												</h3>
												<p className="t-body mt-2 text-balance">
													{project.tagline}
												</p>
											</div>

											<div className="sm:col-span-5 sm:col-start-7">
										<span className="t-label block mb-1">Stack</span>
										<p className="text-sm text-(--color-ink-muted)">
											{project.tech.join(" · ")}
										</p>
									</div>

											<div className="sm:col-span-1 flex justify-end">
												<Icon
													icon={icons.arrowOutward.outline}
													height={24}
													className="text-(--color-ink-faint) group-hover:text-(--color-accent) transition-colors"
												/>
											</div>
										</div>
									</a>
								</article>
							</Reveal>
						) : null,
					)}
				</div>
			</div>
		</section>
	);
}
