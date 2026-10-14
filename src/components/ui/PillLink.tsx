import type { AnchorHTMLAttributes, ReactNode } from "react";
import { Icon } from "@iconify/react";

interface PillLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
	readonly variant?: "primary" | "accent" | "outline";
	readonly icon?: string;
	readonly children: ReactNode;
}

const baseClass =
	"inline-flex items-center justify-center gap-2 rounded-full font-medium text-sm transition-colors";

const variantClass = {
	primary: "bg-(--color-ink) text-(--color-bg) hover:bg-(--color-accent)",
	accent: "bg-(--color-accent) text-white hover:bg-(--color-ink)",
	outline:
		"border border-(--color-line) text-(--color-ink) hover:border-(--color-accent) hover:text-(--color-accent)",
} as const;

export function PillLink({
	variant = "primary",
	icon,
	children,
	className,
	...props
}: PillLinkProps) {
	return (
		<a
			className={`${baseClass} ${variantClass[variant]} ${className ?? ""}`}
			{...props}
		>
			{children}
			{icon && <Icon icon={icon} height={16} />}
		</a>
	);
}
