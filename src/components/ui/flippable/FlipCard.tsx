import React, { useState, useEffect } from "react";
import type { ReactNode } from "react";
import { motion } from "motion/react";

interface FlipCardProps {
	frontContent: ReactNode;
	backContent: ReactNode;
	containerClassName?: string;
	innerContainerStyle?: React.CSSProperties;
	frontClassName?: string;
	backClassName?: string;
	duration?: number;
}

const FlipCard: React.FC<FlipCardProps> = ({
	frontContent,
	backContent,
	containerClassName = "w-20 h-20 cursor-pointer",
	innerContainerStyle = { perspective: "1000px" },
	frontClassName = "absolute inset-0 rounded-full overflow-hidden flex items-center justify-center",
	backClassName = "absolute inset-0 rounded-full border border-tertiary-bg bg-tertiary-bg flex items-center justify-center",
}) => {
	const [rotation, setRotation] = useState(0);
	const [isAnimating, setIsAnimating] = useState(false);
	const [shouldContinue, setShouldContinue] = useState(false);
	const [isHovering, setIsHovering] = useState(false);
	const [isInitialSpin, setIsInitialSpin] = useState(true);
	const [isMobile, setIsMobile] = useState(false);

	// detect if device is mobile on mount
	useEffect(() => {
		const checkMobile = () => {
			setIsMobile(
				window.innerWidth < 768 || window.matchMedia("(hover: none)").matches,
			);
		};
		checkMobile();
		window.addEventListener("resize", checkMobile);
		return () => window.removeEventListener("resize", checkMobile);
	}, []);

	// initial 360 spin on mount
	useEffect(() => {
		const timer = setTimeout(() => {
			setRotation(360);
		}, 800); // wait for ProjectDetail load animations to complete
		return () => clearTimeout(timer);
	}, []);

	const handleHoverStart = () => {
		if (isMobile) return; // disable hover on mobile
		setIsHovering(true);
		if (!isAnimating) {
			setIsAnimating(true);
			setShouldContinue(false);
			setRotation((prev) => prev + 180);
		} else {
			setShouldContinue(true);
		}
	};

	const handleHoverEnd = () => {
		if (isMobile) return; // disable hover on mobile
		setIsHovering(false);
		if (!isAnimating) {
			setIsAnimating(true);
			setShouldContinue(false);
			setRotation((prev) => prev + 180);
		} else {
			setShouldContinue(true);
		}
	};

	const handleAnimationComplete = () => {
		if (isInitialSpin) {
			setIsInitialSpin(false);
			return;
		}

		if (shouldContinue) {
			setShouldContinue(false);
			setRotation((prev) => prev + 180);
		} else {
			setIsAnimating(false);

			// normalize rotation to check if it's divisible by 360
			const normalizedRotation = rotation % 360;
			// only auto-flip to front if back is showing & user is not hovering
			if (normalizedRotation === 180 && !isHovering) {
				// back is facing front, flip one more time
				setTimeout(() => {
					setIsAnimating(true);
					setRotation((prev) => prev + 180);
				}, 100);
			}
		}
	};

	const handleClick = () => {
		if (isMobile && !isAnimating) {
			setIsAnimating(true);
			setShouldContinue(false);
			setRotation((prev) => prev + 180);
		}
	};

	return (
		<div className={containerClassName} style={innerContainerStyle}>
			<motion.div
				className="relative w-full h-full"
				style={{ transformStyle: "preserve-3d" }}
				initial={{ rotateY: 0 }}
				animate={{ rotateY: rotation }}
				onHoverStart={handleHoverStart}
				onHoverEnd={handleHoverEnd}
				onClick={handleClick}
				onAnimationComplete={handleAnimationComplete}
				transition={{
					duration: rotation === 360 ? 1 : 0.5,
					ease: "easeInOut",
				}}
			>
				{/* front */}
				<div
					className={frontClassName}
					style={{
						backfaceVisibility: "hidden",
						WebkitBackfaceVisibility: "hidden",
						transform: "rotateY(0deg)",
					}}
				>
					{frontContent}
				</div>
				{/* back */}
				<div
					className={backClassName}
					style={{
						backfaceVisibility: "hidden",
						WebkitBackfaceVisibility: "hidden",
						transform: "rotateY(180deg)",
					}}
				>
					{backContent}
				</div>
			</motion.div>
		</div>
	);
};

export default FlipCard;
