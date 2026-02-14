const techNameMap: Record<string, string> = {
	php: "PHP",
	js: "JavaScript",
	tailwind: "Tailwind CSS",
	postgres: "PostgreSQL",
	html: "HTML",
	css: "CSS",
	sqlite: "SQLite",
	ts: "TypeScript",
	cpp: "C++",
};

export const formatTechName = (tech: string): string => {
	const mapped = techNameMap[tech.toLowerCase()];
	if (mapped) {
		return mapped;
	}

	// else capitalize the 1st letter
	return tech.charAt(0).toUpperCase() + tech.slice(1);
};

export const capitalize = (str: string): string => {
	return str.charAt(0).toUpperCase() + str.slice(1);
};

export const normalize = (str: string): string => {
	return str
		.split("-")
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join(" ");
};

export const slugify = (str: string): string => {
	return str
		.toLowerCase()
		.normalize("NFD")
		.replace(/[\u0300-\u036f]/g, "")
		.replace(/ç/g, "c")
		.replace(/\s+/g, "-");
};
