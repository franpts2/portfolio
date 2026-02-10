import React from "react";
import { Icon } from "@iconify/react";

interface IconButtonProps {
	icon: string;
	onClick: () => void;
	iconHeight?: number;
	hoverDirection?: "left" | "right" | "up" | "down";
	className?: string;
}

const IconButton: React.FC<IconButtonProps> = ({
	icon,
	onClick,
	iconHeight = 24,
	hoverDirection,
	className = "",
}) => {
	const hoverAnimationClass = hoverDirection
		? {
				left: "group-hover:-translate-x-1",
				right: "group-hover:translate-x-1",
				up: "group-hover:-translate-y-1",
				down: "group-hover:translate-y-1",
			}[hoverDirection]
		: "";

	return (
		<button
			onClick={onClick}
			className={`p-3 rounded-full bg-black text-white hover:bg-grey transition-colors group shadow-lg cursor-pointer ${className}`}
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
