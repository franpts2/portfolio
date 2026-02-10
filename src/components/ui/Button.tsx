import React from "react";
import { Icon } from "@iconify/react";

interface ButtonProps {
	text: string;
	icon?: string;
	iconHeight?: number;
	onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ text, icon, iconHeight = 20, onClick }) => {
	return (
		<div
			onClick={onClick}
			className="bg-tertiary-bg text-primary px-4 py-2 rounded-lg shadow-sm cursor-pointer flex flex-row gap-2 items-center transition-transform duration-300 ease-in-out hover:scale-105"
		>
			<p>{text}</p>
			{icon && <Icon icon={icon} height={iconHeight} />}
		</div>
	);
};

export default Button;
