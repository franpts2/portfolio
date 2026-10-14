import type { ButtonHTMLAttributes, ReactNode } from "react";
import { Icon } from "@iconify/react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	readonly variant?: "primary" | "accent" | "outline";
	readonly icon?: string;
	readonly children: ReactNode;
}

const baseClass =
	"inline-flex items-center justify-center gap-2 rounded-full font-medium text-sm transition-colors disabled:opacity-60 disabled:cursor-not-allowed";

const variantClass = {
	primary: "bg-(--color-ink) text-(--color-bg) hover:bg-(--color-accent)",
	accent: "bg-(--color-accent) text-white hover:bg-(--color-ink)",
	outline:
		"border border-(--color-line) text-(--color-ink) hover:border-(--color-accent) hover:text-(--color-accent)",
} as const;

export function Button({
	variant = "primary",
	icon,
	children,
	className,
	...props
}: ButtonProps) {
	return (
		<button
			type="button"
			className={`${baseClass} ${variantClass[variant]} ${className ?? ""}`}
			{...props}
		>
			{children}
			{icon && <Icon icon={icon} height={16} />}
		</button>
	);
}
