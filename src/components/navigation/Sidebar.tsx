import { Icon } from "@iconify/react";
import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { icons } from "../../assets/icons.js";

const navItems = [
	{ name: "Home", to: "/", icon: icons.home.outline },
	{ name: "About", to: "/about", icon: icons.about.outline },
	{ name: "Experience", to: "/experience", icon: icons.experience.outline },
	{ name: "Projects", to: "/projects", icon: icons.projects.outline },
];

const Sidebar = () => {
	const [activeIndex, setActiveIndex] = useState(0);
	const [hovered, setHovered] = useState(false);
	const isOpen = hovered;
	const sidebarRef = React.useRef<HTMLDivElement>(null);
	const navigate = useNavigate();
	const location = useLocation();

	// keyboard shortcuts (ctrl+arrowUp and ctrl+arrowDown to move between pages)
	React.useEffect(() => {
		const idx = navItems.findIndex((item) => item.to === location.pathname);
		if (idx !== -1) setActiveIndex(idx);

		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.ctrlKey && e.key === "ArrowUp") {
				setActiveIndex((prev) => {
					const newIndex = prev > 0 ? prev - 1 : prev;
					if (navItems[newIndex]) {
						navigate(navItems[newIndex].to);
					}
					return newIndex;
				});
				e.preventDefault();
			}
			if (e.ctrlKey && e.key === "ArrowDown") {
				setActiveIndex((prev) => {
					const newIndex = prev < navItems.length - 1 ? prev + 1 : prev;
					if (navItems[newIndex]) {
						navigate(navItems[newIndex].to);
					}
					return newIndex;
				});
				e.preventDefault();
			}
		};
		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, []);

	return (
		<>
			<div className="fixed top-4 left-4 z-60 px-1 rounded-md sm:hidden text-primary">
				<Icon icon={icons.menu.fill} height={24} />
			</div>
            
			<div
				ref={sidebarRef}
				className={`fixed flex flex-col justify-center h-screen px-3 py-6 z-50 pointer-events-auto`}
				onMouseEnter={() => setHovered(true)}
				onMouseLeave={() => setHovered(false)}
				style={{
					left: 0,
					top: 0,
					width: isOpen ? 200 : 56,
					transition: "width 260ms cubic-bezier(.2,.8,.2,1)",
				}}
			>
				{navItems.map(({ name, to, icon }, idx) => (
					<NavLink
						key={name}
						to={to}
						className={({ isActive }) => {
							return `flex items-center gap-1 font-family-body text-lg py-2 ${
								isActive || activeIndex === idx
									? "text-secondary-accent"
									: "text-primary"
							}`;
						}}
						onClick={() => {
							setActiveIndex(idx);
							navigate(to);
						}}
					>
						{/* fixed-size icon container so icons keep consistent size when collapsed */}
						<div className="w-10 flex-shrink-0 flex items-center justify-center">
							<Icon icon={icon} height={24} />
						</div>

						<span
							className="overflow-hidden block"
							style={{
								transition:
									"opacity 220ms ease, transform 260ms cubic-bezier(.2,.8,.2,1)",
								opacity: isOpen ? 1 : 0,
								transform: isOpen ? "translateX(0)" : "translateX(-8px)",
								whiteSpace: "nowrap",
								marginLeft: 1,
							}}
						>
							{name}
						</span>
					</NavLink>
				))}
			</div>
		</>
	);
};

export default Sidebar;
