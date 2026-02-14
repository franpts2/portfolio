import React, { createContext, useEffect, useState } from "react";
import { ISDARK, _retrieveData, _storeData } from "../utils/localstorage.js";

export type ThemeContextType = {
	isDark: boolean;
	toggleTheme: () => void;
};

export const ThemeContext = createContext<ThemeContextType>({
	isDark: true,
	toggleTheme: () => {},
});

const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [isDark, setIsDark] = useState<boolean>(
		_retrieveData(ISDARK) ? _retrieveData(ISDARK) : true,
	);

	const toggleTheme = () => {
		const newIsDark = !isDark;
		document.documentElement.style.colorScheme = newIsDark ? "dark" : "light";
		_storeData(ISDARK, newIsDark);
		setIsDark(newIsDark);
	};

	useEffect(() => {
		if (_retrieveData(ISDARK) === null) {
			_storeData(ISDARK, true);
			setIsDark(true);
			document.documentElement.style.colorScheme = "dark";
		} else if (_retrieveData(ISDARK)) {
			setIsDark(true);
			document.documentElement.style.colorScheme = "dark";
		} else {
			setIsDark(false);
			document.documentElement.style.colorScheme = "light";
		}
	}, []);

	return (
		<ThemeContext.Provider value={{ isDark, toggleTheme }}>
			{children}
		</ThemeContext.Provider>
	);
};

export default ThemeProvider;
