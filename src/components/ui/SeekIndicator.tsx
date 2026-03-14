import React from "react";
import { Icon } from "@iconify/react";

interface SeekIndicatorProps {
	direction: "forward" | "backward";
	visible: boolean;
	seconds?: number;
}

const SeekIndicator: React.FC<SeekIndicatorProps> = ({
	direction,
	visible,
	seconds = 10,
}) => {
	const isForward = direction === "forward";

	return (
		<div
			className={`absolute inset-y-0 ${isForward ? "right-0" : "left-0"} w-1/2 flex items-center justify-center pointer-events-none transition-opacity duration-300 ${
				visible ? "opacity-100" : "opacity-0"
			}`}
		>
			<div className="flex flex-col items-center gap-1 text-white">
				<div className="flex items-center">
					<Icon
						icon={isForward ? "mdi:chevron-right" : "mdi:chevron-left"}
						height={28}
					/>
					<Icon
						icon={isForward ? "mdi:chevron-right" : "mdi:chevron-left"}
						height={28}
						className="-ml-4"
					/>
					<Icon
						icon={isForward ? "mdi:chevron-right" : "mdi:chevron-left"}
						height={28}
						className="-ml-4"
					/>
				</div>
				<span className="text-xs font-semibold">
					{isForward ? "+" : "-"}
					{seconds}s
				</span>
			</div>
		</div>
	);
};

export default SeekIndicator;
