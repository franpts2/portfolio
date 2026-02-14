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

	return (
		<button
			onClick={onChange}
			className={`flex items-center gap-3 text-left cursor-pointer hover:opacity-80 transition-opacity ${className}`}
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
