import React, { useContext, useRef } from "react";
import { motion, useSpring, useTransform, MotionValue } from "motion/react";
import { ThemeContext } from "../../ThemeProvider.tsx";

const BASE_WIDTH = 48; // base width of an icon (in px) when not hovered. (48px = w-12)
const MAX_WIDTH = 84; // max width of an icon (in px) when hovered
const DISTANCE_INFLUENCE = 150; // distance from the mouse where the effect starts applying

const SPRING_OPTIONS = {
	mass: 0.1,
	stiffness: 150,
	damping: 12,
};

export interface DockItemData {
	id: number;
	tool: string;
	label: string;
	site: string;
}

interface DockIconProps {
	mouseX: MotionValue;
	item: DockItemData;
}

const DockIcon: React.FC<DockIconProps> = ({ mouseX, item }) => {
	const ref = useRef<HTMLDivElement>(null);
	const { isDark } = useContext(ThemeContext);
	const iconTheme = isDark ? "dark" : "light";

	const distance = useTransform(mouseX, (val) => {
		const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
		return val - bounds.x - bounds.width / 2;
	});

	const widthSync = useTransform(
		distance,
		[-DISTANCE_INFLUENCE, 0, DISTANCE_INFLUENCE],
		[BASE_WIDTH, MAX_WIDTH, BASE_WIDTH],
	);

	const width = useSpring(widthSync, SPRING_OPTIONS);

	return (
		<motion.div
			ref={ref}
			style={{ width }}
			className="relative flex aspect-square items-center justify-center rounded-3xl shadow-inner cursor-pointer group hover:bg-neutral-700 transition-colors duration-200"
			onClick={() => window.open(item.site, "_blank")}
		>
			{/* tooltip Label */}
			<span className="absolute -top-10 left-1/2 -translate-x-1/2 rounded-md bg-neutral-900/90 px-2 py-1 text-sm text-neutral-200 opacity-0 transition-opacity group-hover:opacity-100 pointer-events-none whitespace-nowrap">
				{item.label}
			</span>

			{/* content */}
			<img
				src={`https://skillicons.dev/icons?i=${item.tool}&theme=${iconTheme}`}
				alt={item.label}
				className="h-full w-full object-cover"
				draggable={false}
			/>
		</motion.div>
	);
};

export default DockIcon;
