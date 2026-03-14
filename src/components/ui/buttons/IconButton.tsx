import React from "react";
import { Icon } from "@iconify/react";

interface IconButtonProps {
	icon: string;
	onClick: () => void;
	iconHeight?: number;
	hoverDirection?: "left" | "right" | "up" | "down";
	className?: string;
	variant?: "default" | "transparent" | "secondary" | "minimal";
}

const IconButton: React.FC<IconButtonProps> = ({
	icon,
	onClick,
	iconHeight = 24,
	hoverDirection,
	className = "",
	variant = "default",
}) => {
	const hoverAnimationClass = hoverDirection
		? {
				left: "group-hover:-translate-x-1",
				right: "group-hover:translate-x-1",
				up: "group-hover:-translate-y-1",
				down: "group-hover:translate-y-1",
			}[hoverDirection]
		: "";

	const baseClasses =
		variant === "transparent"
			? "hover:scale-110 transition-transform cursor-pointer rounded"
			: variant === "secondary"
				? "p-2 rounded-lg bg-secondary-bg border border-primary-bg shadow-sm hover:bg-tertiary-bg transition-colors cursor-pointer"
				: variant === "minimal"
					? "text-secondary hover:text-primary transition-colors cursor-pointer rounded"
					: "p-3 rounded-full bg-black text-white hover:bg-grey transition-colors group shadow-lg cursor-pointer";

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === "Enter" || e.key === " ") {
			e.preventDefault();
			(e.currentTarget as HTMLButtonElement).blur();
			onClick();
		}
	};

	return (
		<button
			onClick={onClick}
			onKeyDown={handleKeyDown}
			className={`${baseClasses} ${className}`}
			aria-label="Icon button"
		>
			<Icon
				icon={icon}
				height={iconHeight}
				className={`transition-transform duration-300 ease-in-out ${hoverAnimationClass}`}
			/>
		</button>
	);
};

export default IconButton;
