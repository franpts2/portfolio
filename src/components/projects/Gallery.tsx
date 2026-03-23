import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { icons } from "../../assets/icons.ts";
import { Icon } from "@iconify/react";
import PaginationDots from "../ui/PaginationDots.tsx";
import VideoDisplay from "../ui/VideoDisplay.tsx";
import { slugify } from "../../utils/format.ts";

interface GalleryProps {
	projectId: string;
}

const Gallery: React.FC<GalleryProps> = ({ projectId }) => {
	const [images, setImages] = useState<string[]>([]);
	const [currentIndex, setCurrentIndex] = useState(0);
	const [direction, setDirection] = useState(0);
	const [videoPath, setVideoPath] = useState<string | null>(null);
	const [touchStart, setTouchStart] = useState<number | null>(null);
	const [touchEnd, setTouchEnd] = useState<number | null>(null);
	const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
	const [hasMouseMoved, setHasMouseMoved] = useState(false);
	const [isHoveringGallery, setIsHoveringGallery] = useState(false);
	const [isLeftSide, setIsLeftSide] = useState(false);
	const [isMobileOrTablet, setIsMobileOrTablet] = useState(false);
	const [isHoveringPagination, setIsHoveringPagination] = useState(false);
	const [isAnimating, setIsAnimating] = useState(false);

	// min swipe distance (in px) to trigger navigation
	const minSwipeDistance = 50;

	const handlePrevious = useCallback(() => {
		if (isAnimating) return;
		setIsAnimating(true);
		setDirection(-1);
		setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
	}, [isAnimating, images.length]);

	const handleNext = useCallback(() => {
		if (isAnimating) return;
		setIsAnimating(true);
		setDirection(1);
		setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
	}, [isAnimating, images.length]);

	const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
		if (!isMobileOrTablet) {
			const rect = e.currentTarget.getBoundingClientRect();
			const relativeX = e.clientX - rect.left;
			setCursorPosition({ x: e.clientX, y: e.clientY });
			setHasMouseMoved(true);
			setIsLeftSide(relativeX < rect.width / 2);
		}
	};

	const handleImageClick = () => {
		if (isAnimating) return; // Block clicks during animation
		if (isLeftSide) {
			handlePrevious();
		} else {
			handleNext();
		}
	};

	// handle keyboard navigation
	useEffect(() => {
		if (images.length <= 1) return; // no navigation needed for single image

		const handleKeyDown = (e: KeyboardEvent) => {
			if (
				e.target instanceof HTMLInputElement ||
				e.target instanceof HTMLTextAreaElement
			) {
				return; // don't interfere with form inputs
			}

			switch (e.key) {
				case "ArrowLeft":
					e.preventDefault();
					handlePrevious();
					break;
				case "ArrowRight":
					e.preventDefault();
					handleNext();
					break;
				case "Home":
					e.preventDefault();
					if (isAnimating) return;
					setIsAnimating(true);
					setDirection(currentIndex > 0 ? -1 : 0);
					setCurrentIndex(0);
					break;
				case "End":
					e.preventDefault();
					if (isAnimating) return;
					setIsAnimating(true);
					setDirection(currentIndex < images.length - 1 ? 1 : 0);
					setCurrentIndex(images.length - 1);
					break;
			}
		};

		document.addEventListener("keydown", handleKeyDown);
		return () => document.removeEventListener("keydown", handleKeyDown);
	}, [handlePrevious, handleNext, currentIndex, images.length, isAnimating]);

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

	useEffect(() => {
		const loadMedia = async () => {
			const normalizedId = slugify(projectId);

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

	const onTouchStart = (e: React.TouchEvent) => {
		if (isAnimating) return;
		setTouchEnd(null);
		if (e.targetTouches[0]) {
			setTouchStart(e.targetTouches[0].clientX);
		}
	};

	const onTouchMove = (e: React.TouchEvent) => {
		if (isAnimating) return;
		if (e.targetTouches[0]) {
			setTouchEnd(e.targetTouches[0].clientX);
		}
	};

	const onTouchEnd = () => {
		if (!touchStart || !touchEnd || isAnimating) return;
		const distance = touchStart - touchEnd;
		const isLeftSwipe = distance > minSwipeDistance;
		const isRightSwipe = distance < -minSwipeDistance;

		if (isLeftSwipe) {
			handleNext();
		} else if (isRightSwipe) {
			handlePrevious();
		}
	};

	// Handle animation completion
	const handleAnimationComplete = useCallback(() => {
		setIsAnimating(false);
	}, []);

	if (!videoPath && images.length === 0) {
		return null;
	}

	const slideVariants = {
		enter: (direction: number) => ({
			x: direction > 0 ? "100%" : "-100%",
			opacity: 0.8,
		}),
		center: {
			x: 0,
			opacity: 1,
		},
		exit: (direction: number) => ({
			x: direction > 0 ? "-100%" : "100%",
			opacity: 0.8,
		}),
	};

	return (
		<div className="w-auto relative overflow-hidden">
			{videoPath ? (
				<VideoDisplay videoPath={videoPath} />
			) : (
				/* image gallery */
				<>
					<div
						className={`relative ${isHoveringGallery && !isMobileOrTablet ? "cursor-none" : ""} overflow-hidden focus:outline-none`}
						onMouseMove={handleMouseMove}
						onMouseEnter={() => setIsHoveringGallery(true)}
						onMouseLeave={() => setIsHoveringGallery(false)}
						tabIndex={0}
						role="img"
						aria-label={`Image ${currentIndex + 1} of ${images.length}: Project screenshot`}
						aria-describedby="gallery-instructions"
					>
						{/* Screen reader instructions */}
						<div id="gallery-instructions" className="sr-only">
							Use left and right arrow keys to navigate between images. Press
							Home to go to first image, End to go to last image.
						</div>
						<AnimatePresence initial={false} custom={direction}>
							<motion.img
								key={currentIndex}
								src={images[currentIndex]}
								alt={`Project screenshot ${currentIndex + 1}`}
								className="w-full h-auto object-cover absolute top-0 left-0"
								custom={direction}
								variants={slideVariants}
								initial="enter"
								animate="center"
								exit="exit"
								transition={{
									x: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
									opacity: { duration: 0.6 },
								}}
								onAnimationComplete={handleAnimationComplete}
								onTouchStart={onTouchStart}
								onTouchMove={onTouchMove}
								onTouchEnd={onTouchEnd}
								onClick={handleImageClick}
								drag={isAnimating ? false : "x"}
								dragConstraints={{ left: 0, right: 0 }}
								dragElastic={1}
								onDragEnd={(e, { offset, velocity }) => {
									if (isAnimating) return; // Block drag navigation during animation
									const swipe = Math.abs(offset.x) * velocity.x;
									if (swipe < -10000) {
										handleNext();
									} else if (swipe > 10000) {
										handlePrevious();
									}
								}}
							/>
						</AnimatePresence>
						{/* Invisible placeholder to maintain height */}
						<img
							src={images[currentIndex]}
							alt=""
							className="w-full h-auto object-cover invisible"
							aria-hidden="true"
						/>
					</div>

					{/* custom cursor arrows */}
					{!isMobileOrTablet && images.length > 1 && (
						<div
							className={`fixed pointer-events-none z-50 flex items-center justify-center bg-secondary-bg text-primary p-3 rounded-full shadow-lg -translate-x-1/2 -translate-y-1/2 transition-all duration-200 ease-out ${
								isHoveringGallery && !isHoveringPagination && hasMouseMoved
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

					{images.length > 1 && (
						<div
							onMouseEnter={() => setIsHoveringPagination(true)}
							onMouseLeave={() => setIsHoveringPagination(false)}
							className="absolute bottom-4 left-1/2 -translate-x-1/2 p-2"
						>
							<PaginationDots
								totalDots={images.length}
								currentIndex={currentIndex}
								onDotClick={(index) => {
									if (isAnimating) return; // Block pagination navigation during animation
									setIsAnimating(true);
									setDirection(index > currentIndex ? 1 : -1);
									setCurrentIndex(index);
								}}
							/>
						</div>
					)}
				</>
			)}
		</div>
	);
};

export default Gallery;
