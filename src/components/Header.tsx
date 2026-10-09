import { useState } from "react";
import { Icon } from "@iconify/react";
import { motion, AnimatePresence } from "motion/react";
import { icons } from "../assets/icons.js";

const navItems = [
	{ label: "About", href: "#about" },
	{ label: "Work", href: "#work" },
	{ label: "Experience", href: "#experience" },
	{ label: "Fun Facts", href: "#fun-facts" },
	{ label: "Contact", href: "#contact" },
];

export function Header() {
	const [mobileOpen, setMobileOpen] = useState(false);

	return (
		<header className="fixed top-0 left-0 right-0 z-50 bg-(--color-bg)/90 backdrop-blur-sm hairline">
			<div className="container-main">
				<nav
					className="flex items-center justify-between h-16 md:h-20"
					aria-label="Primary"
				>
					<a
						href="#"
						className="font-display font-semibold text-lg tracking-tight text-(--color-ink) hover:text-(--color-accent) transition-colors"
						aria-label="Francisca Portugal — Home"
					>
						f.pt
					</a>

					{/* Desktop links */}
					<ul className="hidden md:flex items-center gap-8">
						{navItems.map((item) => (
							<li key={item.href}>
								<a
									href={item.href}
									className="t-label hover:text-(--color-accent) transition-colors"
								>
									{item.label}
								</a>
							</li>
						))}
					</ul>

					{/* Mobile menu button */}
					<button
						type="button"
						className="md:hidden p-2 -mr-2 text-(--color-ink) hover:text-(--color-accent) transition-colors"
						onClick={() => setMobileOpen((prev) => !prev)}
						aria-expanded={mobileOpen}
						aria-controls="mobile-menu"
						aria-label={mobileOpen ? "Close menu" : "Open menu"}
					>
						<Icon
							icon={mobileOpen ? icons.close.outline : icons.menu.outline}
							height={24}
						/>
					</button>
				</nav>
			</div>

			{/* Mobile menu */}
			<AnimatePresence>
				{mobileOpen && (
					<motion.div
						id="mobile-menu"
						initial={{ opacity: 0, height: 0 }}
						animate={{ opacity: 1, height: "auto" }}
						exit={{ opacity: 0, height: 0 }}
						transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
						className="md:hidden overflow-hidden bg-(--color-bg) hairline"
					>
						<ul className="container-main py-4 flex flex-col gap-3">
							{navItems.map((item, idx) => (
								<motion.li
									key={item.href}
									initial={{ opacity: 0, x: -12 }}
									animate={{ opacity: 1, x: 0 }}
									transition={{ delay: idx * 0.05 }}
								>
									<a
										href={item.href}
										className="block py-2 text-lg font-display font-medium text-(--color-ink) hover:text-(--color-accent) transition-colors"
										onClick={() => setMobileOpen(false)}
									>
										{item.label}
									</a>
								</motion.li>
							))}
						</ul>
					</motion.div>
				)}
			</AnimatePresence>
		</header>
	);
}
