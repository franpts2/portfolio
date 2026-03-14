import React from "react";
import { Icon } from "@iconify/react";
import { icons } from "../../assets/icons.ts";

interface CheckboxProps {
	checked: boolean;
	onChange: () => void;
	label?: string;
	className?: string;
	variant?: "checkbox" | "radio";
}

const Checkbox: React.FC<CheckboxProps> = ({
	checked,
	onChange,
	label,
	className = "",
	variant = "checkbox",
}) => {
	const iconSet = variant === "radio" ? icons.radioButton : icons.checkbox;

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === "Enter" || e.key === " ") {
			e.preventDefault();
			(e.currentTarget as HTMLButtonElement).blur();
			onChange();
		}
	};

	return (
		<button
			onClick={onChange}
			onKeyDown={handleKeyDown}
			className={`flex items-center gap-3 text-left cursor-pointer hover:opacity-80 transition-opacity ${className}`}
			role={variant === "radio" ? "radio" : "checkbox"}
			aria-checked={checked}
			aria-label={label}
		>
			<Icon
				icon={checked ? iconSet.checked : iconSet.unchecked}
				height={20}
				className={
					checked ? "text-primary-accent" : "text-secondary opacity-40"
				}
			/>
			{label && (
				<span
					className={`text-sm ${checked ? "text-primary" : "text-primary opacity-70"}`}
				>
					{label}
				</span>
			)}
		</button>
	);
};

export default Checkbox;
