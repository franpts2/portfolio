import React from "react";
import Checkbox from "./Checkbox.tsx";
import IconButton from "./IconButton.tsx";
import { formatTechName, capitalize } from "../../utils/formatTech.ts";
import { icons } from "../../assets/icons.ts";

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
				{/* status */}
				<div className="mb-5">
					<h3 className="text-xs font-semibold text-secondary mb-3 uppercase tracking-wider">
						Status
					</h3>
					<div className="flex flex-col gap-1.5">
						<Checkbox
							checked={filters.status === "all"}
							onChange={() => handleStatusChange("all")}
							label="All"
							variant="radio"
						/>
						<Checkbox
							checked={filters.status === "done"}
							onChange={() => handleStatusChange("done")}
							label="Done"
							variant="radio"
						/>
						<Checkbox
							checked={filters.status === "in-progress"}
							onChange={() => handleStatusChange("in-progress")}
							label="In Progress"
							variant="radio"
						/>
					</div>
				</div>

				{/* tags */}
				<div className="mb-5">
					<div className="flex items-center justify-between mb-3">
						<h3 className="text-xs font-semibold text-secondary uppercase tracking-wider">
							Tags
						</h3>
						<div className="flex items-center gap-2">
							<IconButton
								icon={icons.check.fill}
								onClick={handleSelectAllTags}
								iconHeight={16}
								variant="minimal"
							/>
							<IconButton
								icon={icons.close.fill}
								onClick={handleClearTags}
								iconHeight={16}
								variant="minimal"
							/>
						</div>
					</div>
					<div className="flex flex-col gap-1.5">
						{availableTags.map((tag) => (
							<Checkbox
								key={tag}
								checked={filters.tags.includes(tag)}
								onChange={() => handleTagToggle(tag)}
								label={capitalize(tag)}
							/>
						))}
					</div>
				</div>

				{/* tech */}
				<div>
					<div className="flex items-center justify-between mb-3">
						<h3 className="text-xs font-semibold text-secondary uppercase tracking-wider">
							Technologies
						</h3>
						<div className="flex items-center gap-2">
							<IconButton
								icon={icons.check.fill}
								onClick={handleSelectAllTech}
								iconHeight={16}
								variant="minimal"
							/>
							<IconButton
								icon={icons.close.fill}
								onClick={handleClearTech}
								iconHeight={16}
								variant="minimal"
							/>
						</div>
					</div>
					<div className="flex flex-col gap-1.5">
						{availableTech.map((language) => (
							<Checkbox
								key={language}
								checked={filters.tech.includes(language)}
								onChange={() => handleTechToggle(language)}
								label={formatTechName(language)}
							/>
						))}
					</div>
				</div>
			</div>
		</>
	);
};

export default Dropdown;
