import React, { useContext, useState, useEffect } from "react";
import { ThemeContext } from "../components/ThemeProvider.js";
import { Icon } from "@iconify/react";
import { icons } from "../assets/icons.js";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";

const HomePage = () => {
	const { isDark } = useContext(ThemeContext);
	const src = isDark ? "/night-colored-me.png" : "/sand-colored-me.png";

	// Mouse tracking for image movement
	const mouseX = useMotionValue(0);
	const mouseY = useMotionValue(0);

	// Smooth spring animations for the position
	const x = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]), {
		stiffness: 150,
		damping: 20,
	});
	const y = useSpring(useTransform(mouseY, [-0.5, 0.5], [-15, 15]), {
		stiffness: 150,
		damping: 20,
	});

	// Track mouse position relative to the center
	const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
		const rect = e.currentTarget.getBoundingClientRect();
		const centerX = rect.left + rect.width / 2;
		const centerY = rect.top + rect.height / 2;

		mouseX.set((e.clientX - centerX) / rect.width);
		mouseY.set((e.clientY - centerY) / rect.height);
	};

	const handleMouseLeave = () => {
		mouseX.set(0);
		mouseY.set(0);
	};

	return (
		<div
			className="relative min-h-screen flex items-center px-4 sm:px-6"
			onMouseMove={handleMouseMove}
			onMouseLeave={handleMouseLeave}
		>
			<div className="mx-auto text-center max-w-3xl relative">
				<motion.img
					src={src}
					alt="Francisca Portugal"
					className="select-none absolute hidden sm:block"
					style={{
						width: 600,
						right: -290,
						bottom: -65,
						rotate: -15,
						x,
						y,
					}}
					initial={{ opacity: 0, scale: 0.8 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ duration: 0.8, ease: "easeOut" }}
					whileHover={{ scale: 1.1 }}
				/>

				<motion.h1
					className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black font-family-heading text-primary-accent relative inline-block z-20 pointer-events-none select-none"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.2 }}
				>
					Francisca Portugal
				</motion.h1>

				<motion.p
					className="mt-2 sm:mt-4 text-sm sm:text-base md:text-lg lg:text-2xl font-family-body text-primary pointer-events-none select-none"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.4 }}
				>
					Building beautiful experiences on the web.
				</motion.p>
			</div>

			<motion.div
				className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-4 sm:gap-6 justify-center text-primary"
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6, delay: 0.6 }}
			>
				<motion.a
					href="https://github.com/franpts2"
					target="_blank"
					rel="noopener noreferrer"
					whileHover={{ scale: 1.2, rotate: 5 }}
					whileTap={{ scale: 0.9 }}
					transition={{ duration: 0.2 }}
				>
					<Icon icon={icons.github.outline} height={30} />
				</motion.a>
				<motion.a
					href="https://linkedin.com/in/franciscaportugal"
					target="_blank"
					rel="noopener noreferrer"
					whileHover={{ scale: 1.2, rotate: 5 }}
					whileTap={{ scale: 0.9 }}
					transition={{ duration: 0.2 }}
				>
					<Icon icon={icons.linkedin.outline} height={30} />
				</motion.a>
				<motion.a
					href="https://instagram.com/francisca._.portugal19"
					target="_blank"
					rel="noopener noreferrer"
					whileHover={{ scale: 1.2, rotate: 5 }}
					whileTap={{ scale: 0.9 }}
					transition={{ duration: 0.2 }}
				>
					<Icon icon={icons.instagram.outline} height={30} />
				</motion.a>
			</motion.div>
		</div>
	);
};

export default HomePage;
