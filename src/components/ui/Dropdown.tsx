import React from "react";
import FilterGroup from "./FilterGroup.tsx";
import { formatTechName, capitalize } from "../../utils/formatTech.ts";

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
	if (!isOpen) return null;

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
		<>
			{/* backdrop */}
			<div
				className="fixed inset-0 z-40"
				onClick={onClose}
				aria-hidden="true"
			/>

			{/* dropdown */}
			<div className="absolute right-0 top-12 z-50 bg-secondary-bg border border-primary-bg rounded-lg shadow-xl p-5 min-w-50 max-w-62.5">
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
					formatLabel={(item) => {
						if (item === "all") return "All";
						if (item === "done") return "Done";
						if (item === "in-progress") return "In Progress";
						return item;
					}}
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
			</div>
		</>
	);
};

export default Dropdown;
