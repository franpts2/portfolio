import { Icon } from "@iconify/react";
import { Reveal } from "../Reveal.js";
import { ContactForm } from "../ContactForm.js";
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
				<div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
					<div className="lg:col-span-6">
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
							<div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4">
								{socials.map((social) => (
									<a
										key={social.label}
										href={social.href}
										target="_blank"
										rel="noopener noreferrer"
										className="group inline-flex items-center gap-2 text-sm font-medium text-(--color-ink-muted) hover:text-(--color-accent) transition-colors"
									>
										<Icon
											icon={
												socialIcons[social.label] ?? icons.arrowOutward.outline
											}
											height={social.label === "X" ? 14 : 18}
											className="text-(--color-ink-faint) group-hover:text-(--color-accent) transition-colors"
										/>
										{social.label}
									</a>
								))}
							</div>

							<a
								href={profile.cv}
								download
								className="mt-8 inline-flex items-center justify-center gap-2 px-5 py-3 bg-(--color-ink) text-(--color-bg) rounded-full font-medium text-sm hover:bg-(--color-accent) transition-colors"
							>
								<Icon icon={icons.download.outline} height={18} />
								Download CV
							</a>
						</Reveal>
					</div>

					<div className="lg:col-span-5 lg:col-start-8">
						<Reveal delay={0.2}>
							<h3 className="t-label mb-8">Send a message</h3>
							<ContactForm />
						</Reveal>
					</div>
				</div>
			</div>
		</section>
	);
}
