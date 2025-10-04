import React from "react";
import ThemeProvider from "./components/ThemeProvider.js";
import { RouterProvider } from "react-router-dom";
import { router } from "./router/index.js";

const App = () => {
	return (
		<ThemeProvider>
			<RouterProvider router={router} />
		</ThemeProvider>
	);
};

export default App;
