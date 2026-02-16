import React, { useState, useEffect } from "react";
import { motion, useMotionValue, animate } from "framer-motion";
import TapePiece from "./TapePiece.tsx";

interface TapeFrameProps {
	imageSrc: string;
	altText?: string;
	className?: string;
}

const TapeFrame: React.FC<TapeFrameProps> = ({
	imageSrc,
	altText = "Framed image",
	className = "",
}) => {
	const [attachedTapes, setAttachedTapes] = useState([1, 2, 3, 4]);
	const [canDrag, setCanDrag] = useState(false);
	const [hasInteracted, setHasInteracted] = useState(false);

	// track X & Y of photo to calculate distance from the placeholder
	const x = useMotionValue(0);
	const y = useMotionValue(0);

	const isFalling = attachedTapes.length === 0;

	useEffect(() => {
		if (isFalling) {
			const dropDistance = window.innerHeight * 0.55;

			animate(y, dropDistance, {
				type: "spring",
				stiffness: 40,
				damping: 10,
				mass: 2,
				onComplete: () => setCanDrag(true),
			});
		}
	}, [isFalling, y]);

	// reset logic
	const checkReset = () => {
		const currentX = x.get();
		const currentY = y.get();

		// distance to the origin (0,0) using pythagorean theorem
		const distance = Math.sqrt(currentX ** 2 + currentY ** 2);

		// if within 150px of the center, snap back
		if (distance < 150) {
			setCanDrag(false);

			animate(x, 0, { type: "spring", stiffness: 200, damping: 20 });
			animate(y, 0, {
				type: "spring",
				stiffness: 200,
				damping: 20,
				onComplete: () => {
					setAttachedTapes([1, 2, 3, 4]);
					setHasInteracted(false);
				},
			});
		}
	};

	const handlePeel = (id: number) => {
		setAttachedTapes((prev) => prev.filter((t) => t !== id));
	};

	return (
		<div
			className={`relative inline-block ${className}`}
			style={{ perspective: "1000px" }}
		>
			{/* placeholder for the frame*/}
			<div className="rotate-1 select-none pointer-events-none p-4">
				<div className="relative flex items-center justify-center border-2 border-dashed border-secondary-accent rounded-sm">
					{/* invisible image to make box exact same size as the photo */}
					<img
						src={imageSrc}
						alt=""
						className="block max-w-full h-auto opacity-0 p-1"
					/>

					<p className="absolute text-secondary-accent font-bold text-xs uppercase tracking-widest">
						Photo goes here!
					</p>
				</div>
			</div>

			{/* scroll anchor */}
			{isFalling && (
				<div
					className="absolute top-0 left-0 w-px -z-10 pointer-events-none transition-all duration-500"
					style={{ height: window.innerHeight * 0.55 + 500 }}
				/>
			)}

			<motion.div
				style={{
					x,
					y,
					position: "absolute",
					top: 0,
					left: 0,
					width: "100%",
					zIndex: 50,
					touchAction: "none",
				}}
				drag={canDrag}
				dragConstraints={{ top: -2000, bottom: 2000, left: -2000, right: 2000 }}
				dragElastic={0.1}
				dragMomentum={false}
				onDragStart={() => setHasInteracted(true)}
				onDragEnd={() => {
					checkReset();
				}}
				whileDrag={{ cursor: "grabbing", scale: 1.05, zIndex: 9999 }}
				whileHover={canDrag ? { scale: 1.02 } : {}}
				className={`flex items-center justify-center ${canDrag ? "cursor-grab" : ""}`}
			>
				<motion.div
					animate={
						isFalling ? { rotate: 12, scale: 0.95 } : { rotate: 1, scale: 1 }
					}
					transition={{ type: "spring", stiffness: 40 }}
					className="relative bg-white p-4 shadow-xl"
				>
					<TapePiece
						id={1}
						isVisible={attachedTapes.includes(1)}
						onPeel={handlePeel}
						positionClass="-top-3 -left-8"
						rotation="-rotate-[25deg]"
					/>
					<TapePiece
						id={2}
						isVisible={attachedTapes.includes(2)}
						onPeel={handlePeel}
						positionClass="-top-4 -right-6"
						rotation="rotate-[15deg]"
					/>
					<TapePiece
						id={3}
						isVisible={attachedTapes.includes(3)}
						onPeel={handlePeel}
						positionClass="-bottom-3 -left-6"
						rotation="rotate-[10deg]"
					/>
					<TapePiece
						id={4}
						isVisible={attachedTapes.includes(4)}
						onPeel={handlePeel}
						positionClass="-bottom-4 -right-8"
						rotation="-rotate-[30deg]"
					/>

					<div className="overflow-hidden bg-gray-100 filter contrast-[1.05] sepia-[.1]">
						<img
							src={imageSrc}
							alt={altText}
							className="block max-w-full h-auto object-cover grayscale-[0.2] pointer-events-none select-none"
							draggable={false}
						/>
					</div>
				</motion.div>

				{/* secret message */}
				<motion.span
					initial={{ opacity: 0, x: -20 }}
					animate={
						isFalling && !hasInteracted
							? { opacity: 1, x: 0 }
							: { opacity: 0, x: -10 }
					}
					transition={{
						duration: 0.3,
						delay: isFalling && !canDrag ? 0.7 : 0,
					}}
					className="absolute left-full ml-6 text-secondary font-medium whitespace-nowrap pointer-events-none select-none"
				>
					Oops! Dropped me!
				</motion.span>
			</motion.div>
		</div>
	);
};

export default TapeFrame;
