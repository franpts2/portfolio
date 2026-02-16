import React from "react";
import { Icon } from "@iconify/react";

interface ButtonProps {
	text: string;
	icon?: string;
	iconHeight?: number;
	onClick?: () => void;
	variant?: "primary" | "sorter";
}

const Button: React.FC<ButtonProps> = ({
	text,
	icon,
	iconHeight = 20,
	onClick,
	variant = "primary",
}) => {
	const baseClasses =
		"px-4 py-2 rounded-lg shadow-sm cursor-pointer flex flex-row gap-2 items-center";

	const variantClasses = {
		primary:
			"bg-tertiary-bg text-primary transition-transform duration-300 ease-in-out hover:scale-105",
		sorter:
			"bg-secondary-bg border border-primary-bg text-primary justify-between hover:bg-tertiary-bg transition-colors min-w-40",
	};

	return (
		<div
			onClick={onClick}
			className={`${baseClasses} ${variantClasses[variant]}`}
		>
			<p className="text-sm whitespace-nowrap">{text}</p>
			{icon && (
				<Icon icon={icon} height={iconHeight}/>
			)}
		</div>
	);
};

export default Button;
