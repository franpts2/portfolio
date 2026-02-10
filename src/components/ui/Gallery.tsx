import React, { useState, useEffect } from "react";

interface GalleryProps {
	projectId: string;
}

const Gallery: React.FC<GalleryProps> = ({ projectId }) => {
	const [images, setImages] = useState<string[]>([]);

	const normalizeProjectId = (id: string) => {
		return id
			.toLowerCase()
			.normalize("NFD")
			.replace(/[\u0300-\u036f]/g, "")
			.replace(/ç/g, "c")
			.replace(/\s+/g, "-");
	};

	useEffect(() => {
		const loadImages = async () => {
			const normalizedId = normalizeProjectId(projectId);
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
		};

		loadImages();
	}, [projectId]);

	if (images.length === 0) {
		return null;
	}

	return (
		<div className="w-auto grid grid-cols-2 gap-4">
			{images.map((image, index) => (
				<div
					key={index}
					className="rounded-2xl overflow-hidden bg-secondary-bg"
				>
					<img
						src={image}
						alt={`Project screenshot ${index + 1}`}
						className="w-full h-auto object-cover"
					/>
				</div>
			))}
		</div>
	);
};

export default Gallery;
