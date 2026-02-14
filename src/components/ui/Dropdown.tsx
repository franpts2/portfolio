import React from "react";
import Checkbox from "./Checkbox.tsx";

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

	const handleStatusChange = (status: "all" | "done" | "in-progress") => {
		onFilterChange({ ...filters, status });
	};

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

	return (
		<>
			{/* backdrop */}
			<div
				className="fixed inset-0 z-40"
				onClick={onClose}
				aria-hidden="true"
			/>

			{/* dropdown */}
			<div className="absolute right-0 top-12 z-50 bg-secondary-bg border border-primary-bg rounded-lg shadow-xl p-4 min-w-50 max-w-62.5">
				{/* status */}
				<div className="mb-4">
					<h3 className="text-sm font-semibold text-secondary mb-2">Status</h3>
					<div className="flex flex-col gap-2">
						<Checkbox
							checked={filters.status === "all"}
							onChange={() => handleStatusChange("all")}
							label="all"
							variant="radio"
						/>
						<Checkbox
							checked={filters.status === "done"}
							onChange={() => handleStatusChange("done")}
							label="done"
							variant="radio"
						/>
						<Checkbox
							checked={filters.status === "in-progress"}
							onChange={() => handleStatusChange("in-progress")}
							label="in progress"
							variant="radio"
						/>
					</div>
				</div>

				{/* tags */}
				<div className="mb-4">
					<h3 className="text-sm font-semibold text-secondary mb-2">Tags</h3>
					<div className="flex flex-col gap-2">
						{availableTags.map((tag) => (
							<Checkbox
								key={tag}
								checked={filters.tags.includes(tag)}
								onChange={() => handleTagToggle(tag)}
								label={tag}
							/>
						))}
					</div>
				</div>

				{/* tech */}
				<div>
					<h3 className="text-sm font-semibold text-secondary mb-2">Technologies</h3>
					<div className="flex flex-col gap-2">
						{availableTech.map((language) => (
							<Checkbox
								key={language}
								checked={filters.tech.includes(language)}
								onChange={() => handleTechToggle(language)}
								label={language}
							/>
						))}
					</div>
				</div>
			</div>
		</>
	);
};

export default Dropdown;
