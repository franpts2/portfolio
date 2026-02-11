import React from "react";

interface ProgressBarProps {
	currentTime: number;
	duration: number;
	onSeek: (e: React.MouseEvent<HTMLDivElement>) => void;
	className?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
	currentTime,
	duration,
	onSeek,
	className = "",
}) => {
	const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

	return (
		<div
			className={`w-full h-1 bg-gray-400/50 rounded-full cursor-pointer group ${className}`}
			onClick={onSeek}
		>
			<div
				className="h-full bg-white rounded-full transition-all group-hover:h-1.5"
				style={{ width: `${progress}%` }}
			/>
		</div>
	);
};

export default ProgressBar;
