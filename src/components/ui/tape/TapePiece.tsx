import React, { useContext } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ThemeContext } from "../../ThemeProvider.tsx";

interface TapePieceProps {
	id: number;
	isVisible: boolean;
	onPeel: (id: number) => void;
	positionClass: string;
	rotation: string;
}

const TapePiece: React.FC<TapePieceProps> = ({
	id,
	isVisible,
	onPeel,
	positionClass,
	rotation,
}) => {
	const { isDark } = useContext(ThemeContext);
	const tapeColor = isDark ? "#eee2c8" : "#d1bc91";

	return (
		<AnimatePresence>
			{isVisible && (
				<motion.div
					initial={{ opacity: 0.9 }}
					exit={{
						rotateX: 60,
						rotateZ: 15,
						y: -30,
						x: 10,
						opacity: 0,
						transition: { duration: 0.4, ease: "easeOut" },
					}}
					whileHover={{ scale: 1.05, filter: "brightness(1.1)" }}
					onClick={() => onPeel(id)}
					className={`absolute z-20 h-8 w-24 shadow-sm drop-shadow-md mix-blend-multiply cursor-pointer ${positionClass} ${rotation}`}
					style={{
						backgroundColor: tapeColor,
						transformOrigin: "center",
						clipPath:
							"polygon(0% 10%, 5% 0%, 95% 5%, 100% 0%, 100% 90%, 95% 100%, 5% 95%, 0% 100%)",
						backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px)`,
					}}
				/>
			)}
		</AnimatePresence>
	);
};

export default TapePiece;
