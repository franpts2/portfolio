import React from "react";
import Checkbox from "./../Checkbox.tsx";
import IconButton from "./../buttons/IconButton.tsx";
import { icons } from "../../../assets/icons.ts";

interface FilterGroupProps {
	title: string;
	items: string[];
	selectedItems: string[];
	onItemToggle: (item: string) => void;
	onSelectAll?: () => void;
	onClear?: () => void;
	formatLabel?: (item: string) => string;
	variant?: "checkbox" | "radio";
	className?: string;
}

const FilterGroup: React.FC<FilterGroupProps> = ({
	title,
	items,
	selectedItems,
	onItemToggle,
	onSelectAll,
	onClear,
	formatLabel = (item) => item,
	variant = "checkbox",
	className = "",
}) => {
	return (
		<div className={className}>
			<div className="flex items-center justify-between mb-3">
				<h3 className="text-xs font-semibold text-secondary uppercase tracking-wider">
					{title}
				</h3>
				{onSelectAll && onClear && (
					<div className="flex items-center gap-2">
						<IconButton
							icon={icons.check.fill}
							onClick={onSelectAll}
							iconHeight={16}
							variant="minimal"
						/>
						<IconButton
							icon={icons.close.fill}
							onClick={onClear}
							iconHeight={16}
							variant="minimal"
						/>
					</div>
				)}
			</div>
			<div className="flex flex-col gap-1.5">
				{items.map((item) => (
					<Checkbox
						key={item}
						checked={selectedItems.includes(item)}
						onChange={() => onItemToggle(item)}
						label={formatLabel(item)}
						variant={variant}
					/>
				))}
			</div>
		</div>
	);
};

export default FilterGroup;
