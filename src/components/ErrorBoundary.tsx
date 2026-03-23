import React from "react";
import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
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

	return (
		<div className="relative min-h-screen flex flex-col items-center justify-center px-4 py-12 bg-primary-bg text-primary">
			<div className="text-center max-w-md">
				{/* Error code */}
				<p className="text-7xl md:text-9xl font-bold text-red-500 font-heading mb-8">
					500
				</p>

				{/* Error title and message */}
				<h1 className="text-3xl md:text-4xl font-bold mb-4">
					Oops! Something went wrong
				</h1>
				<p className="text-lg text-secondary mb-8">
					An unexpected error occurred. Please try refreshing the page.
				</p>

				{/* Error details in dev mode */}
				{import.meta.env.DEV && error && (
					<div className="w-full max-w-md mb-8">
						<Accordion type="single">
							<AccordionItem value="error-details" trigger="Error Details">
								<p className="font-mono text-red-400">{error.message}</p>
							</AccordionItem>
						</Accordion>
					</div>
				)}

				{/* Action buttons */}
				<div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
					<Button
						text="Refresh Page"
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
