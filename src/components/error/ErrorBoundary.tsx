import React, { type ReactNode } from "react";
import { Button } from "../ui/Button.js";

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
	return (
		<div className="min-h-screen flex flex-col items-center justify-center px-4 py-12 bg-(--color-bg) text-(--color-ink)">
			<div className="text-center max-w-md">
				<p className="text-7xl md:text-9xl font-display font-semibold text-(--color-accent)">
					500
				</p>
				<h1 className="text-3xl md:text-4xl font-display font-semibold mt-6 mb-4">
					Oops! Something went wrong
				</h1>
				<p className="text-lg text-(--color-ink-muted) mb-8">
					An unexpected error occurred. Please try refreshing the page.
				</p>
				{import.meta.env.DEV && error && (
					<p className="font-mono text-sm text-(--color-ink-muted) mb-8">
						{error.message}
					</p>
				)}
				<Button
					variant="accent"
					className="px-5 py-2.5"
					onClick={() => window.location.reload()}
				>
					Refresh Page
				</Button>
			</div>
		</div>
	);
}

export { ErrorBoundary };
