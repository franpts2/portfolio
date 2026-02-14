import React, { useContext } from "react";
import { ThemeContext } from "../components/ThemeProvider.js";
import { Icon } from "@iconify/react";
import { icons } from "../assets/icons.js";

const HomePage = () => {
	const { isDark } = useContext(ThemeContext);
	const src = isDark ? "/night-colored-me.png" : "/sand-colored-me.png";

	return (
		<div className="relative min-h-screen flex items-center px-4 sm:px-6">
			<div className="mx-auto text-center max-w-3xl relative">
				<img
					src={src}
					alt="Francisca Portugal"
					className="pointer-events-none select-none absolute hidden sm:block"
					style={{
						width: 600,
						right: -290,
						bottom: -65,
						transform: "rotate(-15deg)",
					}}
				/>

				<h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black font-family-heading text-primary-accent relative inline-block z-20 pointer-events-none select-none">
					Francisca Portugal
				</h1>

				<p className="mt-2 sm:mt-4 text-sm sm:text-base md:text-lg lg:text-2xl font-family-body text-primary pointer-events-none select-none">
					Building beautiful experiences on the web.
				</p>
			</div>

			<div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-4 sm:gap-6 justify-center text-primary">
				<a
					href="https://github.com/franpts2"
					target="_blank"
					rel="noopener noreferrer"
					className="transition-transform duration-200 ease-in-out hover:scale-110"
				>
					<Icon icon={icons.github.outline} height={30} />
				</a>
				<a
					href="https://linkedin.com/in/franciscaportugal"
					target="_blank"
					rel="noopener noreferrer"
					className="transition-transform duration-200 ease-in-out hover:scale-110"
				>
					<Icon icon={icons.linkedin.outline} height={30} />
				</a>
				<a
					href="https://instagram.com/francisca._.portugal19"
					target="_blank"
					rel="noopener noreferrer"
					className="transition-transform duration-200 ease-in-out hover:scale-110"
				>
					<Icon icon={icons.instagram.outline} height={30} />
				</a>
			</div>
		</div>
	);
};

export default HomePage;
