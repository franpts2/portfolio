import React, { useState, useEffect } from "react";
import { icons } from "../../assets/icons.ts";
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
					<img
						src={images[currentIndex]}
						alt={`Project screenshot ${currentIndex + 1}`}
						className="w-full h-auto object-cover"
					/>

					{/* left arrow */}
					<IconButton
						icon={icons.arrowLeft.fill}
						onClick={handlePrevious}
						hoverDirection="left"
						className="absolute left-14 top-1/2 -translate-y-1/2"
					/>

					{/* right arrow */}
					<IconButton
						icon={icons.arrowRight.fill}
						onClick={handleNext}
						hoverDirection="right"
						className="absolute right-14 top-1/2 -translate-y-1/2"
					/>

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
