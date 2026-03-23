import React, { useState, useEffect } from "react";
import FlipCard from "./FlipCard.tsx";

interface CircleFlipProps {
	src: string;
	alt: string;
	fallbackSrc?: string;
}

const CircleFlip: React.FC<CircleFlipProps> = ({ src, alt, fallbackSrc }) => {
	const [imgSrc, setImgSrc] = useState(src);
	const [isError, setIsError] = useState(false);

	// initial 360 spin on mount
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

	const frontContent = (
		<img
			src={imgSrc}
			alt={alt}
			className="w-full h-full object-cover"
			onError={handleError}
		/>
	);

	const backContent = (
		<p className="text-primary text-center text-[1rem] sm:text-xs px-2 wrap-break-word max-w-full">
			{alt}
		</p>
	);

	return (
		<FlipCard
			frontContent={frontContent}
			backContent={backContent}
			containerClassName="w-20 h-20 cursor-pointer"
			frontClassName="absolute inset-0 rounded-full overflow-hidden flex items-center justify-center"
			backClassName="absolute inset-0 rounded-full border border-tertiary-bg bg-tertiary-bg flex items-center justify-center"
		/>
	);
};

export default CircleFlip;
