import React, { useState, useEffect } from "react";

interface CircleFlipProps {
	src: string;
	alt: string;
	fallbackSrc?: string;
}

const CircleFlip: React.FC<CircleFlipProps> = ({ src, alt, fallbackSrc }) => {
	const [imgSrc, setImgSrc] = useState(src);
	const [isError, setIsError] = useState(false);

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

	return (
		<div className="w-20 h-20 perspective-1000 cursor-pointer group">
			<div className="relative w-full h-full transition-transform duration-500 transform-style-3d group-hover:rotate-y-180">
				{/* Front - Image */}
				<div className="absolute inset-0 rounded-full overflow-hidden backface-hidden flex items-center justify-center">
					<img
						src={imgSrc}
						alt={alt}
						className="w-full h-full object-cover"
						onError={handleError}
					/>
				</div>
				{/* Back - Text */}
				<div className="absolute inset-0 rounded-full border border-tertiary-bg bg-tertiary-bg backface-hidden rotate-y-180 flex items-center justify-center">
					<p className="text-primary text-center text-xs px-2">{alt}</p>
				</div>
			</div>
		</div>
	);
};

export default CircleFlip;
