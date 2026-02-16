import React from "react";
import { Icon } from "@iconify/react";
import { motion, AnimatePresence } from "motion/react";
import { capitalize } from "../../../utils/format.ts";

interface SortDropdownProps {
	isOpen: boolean;
	onClose: () => void;
	sortBy: "date" | "name" | "relevance";
	onSortChange: (sortBy: "date" | "name" | "relevance") => void;
}

const SortDropdown: React.FC<SortDropdownProps> = ({
	isOpen,
	onClose,
	sortBy,
	onSortChange,
}) => {
	const options = ["date", "name", "relevance"] as const;

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
						initial={{ opacity: 0, y: -8 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -8 }}
						transition={{ duration: 0.2, ease: "easeOut" }}
						className="absolute left-0 top-12 z-50 bg-secondary-bg border border-primary-bg rounded-lg shadow-xl py-2 w-full"
					>
						{options.map((option) => (
							<button
								key={option}
								onClick={() => {
									onSortChange(option);
									onClose();
								}}
								className="w-full px-4 py-2.5 flex items-center justify-between cursor-pointer hover:bg-tertiary-bg transition-colors"
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
