import React from "react";
import { motion, AnimatePresence } from "motion/react";
import FilterGroup from "./FilterGroup.tsx";
import {
	formatTechName,
	capitalize,
	normalize,
} from "../../../utils/format.ts";

interface DropdownProps {
	isOpen: Boolean;
	onClose: () => void;
	filters: {
		status: "all" | "done" | "in-progress";
		tags: string[];
		tech: string[];
	};
	onFilterChange: (filters: {
		status: "all" | "done" | "in-progress";
		tags: string[];
		tech: string[];
	}) => void;
	availableTags: string[];
	availableTech: string[];
}

const Dropdown: React.FC<DropdownProps> = ({
	isOpen,
	onClose,
	filters,
	onFilterChange,
	availableTags,
	availableTech,
}) => {
	const handleTagToggle = (tag: string) => {
		const newTags = filters.tags.includes(tag)
			? filters.tags.filter((t) => t !== tag)
			: [...filters.tags, tag];
		onFilterChange({ ...filters, tags: newTags });
	};

	const handleTechToggle = (language: string) => {
		const newTech = filters.tech.includes(language)
			? filters.tech.filter((l) => l !== language)
			: [...filters.tech, language];
		onFilterChange({ ...filters, tech: newTech });
	};

	const handleClearTags = () => {
		onFilterChange({ ...filters, tags: [] });
	};

	const handleClearTech = () => {
		onFilterChange({ ...filters, tech: [] });
	};

	const handleSelectAllTags = () => {
		onFilterChange({ ...filters, tags: availableTags });
	};

	const handleSelectAllTech = () => {
		onFilterChange({ ...filters, tech: availableTech });
	};

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
						className="absolute right-0 top-12 z-50 bg-secondary-bg border border-primary-bg rounded-lg shadow-xl p-5 min-w-50 max-w-62.5"
					>
						<FilterGroup
							title="Status"
							items={["all", "done", "in-progress"]}
							selectedItems={[filters.status]}
							onItemToggle={(status) =>
								onFilterChange({
									...filters,
									status: status as "all" | "done" | "in-progress",
								})
							}
							variant="radio"
							formatLabel={normalize}
							className="mb-5"
						/>

						<FilterGroup
							title="Tags"
							items={availableTags}
							selectedItems={filters.tags}
							onItemToggle={handleTagToggle}
							onSelectAll={handleSelectAllTags}
							onClear={handleClearTags}
							formatLabel={capitalize}
							className="mb-5"
						/>

						<FilterGroup
							title="Technologies"
							items={availableTech}
							selectedItems={filters.tech}
							onItemToggle={handleTechToggle}
							onSelectAll={handleSelectAllTech}
							onClear={handleClearTech}
							formatLabel={formatTechName}
						/>
					</motion.div>
				</>
			)}
		</AnimatePresence>
	);
};

export default Dropdown;
