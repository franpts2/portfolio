import React, { useContext } from "react";

type TagProps = {
	text: string;
};

const Tag: React.FC<TagProps> = ({ text }) => {
	return (
		<div
			className={`inline-block px-3 py-1 rounded-full font-bold text-sm text-center w-fit text-primary/50 bg-secondary-bg shadow cursor-default`}
		>
			{text}
		</div>
	);
};

export default Tag;
