import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { icons } from "../../assets/icons.ts";

interface VideoDisplayProps {
	videoPath: string;
	className?: string;
}

const VideoDisplay: React.FC<VideoDisplayProps> = ({
	videoPath,
	className = "",
}) => {
	const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
	const [isHoveringVideo, setIsHoveringVideo] = useState(false);
	const [isPlaying, setIsPlaying] = useState(false);

	const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
		setCursorPosition({ x: e.clientX, y: e.clientY });
	};

	const handlePlay = () => {
		setIsPlaying(true);
	};

	const handlePause = () => {
		setIsPlaying(false);
	};

	return (
		<div
			className={`relative ${isHoveringVideo && !isPlaying ? "cursor-none" : ""} ${className}`}
			onMouseMove={handleMouseMove}
			onMouseEnter={() => setIsHoveringVideo(true)}
			onMouseLeave={() => setIsHoveringVideo(false)}
		>
			<video
				src={videoPath}
				controls
				className="w-full h-auto object-cover"
				preload="metadata"
				onPlay={handlePlay}
				onPause={handlePause}
			>
				Your browser does not support the video tag.
			</video>

			{/* Custom cursor */}
			{isHoveringVideo && !isPlaying && (
				<div
					className="fixed pointer-events-none z-50 flex items-center gap-2 bg-white px-4 py-2 border-2 border-gray-300 rounded-full shadow-lg -translate-x-1/2 -translate-y-1/2"
					style={{
						left: `${cursorPosition.x}px`,
						top: `${cursorPosition.y}px`,
					}}
				>
					<Icon icon={icons.play.outline} height={24} />
					<span className="text-sm font-medium whitespace-nowrap">
						Play video
					</span>
				</div>
			)}
		</div>
	);
};

export default VideoDisplay;
