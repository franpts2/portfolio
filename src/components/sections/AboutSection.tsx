import { Icon } from "@iconify/react";
import { Reveal } from "../Reveal.js";
import { profile } from "../../data/profile.js";
import { icons } from "../../assets/icons.js";

export function AboutSection() {
	return (
		<section
			id="about"
			className="section"
			aria-labelledby="about-heading"
		>
			<div className="container-main">
				<div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
					<div className="lg:col-span-4">
						<Reveal>
							<span className="t-label">About</span>
							<h2
								id="about-heading"
								className="t-headline text-4xl sm:text-5xl mt-3 accent-dot"
							>
								Rigorous underneath, effortless on the surface
							</h2>
						</Reveal>
					</div>

					<div className="lg:col-span-8 lg:col-start-6">
						<div className="flex flex-col gap-6">
							{profile.bio.map((paragraph, idx) => (
								<Reveal key={idx} delay={idx * 0.1}>
									<p className="t-body text-balance">{paragraph}</p>
								</Reveal>
							))}
						</div>

						<Reveal delay={0.3}>
							<div className="mt-10 pt-8 hairline">
								<div className="flex flex-wrap items-end justify-between gap-6">
									<div>
										<span className="t-label block mb-4">Location</span>
										<p className="text-(--color-ink) font-medium">
											{profile.location}
										</p>
									</div>

									<a
										href={profile.cv}
										download
										className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-(--color-ink) text-(--color-bg) rounded-full font-medium text-sm hover:bg-(--color-accent) transition-colors"
									>
										<Icon icon={icons.download.outline} height={18} />
										Download CV
									</a>
								</div>
							</div>
						</Reveal>
					</div>
				</div>
			</div>
		</section>
	);
}
