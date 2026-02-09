import React from "react";
import Badge from "./Badge.tsx";
import { Icon } from "@iconify/react";
import { icons } from "../assets/icons.js";

const Card = () => {
	return (
		<div className="bg-secondary-bg rounded-2xl p-8 flex flex-col w-xs gap-2 cursor-pointer hover:scale-105 shadow-lg">
			{/* header */}
			<div className="flex flex-row justify-between items-center">
				<h1 className="text-3xl text-primary-accent">Title</h1>
				<Badge variant="in progress" />
			</div>

			{/* description */}
			<p className="text-left">
				description of the project like a simple one i guess
			</p>

			{/* icons */}
			<div className="flex flex-row justify-between items-center">
                <Icon
					icon={icons.code.fill}
					height={24}
				/>
                <Icon
					icon={icons.group.fill}
					height={24}
				/>
			</div>
		</div>
	);
};

export default Card;
