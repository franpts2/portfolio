import React from "react";

interface TapePieceProps {
	positionClass: string;
	rotation: string;
}

const TapePiece: React.FC<TapePieceProps> = ({
	positionClass,
	rotation,
}) => (
	<div
		className={`
            absolute z-20 h-8 w-24 
            bg-[#e6dbc4] opacity-90 
            shadow-sm drop-shadow-md 
            mix-blend-multiply
            ${positionClass} ${rotation}
        `}
		style={{
			clipPath:
				"polygon(0% 10%, 5% 0%, 95% 5%, 100% 0%, 100% 90%, 95% 100%, 5% 95%, 0% 100%)",
			backgroundImage: `
                repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(0,0,0,0.02) 2px, rgba(0,0,0,0.02) 4px)
            `,
		}}
	/>
);

export default TapePiece;
