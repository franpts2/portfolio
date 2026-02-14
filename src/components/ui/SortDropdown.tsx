import React from "react";
import { Icon } from "@iconify/react";
import { icons } from "../../assets/icons.ts";
import { capitalize } from "../../utils/formatTech.ts";

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
	if (!isOpen) return null;

	const options = ["date", "name", "relevance"] as const;

	return (
		<>
			{/* backdrop */}
			<div
				className="fixed inset-0 z-40"
				onClick={onClose}
				aria-hidden="true"
			/>

			{/* dropdown */}
			<div className="absolute left-0 top-12 z-50 bg-secondary-bg border border-primary-bg rounded-lg shadow-xl py-2 w-full">
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
			</div>
		</>
	);
};

export default SortDropdown;
