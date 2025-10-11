import React, { useContext } from "react";
import { Icon } from "@iconify/react";
import { icons } from "../assets/icons.js";
import { ThemeContext } from "./ThemeProvider.js";
import type { ThemeContextType } from "./ThemeProvider.js";

const ThemeSwitcher = () => {
	const { isDark, toggleTheme } = useContext<ThemeContextType>(ThemeContext);

	return (
		<div
			className="cursor-pointer mx-1 text-primary"
			onClick={toggleTheme}
		>
			{isDark ? (
				<Icon icon={icons.light.outline} height={24} />
			) : (
				<Icon icon={icons.dark.outline} height={24} />
			)}
		</div>
	);
};

export default ThemeSwitcher;
