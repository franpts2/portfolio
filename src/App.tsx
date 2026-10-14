import { useEffect } from "react";
import { SkipLink } from "./components/ui/SkipLink.js";
import { Header } from "./components/layout/Header.js";
import { HeroSection } from "./components/sections/HeroSection.js";
import { AboutSection } from "./components/sections/AboutSection.js";
import { WorkSection } from "./components/sections/WorkSection.js";
import { ExperienceSection } from "./components/sections/ExperienceSection.js";
import { BeyondTheCodeSection } from "./components/sections/beyond-the-code/BeyondTheCodeSection.js";
import { ContactSection } from "./components/sections/ContactSection.js";
import { Footer } from "./components/layout/Footer.js";
import { ErrorBoundary } from "./components/error/ErrorBoundary.js";

export function App() {
	useEffect(() => {
		if ("scrollRestoration" in history) {
			history.scrollRestoration = "manual";
		}
		window.scrollTo(0, 0);
	}, []);

	return (
		<ErrorBoundary>
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
		</ErrorBoundary>
	);
}
