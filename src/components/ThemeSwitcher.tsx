import React, { useContext } from "react";
import { Icon } from "@iconify/react";
import { motion, AnimatePresence } from "motion/react";
import { icons } from "../assets/icons.js";
import { ThemeContext } from "./ThemeProvider.js";
import type { ThemeContextType } from "./ThemeProvider.js";

const ThemeSwitcher = () => {
	const { isDark, toggleTheme } = useContext<ThemeContextType>(ThemeContext);

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === "Enter" || e.key === " ") {
			e.preventDefault();
			(e.currentTarget as HTMLButtonElement).blur();
			toggleTheme();
		}
	};

	return (
		<motion.button
			className="cursor-pointer mx-1 text-primary rounded"
			onClick={toggleTheme}
			onKeyDown={handleKeyDown}
			whileHover={{ scale: 1.15 }}
			whileTap={{ scale: 0.9, rotate: 360 }}
			transition={{ duration: 0.3 }}
			aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
		>
			<AnimatePresence mode="wait">
				{isDark ? (
					<motion.div
						key="light"
						initial={{ rotate: -180, opacity: 0 }}
						animate={{ rotate: 0, opacity: 1 }}
						exit={{ rotate: 180, opacity: 0 }}
						transition={{ duration: 0.4 }}
					>
						<Icon icon={icons.light.outline} height={24} />
					</motion.div>
				) : (
					<motion.div
						key="dark"
						initial={{ rotate: -180, opacity: 0 }}
						animate={{ rotate: 0, opacity: 1 }}
						exit={{ rotate: 180, opacity: 0 }}
						transition={{ duration: 0.4 }}
					>
						<Icon icon={icons.dark.outline} height={24} />
					</motion.div>
				)}
			</AnimatePresence>
		</motion.button>
	);
};

export default ThemeSwitcher;
