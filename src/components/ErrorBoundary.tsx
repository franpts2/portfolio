import React, { useContext } from "react";
import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "./ThemeProvider.tsx";
import Button from "./ui/buttons/Button.tsx";
import { Accordion, AccordionItem } from "./ui/Accordion.tsx";

interface Props {
	children: ReactNode;
}

interface State {
	hasError: boolean;
	error: Error | null;
}

class ErrorBoundary extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = { hasError: false, error: null };
	}

	static getDerivedStateFromError(error: Error): State {
		return { hasError: true, error };
	}

	componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
		console.error("Error caught by ErrorBoundary:", error, errorInfo);
	}

	render() {
		if (this.state.hasError) {
			return <ErrorFallback error={this.state.error} />;
		}

		return this.props.children;
	}
}

function ErrorFallback({ error }: { error: Error | null }) {
	const navigate = useNavigate();
	const { isDark } = useContext(ThemeContext);

	return (
		<div className="relative min-h-screen flex flex-col items-center justify-center px-4 py-12 bg-primary-bg text-primary">
			<div className="text-center max-w-md">
				{/* Error code with logo */}
				<div className="flex items-center justify-center gap-4 md:gap-8 mb-16">
					{/* 1st 5 */}
					<p className="text-7xl md:text-9xl font-bold text-primary-accent font-heading">
						5
					</p>

					{/* logo as 0 */}
					<div className="w-24 h-24 md:w-32 md:h-32 flex items-center justify-center relative hover:scale-110 transition-transform duration-300 text-primary-accent">
						<img
							src={isDark ? "/logo-dark.svg" : "/logo-light.svg"}
							alt="500 Logo"
							className="w-full h-full object-contain drop-shadow-lg"
						/>
						{/* glow effect */}
						<div className="absolute inset-0 rounded-full blur-2xl opacity-30 bg-secondary-accent" />
					</div>

					{/* last 0 */}
					<p className="text-7xl md:text-9xl font-bold text-primary-accent font-heading">
						0
					</p>
				</div>

				{/* error title & message */}
				<h1 className="text-3xl md:text-4xl font-bold mb-4 text-primary-accent">
					Oops! Something went wrong
				</h1>
				<p className="text-lg text-secondary mb-8">
					An unexpected error occurred. Please try refreshing the page.
				</p>

				{/* error details in dev mode */}
				{import.meta.env.DEV && error && (
					<div className="w-full max-w-md mb-8">
						<Accordion type="single">
							<AccordionItem value="error-details" trigger="Error Details">
								<p className="font-mono">{error.message}</p>
							</AccordionItem>
						</Accordion>
					</div>
				)}

				{/* action buttons */}
				<div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
					<Button
						text="Refresh Page"
						variant="accent"
						onClick={() => window.location.reload()}
					/>
					<Button
						text="Go Home"
						variant="primary"
						onClick={() => navigate("/")}
					/>
				</div>
			</div>
		</div>
	);
}

export default ErrorBoundary;
