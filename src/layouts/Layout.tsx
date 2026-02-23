import React from "react";
import Sidebar from "../components/navigation/Sidebar.js";
import ThemeSwitcher from "../components/ThemeSwitcher.js";
import { Outlet } from "react-router-dom";

const Layout = () => {
	return (
		<div className="flex min-h-screen">
			<Sidebar />
			<div className="flex-1">
				<div className="fixed top-4 right-4 z-60 pointer-events-auto">
					<ThemeSwitcher />
				</div>
				<Outlet />
			</div>
		</div>
	);
};

export default Layout;
