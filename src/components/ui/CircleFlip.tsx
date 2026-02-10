import React from "react";

interface CircleFlipProps {
	src: string;
	alt: string;
}

const CircleFlip: React.FC<CircleFlipProps> = ({ src, alt }) => {
	return (
		<div className="w-20 h-20 rounded-full shrink-0 overflow-hidden relative flex items-center justify-center group cursor-pointer">
			<img
				src={src}
				alt={alt}
				className="group-hover:opacity-0 transition-opacity duration-300"
			/>
			<div className="absolute inset-0 bg-tertiary-bg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
				<p className="text-primary text-center text-xs px-2">{alt}</p>
			</div>
		</div>
	);
};

export default CircleFlip;
