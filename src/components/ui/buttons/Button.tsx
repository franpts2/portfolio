import React from "react";
import { Icon } from "@iconify/react";

interface ButtonProps {
	text: string;
	icon?: string;
	iconHeight?: number;
	onClick?: () => void;
	variant?: "primary" | "sorter";
	isExpanded?: boolean;
	"aria-controls"?: string;
}

const Button: React.FC<ButtonProps> = ({
	text,
	icon,
	iconHeight = 20,
	onClick,
	variant = "primary",
	isExpanded = false,
	"aria-controls": ariaControls,
}) => {
	const baseClasses =
		"px-4 py-2 rounded-lg shadow-sm cursor-pointer flex flex-row gap-2 items-center focus:outline-none focus:ring-2 focus:ring-primary-accent focus:ring-offset-2";

	const variantClasses = {
		primary:
			"bg-tertiary-bg text-primary transition-transform duration-300 ease-in-out hover:scale-105",
		sorter:
			"bg-secondary-bg border border-primary-bg text-primary justify-between hover:bg-tertiary-bg transition-colors min-w-40",
	};

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === "Enter" || e.key === " ") {
			e.preventDefault();
			e.stopPropagation();
			onClick?.();
		}
	};

	return (
		<button
			onClick={onClick}
			onKeyDown={handleKeyDown}
			className={`${baseClasses} ${variantClasses[variant]}`}
			aria-label={text}
			aria-haspopup={variant === "sorter" ? "listbox" : undefined}
			aria-expanded={variant === "sorter" ? isExpanded : undefined}
			aria-controls={ariaControls}
			type="button"
		>
			<p className="text-sm whitespace-nowrap">{text}</p>
			{icon && <Icon icon={icon} height={iconHeight} />}
		</button>
	);
};

export default Button;
