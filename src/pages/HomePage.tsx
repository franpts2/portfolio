import React, { useContext } from "react";
import { ThemeContext } from "../components/ThemeProvider.tsx";
import { Icon } from "@iconify/react";
import { icons } from "../assets/icons.ts";

const HomePage = () => {
	return (
		<>
			<div className="relative min-h-screen flex items-center">
				<div className="mx-auto text-center max-w-3xl relative">
					{(() => {
						const { isDark } = useContext(ThemeContext);
						const src = isDark
							? "/night-colored-me.png"
							: "/sand-colored-me.png";
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

                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-6 justify-center text-primary">
                    <a href="https://github.com/franpts2" target="_blank" rel="noopener noreferrer" className="hover:scale-120">
                        <Icon icon={icons.github.outline} height={30}/>
                    </a>
                    <a href="https://linkedin.com/in/franciscaportugal" target="_blank" rel="noopener noreferrer" className="hover:scale-120">
                        <Icon icon={icons.linkedin.outline} height={30} />
                    </a>
                    <a href="https://instagram.com/francisca._.portugal19" target="_blank" rel="noopener noreferrer" className="hover:scale-120">
                        <Icon icon={icons.instagram.outline} height={30} />
                    </a>
                </div>
			</div>
		</>
	);
};

export default HomePage;
