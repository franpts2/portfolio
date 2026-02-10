import React from "react";
import { Icon } from "@iconify/react";
import { icons } from "../assets/icons.js";

const Button = () => {
	return (
		<div className="bg-tertiary-bg text-primary px-4 py-2 rounded-lg shadow-sm cursor-pointer flex flex-row gap-2 items-center">
			<p>Check it out!</p>
			<Icon icon={icons.arrowOutward.fill} height={20} />
		</div>
	);
};

export default Button;
