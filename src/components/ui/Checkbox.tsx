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
			className={`flex items-center gap-2 text-left hover:text-primary-accent transition-colors ${className}`}
		>
			<Icon
				icon={checked ? iconSet.checked : iconSet.unchecked}
				height={20}
				className="text-primary-accent"
			/>
			{label && <span className="text-sm">{label}</span>}
		</button>
	);
};

export default Checkbox;
