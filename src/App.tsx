import React from "react";
import ThemeProvider from "./components/ThemeProvider.js";
import { RouterProvider } from "react-router-dom";
import { router } from "./router/index.js";
import ErrorBoundary from "./components/ErrorBoundary.tsx";

const App = () => {
	return (
		<ThemeProvider>
			<ErrorBoundary>
				<RouterProvider router={router} />
			</ErrorBoundary>
		</ThemeProvider>
	);
};

export default App;
