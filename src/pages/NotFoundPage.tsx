import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../components/ThemeProvider.tsx";
import Button from "../components/ui/buttons/Button.tsx";

export default function NotFoundPage() {
	const navigate = useNavigate();
	const { isDark } = useContext(ThemeContext);

	return (
		<div className="relative min-h-screen flex flex-col items-center justify-center px-4 py-12 bg-primary-bg text-primary">
			{/* Main 404 display */}
			<div className="flex items-center justify-center gap-4 md:gap-8 mb-16">
				{/* First 4 */}
				<p className="text-7xl md:text-9xl font-bold text-primary-accent font-heading">
					4
				</p>

				{/* Logo as 0 */}
				<div className="w-24 h-24 md:w-32 md:h-32 flex items-center justify-center relative hover:scale-110 transition-transform duration-300 text-primary-accent">
					<img
						src={isDark ? "/logo-dark.svg" : "/logo-light.svg"}
						alt="404 Logo"
						className="w-full h-full object-contain drop-shadow-lg"
					/>
					{/* Glow effect around logo */}
					<div className="absolute inset-0 rounded-full blur-2xl opacity-30 bg-secondary-accent" />
				</div>

				{/* Last 4 */}
				<p className="text-7xl md:text-9xl font-bold text-primary-accent font-heading">
					4
				</p>
			</div>

			{/* Error message */}
			<div className="text-center mb-8">
				<h1 className="text-2xl md:text-3xl font-bold mb-3 text-primary-accent">
					Something went wrong!
				</h1>
				<p className="text-lg text-secondary">
					The page you're looking for doesn't exist or has been moved.
				</p>
			</div>

			{/* Action buttons */}
			<div className="flex gap-4 flex-wrap justify-center">
				<Button
					onClick={() => navigate("/")}
					variant="accent"
					text="Back to Home"
				/>
			</div>
		</div>
	);
}
