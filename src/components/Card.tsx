import React from "react";
import Badge from "./Badge.tsx";
import { Icon } from "@iconify/react";
import { icons } from "../assets/icons.js";

type CardProps = {
	title: string;
	description: string;
    isCollab: boolean;
};

const Card: React.FC<CardProps> = ({ title, description, isCollab }) => {
	return (
		<div className="bg-secondary-bg rounded-2xl p-8 flex flex-col w-xs gap-3 cursor-pointer hover:scale-105 shadow-lg">
			{/* header */}
			<div className="flex flex-row justify-between items-center">
				<h1 className="text-2xl text-primary-accent">{title}</h1>
				<Badge variant="in progress" />
			</div>

			{/* description */}
			<p className="text-left">{description}</p>

			{/* icons */}
			<div className="flex flex-row justify-between items-center">
				<Icon icon={icons.code.fill} height={24} />
				<Icon icon={isCollab ? icons.group.fill : icons.about.fill} height={24} />
			</div>
		</div>
	);
};

export default Card;
