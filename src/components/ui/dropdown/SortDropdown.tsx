import React, { useEffect, useRef, useState } from "react";
import { Icon } from "@iconify/react";
import { motion, AnimatePresence } from "motion/react";
import { capitalize } from "../../../utils/format.ts";

interface SortDropdownProps {
	isOpen: boolean;
	onClose: () => void;
	sortBy: "date" | "name" | "relevance";
	onSortChange: (sortBy: "date" | "name" | "relevance") => void;
	id?: string;
}

const SortDropdown: React.FC<SortDropdownProps> = ({
	isOpen,
	onClose,
	sortBy,
	onSortChange,
	id,
}) => {
	const options = ["date", "name", "relevance"] as const;
	const dropdownRef = useRef<HTMLDivElement>(null);
	const [focusedIndex, setFocusedIndex] = useState(() => {
		const currentIndex = options.findIndex((option) => option === sortBy);
		return currentIndex >= 0 ? currentIndex : 0;
	});

	// Update focusedIndex when sortBy or isOpen changes
	useEffect(() => {
		if (isOpen) {
			const currentIndex = options.findIndex((option) => option === sortBy);
			setFocusedIndex(currentIndex >= 0 ? currentIndex : 0);
		}
	}, [isOpen, sortBy]);

	// Focus management
	useEffect(() => {
		if (isOpen && dropdownRef.current) {
			const focusedButton = dropdownRef.current.children[
				focusedIndex
			] as HTMLElement;
			if (focusedButton) {
				focusedButton.focus();
			}
		}
	}, [isOpen, focusedIndex]);

	return (
		<AnimatePresence>
			{isOpen && (
				<>
					{/* backdrop */}
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.2 }}
						className="fixed inset-0 z-40"
						onClick={onClose}
						aria-hidden="true"
					/>

					{/* dropdown */}
					<motion.div
						ref={dropdownRef}
						id={id}
						initial={{ opacity: 0, y: -8 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -8 }}
						transition={{ duration: 0.2, ease: "easeOut" }}
						className="absolute left-0 top-12 z-50 bg-secondary-bg border border-primary-bg rounded-lg shadow-xl py-2 w-full"
						role="listbox"
						aria-label="Sort options"
					>
						{options.map((option, index) => (
							<button
								key={option}
								onClick={() => {
									console.log("Button click:", option);
									onSortChange(option);
									onClose();
								}}
								onKeyDown={(e) => {
									if (e.key === "Enter" || e.key === " ") {
										e.preventDefault();
										console.log("Button keyboard:", option);
										onSortChange(option);
										onClose();
									} else if (e.key === "ArrowDown") {
										e.preventDefault();
										setFocusedIndex((prev) => (prev + 1) % options.length);
									} else if (e.key === "ArrowUp") {
										e.preventDefault();
										setFocusedIndex(
											(prev) => (prev - 1 + options.length) % options.length,
										);
									} else if (e.key === "Escape") {
										e.preventDefault();
										onClose();
									}
								}}
								onMouseEnter={() => setFocusedIndex(index)}
								className={`w-full px-4 py-2.5 flex items-center justify-between cursor-pointer transition-colors ${
									index === focusedIndex
										? "bg-tertiary-bg"
										: "hover:bg-tertiary-bg"
								}`}
								role="option"
								aria-selected={sortBy === option}
								tabIndex={index === focusedIndex ? 0 : -1}
							>
								<span
									className={`text-sm ${
										sortBy === option
											? "text-primary font-medium"
											: "text-secondary"
									}`}
								>
									{capitalize(option)}
								</span>
								{sortBy === option && (
									<Icon
										icon="material-symbols:check"
										height={20}
										className="text-primary-accent"
									/>
								)}
							</button>
						))}
					</motion.div>
				</>
			)}
		</AnimatePresence>
	);
};

export default SortDropdown;
