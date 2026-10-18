import { useEffect } from "react";
import { MotionConfig } from "motion/react";
import { SkipLink } from "./components/ui/SkipLink.js";
import { SmoothScroll } from "./components/effects/SmoothScroll.js";
import { Header } from "./components/layout/Header.js";
import { HeroSection } from "./components/sections/hero/HeroSection.js";
import { AboutSection } from "./components/sections/about/AboutSection.js";
import { WorkSection } from "./components/sections/work/WorkSection.js";
import { ExperienceSection } from "./components/sections/experience/ExperienceSection.js";
import { BeyondTheCodeSection } from "./components/sections/beyond-the-code/BeyondTheCodeSection.js";
import { ContactSection } from "./components/sections/contact/ContactSection.js";
import { Footer } from "./components/layout/Footer.js";
import { ErrorBoundary } from "./components/error/ErrorBoundary.js";

export function App() {
	useEffect(() => {
		// The inline script in index.html does this as early as possible; kept here
		// as a fallback for browsers where the script could not run.
		if ("scrollRestoration" in history) {
			history.scrollRestoration = "manual";
		}

		// On refresh, ignore the section hash and land at the top of the page.
		// A normal (non-reload) visit to /#contact still scrolls to that section.
		const [entry] = performance.getEntriesByType(
			"navigation",
		) as PerformanceNavigationTiming[];
		if (entry?.type !== "reload") return;

		history.replaceState(null, "", location.pathname + location.search);
		// Jump, don't animate: `html` has `scroll-behavior: smooth`.
		window.scrollTo({ top: 0, behavior: "instant" });
	}, []);

	return (
		// Honor the OS "reduce motion" setting globally: Motion drops transform
		// and layout animation for those users while keeping opacity/color.
		<MotionConfig reducedMotion="user">
			<ErrorBoundary>
				<SmoothScroll>
					<SkipLink />
					<Header />
					<main id="main-content">
						<HeroSection />
						<AboutSection />
						<WorkSection />
						<ExperienceSection />
						<BeyondTheCodeSection />
						<ContactSection />
					</main>
					<Footer />
				</SmoothScroll>
			</ErrorBoundary>
		</MotionConfig>
	);
}
