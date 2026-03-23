import React from "react";
import Sidebar from "../components/navigation/Sidebar.js";
import ThemeSwitcher from "../components/ThemeSwitcher.js";
import ErrorBoundary from "../components/ErrorBoundary.tsx";
import { Outlet } from "react-router-dom";
import { AnimatePresence } from "motion/react";

const Layout = () => {
	return (
		<div className="flex min-h-screen">
			<Sidebar />
			<main className="flex-1">
				<div className="fixed top-4 right-4 z-60 pointer-events-auto">
					<ThemeSwitcher />
				</div>
				<ErrorBoundary>
					<AnimatePresence mode="wait">
						<Outlet />
					</AnimatePresence>
				</ErrorBoundary>
			</main>
		</div>
	);
};

export default Layout;
