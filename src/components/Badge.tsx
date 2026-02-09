import React from "react";

type BadgeProps = {
	variant: "done" | "in progress";
};

const variantStyles: Record<BadgeProps["variant"], string> = {
	done: "bg-purple-700 text-white",
	"in progress": "bg-green-700 text-white",
};

const Badge: React.FC<BadgeProps> = ({ variant }) => {
	return (
		<div
			className={`inline-block px-3 py-1 rounded-full font-bold text-sm text-center opacity-50 ${variantStyles[variant]}`}
		>
			{variant}
		</div>
	);
};

export default Badge;
