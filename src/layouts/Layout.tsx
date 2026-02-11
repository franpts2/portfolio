import React from "react";
import Sidebar from "../components/navigation/Sidebar.js";
import ThemeSwitcher from "../components/ThemeSwitcher.js";
import { Outlet, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

const Layout = () => {
	const location = useLocation();

	return (
		<div className="flex min-h-screen">
			<Sidebar />
			<div className="flex-1">
				<div className="fixed top-4 right-4 z-60 pointer-events-auto">
					<ThemeSwitcher />
				</div>
				<AnimatePresence mode="wait">
					<Outlet key={location.pathname} />
				</AnimatePresence>
			</div>
		</div>
	);
};

export default Layout;
