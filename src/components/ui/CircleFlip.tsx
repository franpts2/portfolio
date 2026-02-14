import React, { useState, useEffect } from "react";
import { motion } from "motion/react";

interface CircleFlipProps {
	src: string;
	alt: string;
	fallbackSrc?: string;
}

const CircleFlip: React.FC<CircleFlipProps> = ({ src, alt, fallbackSrc }) => {
	const [imgSrc, setImgSrc] = useState(src);
	const [isError, setIsError] = useState(false);
	const [rotation, setRotation] = useState(0);
	const [isAnimating, setIsAnimating] = useState(false);
	const [shouldContinue, setShouldContinue] = useState(false);
	const [isHovering, setIsHovering] = useState(false);

	useEffect(() => {
		setImgSrc(src);
		setIsError(false);
	}, [src]);

	useEffect(() => {
		if (isError && fallbackSrc) {
			setImgSrc(fallbackSrc);
		}
	}, [fallbackSrc, isError]);

	const handleError = () => {
		if (fallbackSrc && imgSrc !== fallbackSrc) {
			setIsError(true);
			setImgSrc(fallbackSrc);
		}
	};

	const handleHoverStart = () => {
		setIsHovering(true);
		if (!isAnimating) {
			setIsAnimating(true);
			setShouldContinue(false);
			setRotation((prev) => prev + 180);
		} else {
			// if already animating, mark to continue for full 360
			setShouldContinue(true);
		}
	};

	const handleHoverEnd = () => {
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

	return (
		<div className="w-20 h-20 cursor-pointer" style={{ perspective: "1000px" }}>
			<motion.div
				className="relative w-full h-full"
				style={{ transformStyle: "preserve-3d" }}
				animate={{ rotateY: rotation }}
				onHoverStart={handleHoverStart}
				onHoverEnd={handleHoverEnd}
				onAnimationComplete={handleAnimationComplete}
				transition={{ duration: 0.5, ease: "easeInOut" }}
			>
				{/* front */}
				<div
					className="absolute inset-0 rounded-full overflow-hidden flex items-center justify-center"
					style={{
						backfaceVisibility: "hidden",
						WebkitBackfaceVisibility: "hidden",
						transform: "rotateY(0deg)",
					}}
				>
					<img
						src={imgSrc}
						alt={alt}
						className="w-full h-full object-cover"
						onError={handleError}
					/>
				</div>
				{/* back */}
				<div
					className="absolute inset-0 rounded-full border border-tertiary-bg bg-tertiary-bg flex items-center justify-center"
					style={{
						backfaceVisibility: "hidden",
						WebkitBackfaceVisibility: "hidden",
						transform: "rotateY(180deg)",
					}}
				>
					<p className="text-primary text-center text-xs px-2">{alt}</p>
				</div>
			</motion.div>
		</div>
	);
};

export default CircleFlip;
