import React, { useContext } from "react";
import { ThemeContext } from "../components/ThemeProvider.tsx";

const HomePage = () => {
	return (
		<div className="relative min-h-screen flex items-center">
			<div className="mx-auto text-center max-w-3xl relative">
				{(() => {
					const { isDark } = useContext(ThemeContext);
					const src = isDark ? "/night-colored-me.png" : "/sand-colored-me.png";
					return (
						<img
							src={src}
							alt="Francisca Portugal"
							className="pointer-events-none select-none absolute"
							style={{
								width: 600,
								right: -290,
								bottom: -65,
								transform: "rotate(-15deg)",
							}}
						/>
					);
				})()}
				<h1 className="text-7xl font-black font-family-heading text-primary-accent relative inline-block pointer-events-none select-none">
					Francisca Portugal
				</h1>

				<p className="mt-4 text-2xl md:text-3xl font-family-body text-primary pointer-events-none select-none">
					Building beautiful experiences on the web.
				</p>
			</div>
		</div>
	);
};

export default HomePage;
