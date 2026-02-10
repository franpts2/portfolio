import React from "react";

interface PaginationDotsProps {
	totalDots: number;
	currentIndex: number;
	onDotClick: (index: number) => void;
	className?: string;
}

const PaginationDots: React.FC<PaginationDotsProps> = ({
	totalDots,
	currentIndex,
	onDotClick,
	className = "",
}) => {
	return (
		<div className={`flex gap-2 ${className}`}>
			{Array.from({ length: totalDots }).map((_, index) => (
				<button
					key={index}
					onClick={() => onDotClick(index)}
					className={`w-2 h-2 cursor-pointer rounded-full transition-all duration-300 ${
						index === currentIndex
							? "bg-primary-accent w-6"
							: "bg-secondary hover:bg-tertiary-bg"
					}`}
					aria-label={`Go to image ${index + 1}`}
				/>
			))}
		</div>
	);
};

export default PaginationDots;
