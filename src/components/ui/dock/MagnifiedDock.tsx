import React from "react";
import { motion, useMotionValue } from "framer-motion";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import DockIcon from "./DockIcon.tsx";
import type { DockItemData } from "./DockIcon.tsx";

function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

interface MagnifiedDockProps {
	data: DockItemData[];
}

const MagnifiedDock: React.FC<MagnifiedDockProps> = ({
   data,
}) => {
	const mouseX = useMotionValue(Infinity);

	return (
		<div className="flex min-h-75 w-full items-center justify-center p-8">
			<motion.div
				onMouseMove={(e) => mouseX.set(e.pageX)}
				onMouseLeave={() => mouseX.set(Infinity)}
				className={cn(
					"flex items-end gap-4",
					"h-18",
					"px-4 pb-3", 
					"rounded-3xl",
					"bg-neutral-900/95 border border-white/5 shadow-2xl backdrop-blur-[2px]",
				)}
			>
				{data.map((item) => (
					<DockIcon key={item.id} mouseX={mouseX} item={item} />
				))}
			</motion.div>
		</div>
	);
}

export default MagnifiedDock;
