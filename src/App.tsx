import { SkipLink } from "./components/SkipLink.js";
import { Header } from "./components/Header.js";
import { HeroSection } from "./components/sections/HeroSection.js";
import { AboutSection } from "./components/sections/AboutSection.js";
import { WorkSection } from "./components/sections/WorkSection.js";
import { ExperienceSection } from "./components/sections/ExperienceSection.js";
import { PersonalitySection } from "./components/sections/PersonalitySection.js";
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
				<PersonalitySection />
				<ContactSection />
			</main>
			<Footer />
		</ErrorBoundary>
	);
}

export default App;
