import React, { useContext } from "react";
import { motion, useMotionValue } from "framer-motion";
import DockIcon from "./DockIcon.tsx";
import type { DockItemData } from "./DockIcon.tsx";
import { ThemeContext } from "../../ThemeProvider.tsx";

interface MagnifiedDockProps {
	data: DockItemData[];
}

const MagnifiedDock: React.FC<MagnifiedDockProps> = ({ data }) => {
	const mouseX = useMotionValue(Infinity);
	const { isDark } = useContext(ThemeContext);
	const dockStyle = isDark
		? "bg-white/20 border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.8)]"
		: "bg-black/20 border border-white/20 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]";

	return (
		<div className="flex h-fit w-full items-center justify-center py-7 flex-col gap-1">
			<motion.div
				onMouseMove={(e) => mouseX.set(e.pageX)}
				onMouseLeave={() => mouseX.set(Infinity)}
				className={`flex items-end gap-4 h-18 px-4 pb-3 rounded-3xl backdrop-blur-xl ${dockStyle}`}
			>
				{data.map((item) => (
					<DockIcon key={item.id} mouseX={mouseX} item={item} />
				))}
			</motion.div>
			<p className="text-sm text-secondary font-medium mt-2">Tech Stack</p>
		</div>
	);
};

export default MagnifiedDock;
