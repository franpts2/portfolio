import React from "react";
import {
	Route,
	createBrowserRouter,
	createRoutesFromElements,
} from "react-router-dom";

import HomePage from "../pages/HomePage.tsx";
import AboutPage from "../pages/AboutPage.tsx";
import ExperiencePage from "../pages/ExperiencePage.tsx";
import ProjectsPage from "../pages/ProjectsPage.tsx";
import Layout from "../layouts/Layout.tsx";

export const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/" element={<Layout />}>
			<Route index element={<HomePage />} />
			<Route path="about" element={<AboutPage />} />
			<Route path="experience" element={<ExperiencePage />} />
			<Route path="projects" element={<ProjectsPage />} />
		</Route>
	)
);
