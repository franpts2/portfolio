import { SkipLink } from "./components/SkipLink.js";
import { Header } from "./components/Header.js";
import { HeroSection } from "./components/sections/HeroSection.js";
import { AboutSection } from "./components/sections/AboutSection.js";
import { WorkSection } from "./components/sections/WorkSection.js";
import { ExperienceSection } from "./components/sections/ExperienceSection.js";
import { BeyondTheCodeSection } from "./components/sections/BeyondTheCodeSection.js";
import { ContactSection } from "./components/sections/ContactSection.js";
import { Footer } from "./components/Footer.js";
import ErrorBoundary from "./components/ErrorBoundary.js";

function App() {
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

export default App;
