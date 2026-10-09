import { Icon } from "@iconify/react";
import { Reveal } from "../Reveal.js";
import { profile, socials } from "../../data/profile.js";
import { icons } from "../../assets/icons.js";

const socialIcons: Record<string, string> = {
	GitHub: icons.github.outline,
	LinkedIn: icons.linkedin.outline,
	X: icons.x.outline,
};

export function ContactSection() {
	return (
		<section
			id="contact"
			className="section"
			aria-labelledby="contact-heading"
		>
			<div className="container-main">
				<div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
					<div className="lg:col-span-7">
						<Reveal>
							<span className="t-label">Contact</span>
							<h2
								id="contact-heading"
								className="t-headline text-4xl sm:text-5xl mt-3 accent-dot"
							>
								Let&apos;s build something great
							</h2>
							<p className="t-body mt-6 max-w-lg text-balance">
								Always happy to chat about frontend engineering, product
								design, or the last great book you read.
							</p>
						</Reveal>

						<Reveal delay={0.15}>
							<div className="mt-10">
								<a
									href={`mailto:${profile.email}`}
									className="group inline-flex items-center gap-3 text-2xl sm:text-3xl font-display font-semibold text-(--color-ink) hover:text-(--color-accent) transition-colors break-all"
								>
									{profile.email}
									<Icon
										icon={icons.arrowOutward.outline}
										height={28}
										className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all"
									/>
								</a>
							</div>
						</Reveal>
					</div>

					<div className="lg:col-span-4 lg:col-start-9">
						<Reveal delay={0.2}>
							<div className="p-6 sm:p-8 bg-(--color-bg-soft) rounded-2xl">
								<h3 className="t-label mb-6">Elsewhere</h3>
								<ul className="flex flex-col gap-4">
									{socials.map((social) => (
										<li key={social.label}>
											<a
												href={social.href}
												target="_blank"
												rel="noopener noreferrer"
												className="group flex items-center justify-between py-2 border-b border-(--color-line) last:border-b-0 hover:text-(--color-accent) transition-colors"
											>
												<span className="flex items-center gap-3 font-medium text-(--color-ink)">
													<Icon
														icon={socialIcons[social.label] ?? icons.arrowOutward.outline}
														height={social.label === "X" ? 18 : 22}
														className="text-(--color-ink-faint) group-hover:text-(--color-accent) transition-colors"
													/>
													{social.label}
												</span>
												<span className="text-sm text-(--color-ink-muted)">
													{social.handle}
												</span>
											</a>
										</li>
									))}
									</ul>

								<a
									href={profile.cv}
									download
									className="mt-8 w-full inline-flex items-center justify-center gap-2 px-5 py-3 bg-(--color-ink) text-(--color-bg) rounded-full font-medium text-sm hover:bg-(--color-accent) transition-colors"
								>
									<Icon icon={icons.download.outline} height={18} />
									Download CV
								</a>
							</div>
						</Reveal>
					</div>
				</div>
			</div>
		</section>
	);
}
