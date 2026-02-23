import { Icon } from "@iconify/react";
import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
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
	const [mobileOpen, setMobileOpen] = useState(false); // Added mobileOpen state
	const [hoveredItemIndex, setHoveredItemIndex] = useState<number | null>(null);
	const isOpen = hovered;
	const sidebarRef = React.useRef<HTMLDivElement>(null);
	const navigate = useNavigate();
	const location = useLocation();

	// keyboard shortcuts (ctrl+arrowUp and ctrl+arrowDown to move between pages)
	React.useEffect(() => {
		const idx = navItems.findIndex((item) => item.to === location.pathname);
		if (idx !== -1) {
			setActiveIndex(idx);
		} else {
			setActiveIndex(-1);
		}

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
	}, [location.pathname, navigate]);

	return (
		<>
			{/* Blurred background overlay */}
			<AnimatePresence>
				{mobileOpen && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.3 }}
						className="fixed inset-0 backdrop-blur-3xl z-50"
						onClick={() => setMobileOpen(false)} // close menu when clicking the overlay
					>
						<div className="relative min-h-screen flex items-center px-4 sm:px-6">
							<motion.div
								initial={{ opacity: 0, scale: 0.95 }}
								animate={{ opacity: 1, scale: 1 }}
								exit={{ opacity: 0, scale: 0.95 }}
								transition={{ duration: 0.3 }}
								className="mx-auto text-center max-w-3xl relative"
							>
								{navItems.map(({ name, to, icon }, idx) => (
									<motion.div
										key={name}
										initial={{ opacity: 0, y: 20 }}
										animate={{ opacity: 1, y: 0 }}
										exit={{ opacity: 0, y: -20 }}
										transition={{
											duration: 0.3,
											delay: idx * 0.05,
										}}
									>
										<NavLink
											to={to}
											end
											className={({ isActive }) => {
												return `flex flex-col items-center justify-center gap-2 font-family-body text-xl py-2 ${
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
											<span
												className="block"
												style={{
													whiteSpace: "nowrap",
												}}
											>
												{name}
											</span>
										</NavLink>
									</motion.div>
								))}
							</motion.div>
						</div>
					</motion.div>
				)}
			</AnimatePresence>

			<motion.button
				whileHover={{ scale: 1.1 }}
				whileTap={{ scale: 0.95 }}
				className="fixed top-4 left-4 z-60 px-2 rounded-md lg:hidden text-primary transition-transform duration-300 ease-in-out"
				onClick={() => setMobileOpen((prev) => !prev)}
			>
				<motion.div
					animate={{ rotate: mobileOpen ? 90 : 0 }}
					transition={{ duration: 0.3 }}
				>
					<Icon
						icon={mobileOpen ? icons.close.fill : icons.menu.fill}
						height={24}
						className="transition-transform duration-300 ease-in-out"
						style={{
							transform: mobileOpen ? "scale(1.2)" : "scale(1)",
						}}
					/>
				</motion.div>
			</motion.button>

			<motion.div
				ref={sidebarRef}
				className={`hidden lg:flex fixed flex-col justify-center h-screen px-3 py-6 z-50 pointer-events-auto`}
				onMouseEnter={() => setHovered(true)}
				onMouseLeave={() => setHovered(false)}
				initial={{ x: -56 }}
				animate={{ x: 0 }}
				transition={{ duration: 0.5, ease: "easeOut" }}
				style={{
					left: 0,
					top: 0,
					width: isOpen ? 200 : 56,
					transition: "width 260ms cubic-bezier(.2,.8,.2,1)",
				}}
			>
				{navItems.map(({ name, to, icon }, idx) => (
					<motion.div
						key={name}
						initial={{ opacity: 0, x: -20 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{
							x: { duration: 0.15 },
							opacity: { duration: 0.4, delay: idx * 0.1 },
							ease: "easeOut",
						}}
						whileHover={{
							x: 4,
						}}
						onHoverStart={() => setHoveredItemIndex(idx)}
						onHoverEnd={() => setHoveredItemIndex(null)}
					>
						<NavLink
							to={to}
							end
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
							<motion.div
								className="w-10 shrink-0 flex items-center justify-center"
								animate={{
									scale: hoveredItemIndex === idx ? 1.1 : 1,
									rotate: hoveredItemIndex === idx ? 5 : 0,
								}}
								transition={{ duration: 0.2 }}
								whileTap={{ scale: 0.95 }}
							>
								<Icon icon={icon} height={24} />
							</motion.div>

							<motion.span
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
							</motion.span>
						</NavLink>
					</motion.div>
				))}
			</motion.div>
		</>
	);
};

export default Sidebar;
