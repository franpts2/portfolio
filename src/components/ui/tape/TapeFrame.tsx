import React from "react";
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
	return (
		<div className={`relative inline-block ${className}`}>
			{/* white photo paper background */}
			<div className="relative bg-white p-4 shadow-xl rotate-1 transition-transform hover:rotate-0 duration-300 ease-out">
				{/* top left*/}
				<TapePiece positionClass="-top-3 -left-8" rotation="-rotate-[25deg]" />

				{/* top right */}
				<TapePiece positionClass="-top-4 -right-6" rotation="rotate-[15deg]" />

				{/* bottom left */}
				<TapePiece
					positionClass="-bottom-3 -left-6"
					rotation="rotate-[10deg]"
				/>

				{/* bottom right */}
				<TapePiece
					positionClass="-bottom-4 -right-8"
					rotation="-rotate-[30deg]"
				/>

				{/* image */}
				<div className="overflow-hidden bg-gray-100 filter contrast-[1.05] sepia-[.1]">
					<img
						src={imageSrc}
						alt={altText}
						className="block max-w-full h-auto object-cover grayscale-[0.2]"
					/>
				</div>
			</div>
		</div>
	);
};

export default TapeFrame;
