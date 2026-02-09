import React, { useContext } from "react";
import { ThemeContext } from "./ThemeProvider.tsx";

type BadgeProps = {
	variant: "done" | "in progress";
};

const Badge: React.FC<BadgeProps> = ({ variant }) => {
	const { isDark } = useContext(ThemeContext);

	const lightStyles: Record<BadgeProps["variant"], string> = {
		done: "bg-purple-700 text-white",
		"in progress": "bg-green-700 text-white",
	};

	const darkStyles: Record<BadgeProps["variant"], string> = {
		done: "bg-purple-300 text-purple-700 border border-purple-700",
		"in progress": "bg-green-300 text-green-700 border border-green-700",
	};

	const variantClass = isDark ? darkStyles[variant] : lightStyles[variant];

	return (
		<div
			className={`inline-block px-3 py-1 rounded-full font-bold text-sm text-center opacity-50 ${variantClass}`}
		>
			{variant}
		</div>
	);
};

export default Badge;
