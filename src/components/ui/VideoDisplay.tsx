import React, { useState, useRef } from "react";
import { Icon } from "@iconify/react";
import { icons } from "../../assets/icons.ts";
import ProgressBar from "./ProgressBar.tsx";
import IconButton from "./IconButton.tsx";

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
	const [currentTime, setCurrentTime] = useState(0);
	const [duration, setDuration] = useState(0);
	const [showControls, setShowControls] = useState(true);
	const [isMuted, setIsMuted] = useState(false);
	const [isFullscreen, setIsFullscreen] = useState(false);
	const [isHoveringControls, setIsHoveringControls] = useState(false);
	const videoRef = useRef<HTMLVideoElement>(null);
	const containerRef = useRef<HTMLDivElement>(null);

	const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
		setCursorPosition({ x: e.clientX, y: e.clientY });
		setShowControls(true);
	};

	React.useEffect(() => {
		const handleFullscreenChange = () => {
			setIsFullscreen(!!document.fullscreenElement);
		};

		document.addEventListener("fullscreenchange", handleFullscreenChange);
		return () => {
			document.removeEventListener("fullscreenchange", handleFullscreenChange);
		};
	}, []);

	const togglePlayPause = () => {
		if (videoRef.current) {
			if (isPlaying) {
				videoRef.current.pause();
			} else {
				videoRef.current.play();
			}
		}
	};

	const handleTimeUpdate = () => {
		if (videoRef.current) {
			setCurrentTime(videoRef.current.currentTime);
		}
	};

	const handleLoadedMetadata = () => {
		if (videoRef.current) {
			setDuration(videoRef.current.duration);
		}
	};

	const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
		if (videoRef.current) {
			const rect = e.currentTarget.getBoundingClientRect();
			const pos = (e.clientX - rect.left) / rect.width;
			videoRef.current.currentTime = pos * duration;
		}
	};

	const formatTime = (time: number) => {
		const minutes = Math.floor(time / 60);
		const seconds = Math.floor(time % 60);
		return `${minutes}:${seconds.toString().padStart(2, "0")}`;
	};

	const toggleMute = () => {
		if (videoRef.current) {
			videoRef.current.muted = !isMuted;
			setIsMuted(!isMuted);
		}
	};

	const toggleFullscreen = () => {
		if (containerRef.current) {
			if (!document.fullscreenElement) {
				containerRef.current.requestFullscreen();
			} else {
				document.exitFullscreen();
			}
		}
	};

	return (
		<div
			ref={containerRef}
			className={`relative ${isHoveringVideo && !isPlaying && !isHoveringControls ? "cursor-none" : ""} ${className} rounded-lg overflow-hidden`}
			onMouseMove={handleMouseMove}
			onMouseEnter={() => setIsHoveringVideo(true)}
			onMouseLeave={() => {
				setIsHoveringVideo(false);
				setShowControls(false);
			}}
		>
			<video
				ref={videoRef}
				src={videoPath}
				className="w-full h-auto object-cover"
				preload="metadata"
				onPlay={() => setIsPlaying(true)}
				onPause={() => setIsPlaying(false)}
				onTimeUpdate={handleTimeUpdate}
				onLoadedMetadata={handleLoadedMetadata}
				onClick={togglePlayPause}
			>
				Your browser does not support the video tag.
			</video>

			{/* custom controls */}
			{showControls && isHoveringVideo && (
				<div
					className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4"
					onMouseEnter={() => setIsHoveringControls(true)}
					onMouseLeave={() => setIsHoveringControls(false)}
				>
					<ProgressBar
						currentTime={currentTime}
						duration={duration}
						onSeek={handleSeek}
						className="mb-3"
					/>

					{/* controls */}
					<div className="flex items-center justify-between text-white">
						<div className="flex items-center gap-3">
							<IconButton
								icon={isPlaying ? icons.pause.outline : icons.play.outline}
								onClick={togglePlayPause}
								iconHeight={24}
								variant="transparent"
							/>
							<p className="text-sm">
								{formatTime(currentTime)} / {formatTime(duration)}
							</p>
						</div>
						<div className="flex items-center gap-3">
							<IconButton
								icon={
									isMuted ? icons.volumeOff.outline : icons.volumeOn.outline
								}
								onClick={toggleMute}
								iconHeight={24}
								variant="transparent"
							/>
							<IconButton
								icon={
									isFullscreen ? icons.collapse.outline : icons.expand.outline
								}
								onClick={toggleFullscreen}
								iconHeight={24}
								variant="transparent"
							/>
						</div>
					</div>
				</div>
			)}

			<div
				className={`fixed pointer-events-none z-50 flex items-center gap-2 bg-white text-black px-4 py-2 border-2 border-gray-300 rounded-full shadow-lg -translate-x-1/2 -translate-y-1/2 transition-all duration-200 ease-out ${
					isHoveringVideo && !isPlaying && !isHoveringControls
						? "scale-100 opacity-100"
						: "scale-50 opacity-0"
				}`}
				style={{
					left: `${cursorPosition.x}px`,
					top: `${cursorPosition.y}px`,
				}}
			>
				<Icon icon={icons.play.outline} height={24} />
				<p className="text-sm font-medium whitespace-nowrap">Play video</p>
			</div>
		</div>
	);
};

export default VideoDisplay;
