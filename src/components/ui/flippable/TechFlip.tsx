import React, { useState, useEffect } from "react";
import FlipCard from "./FlipCard.tsx";

interface TechFlipProps {
	src: string;
	alt: string;
	width?: string | number;
	height?: string | number;
	className?: string;
}

const TechFlip: React.FC<TechFlipProps> = ({
	src,
	alt,
	width = "60",
	height = "60",
	className = "w-12 h-12 sm:w-14 sm:h-14 md:w-15 md:h-15",
}) => {
	const [imgSrc, setImgSrc] = useState(src);
	const [isError, setIsError] = useState(false);

	useEffect(() => {
		setImgSrc(src);
		setIsError(false);
	}, [src]);

	const handleError = (e: React.SyntheticEvent<HTMLImageElement>) => {
		console.log("Image load error for:", alt);
		setIsError(true);
	};

	const frontContent = isError ? (
		<div className="w-full h-full border border-tertiary-bg bg-tertiary-bg flex items-center justify-center rounded-2xl">
			<p className="text-primary text-center font-bold">
				{alt.charAt(0).toUpperCase()}
			</p>
		</div>
	) : (
		<img
			src={imgSrc}
			alt={alt}
			width={width}
			height={height}
			className="w-full h-full object-contain"
			onError={handleError}
		/>
	);

	const backContent = (
		<p className="text-primary text-center text-xs px-2 font-semibold">{alt}</p>
	);

	return (
		<FlipCard
			frontContent={frontContent}
			backContent={backContent}
			containerClassName={className}
			frontClassName="absolute inset-0 flex items-center justify-center"
			backClassName="absolute inset-0 bg-tertiary-bg flex items-center justify-center rounded-2xl"
		/>
	);
};

export default TechFlip;
