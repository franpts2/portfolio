import React, { useState, useEffect } from "react";
import { icons } from "../../assets/icons.ts";
import { Icon } from "@iconify/react";
import IconButton from "../ui/IconButton.tsx";
import PaginationDots from "../ui/PaginationDots.tsx";
import VideoDisplay from "../ui/VideoDisplay.tsx";

interface GalleryProps {
	projectId: string;
}

const Gallery: React.FC<GalleryProps> = ({ projectId }) => {
	const [images, setImages] = useState<string[]>([]);
	const [currentIndex, setCurrentIndex] = useState(0);
	const [videoPath, setVideoPath] = useState<string | null>(null);
	const [touchStart, setTouchStart] = useState<number | null>(null);
	const [touchEnd, setTouchEnd] = useState<number | null>(null);
	const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
	const [isHoveringGallery, setIsHoveringGallery] = useState(false);
	const [isLeftSide, setIsLeftSide] = useState(false);
	const [isMobileOrTablet, setIsMobileOrTablet] = useState(false);

	// min swipe distance (in px) to trigger navigation
	const minSwipeDistance = 50;

	const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
		if (!isMobileOrTablet) {
			const rect = e.currentTarget.getBoundingClientRect();
			const relativeX = e.clientX - rect.left;
			setCursorPosition({ x: e.clientX, y: e.clientY });
			setIsLeftSide(relativeX < rect.width / 2);
		}
	};

	const handleImageClick = () => {
		if (isLeftSide) {
			handlePrevious();
		} else {
			handleNext();
		}
	};

	useEffect(() => {
		const updateSettings = () => {
			const isMobile = window.innerWidth < 1024;
			setIsMobileOrTablet(isMobile);
		};

		updateSettings();
		window.addEventListener("resize", updateSettings);

		return () => {
			window.removeEventListener("resize", updateSettings);
		};
	}, []);

	const normalizeProjectId = (id: string) => {
		return id
			.toLowerCase()
			.normalize("NFD")
			.replace(/[\u0300-\u036f]/g, "")
			.replace(/ç/g, "c")
			.replace(/\s+/g, "-");
	};

	useEffect(() => {
		const loadMedia = async () => {
			const normalizedId = normalizeProjectId(projectId);

			// Check for video first
			const videoFilePath = `/images/projects/${normalizedId}/video.mp4`;
			const videoExists = await new Promise<boolean>((resolve) => {
				const video = document.createElement("video");
				video.onloadedmetadata = () => resolve(true);
				video.onerror = () => resolve(false);
				video.src = videoFilePath;
			});

			if (videoExists) {
				setVideoPath(videoFilePath);
				setImages([]);
				return;
			}

			// If no video, load images as before
			const loadedImages: string[] = [];
			let imageIndex = 1;
			let consecutiveFailures = 0;

			while (imageIndex <= 20 && consecutiveFailures < 2) {
				const imagePath = `/images/projects/${normalizedId}/${imageIndex}.png`;

				const imageExists = await new Promise<boolean>((resolve) => {
					const img = new Image();
					img.onload = () => resolve(true);
					img.onerror = () => resolve(false);
					img.src = imagePath;
				});

				if (imageExists) {
					loadedImages.push(imagePath);
					consecutiveFailures = 0;
				} else {
					consecutiveFailures++;
				}

				imageIndex++;
			}

			setImages(loadedImages);
			setVideoPath(null);
		};

		loadMedia();
	}, [projectId]);

	const handlePrevious = () => {
		setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
	};

	const handleNext = () => {
		setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
	};

	const onTouchStart = (e: React.TouchEvent) => {
		setTouchEnd(null);
		if (e.targetTouches[0]) {
			setTouchStart(e.targetTouches[0].clientX);
		}
	};

	const onTouchMove = (e: React.TouchEvent) => {
		if (e.targetTouches[0]) {
			setTouchEnd(e.targetTouches[0].clientX);
		}
	};

	const onTouchEnd = () => {
		if (!touchStart || !touchEnd) return;
		const distance = touchStart - touchEnd;
		const isLeftSwipe = distance > minSwipeDistance;
		const isRightSwipe = distance < -minSwipeDistance;

		if (isLeftSwipe) {
			handleNext();
		} else if (isRightSwipe) {
			handlePrevious();
		}
	};

	if (!videoPath && images.length === 0) {
		return null;
	}

	return (
		<div className="w-auto relative overflow-hidden">
			{videoPath ? (
				<VideoDisplay videoPath={videoPath} />
			) : (
				/* image gallery */
				<>
					<div
						className={`relative ${isHoveringGallery && !isMobileOrTablet ? "cursor-none" : ""}`}
						onMouseMove={handleMouseMove}
						onMouseEnter={() => setIsHoveringGallery(true)}
						onMouseLeave={() => setIsHoveringGallery(false)}
					>
						<img
							src={images[currentIndex]}
							alt={`Project screenshot ${currentIndex + 1}`}
							className="w-full h-auto object-cover"
							onTouchStart={onTouchStart}
							onTouchMove={onTouchMove}
							onTouchEnd={onTouchEnd}
							onClick={handleImageClick}
						/>
					</div>

					{/* custom cursor arrows */}
					{!isMobileOrTablet && (
						<div
							className={`fixed pointer-events-none z-50 flex items-center justify-center bg-secondary-bg text-primary p-3 rounded-full shadow-lg -translate-x-1/2 -translate-y-1/2 transition-all duration-200 ease-out ${
								isHoveringGallery
									? "scale-100 opacity-100"
									: "scale-50 opacity-0"
							}`}
							style={{
								left: `${cursorPosition.x}px`,
								top: `${cursorPosition.y}px`,
							}}
						>
							<Icon
								icon={isLeftSide ? icons.arrowLeft.fill : icons.arrowRight.fill}
								height={24}
							/>
						</div>
					)}

					<PaginationDots
						totalDots={images.length}
						currentIndex={currentIndex}
						onDotClick={setCurrentIndex}
						className="absolute bottom-4 left-1/2 -translate-x-1/2"
					/>
				</>
			)}
		</div>
	);
};

export default Gallery;
