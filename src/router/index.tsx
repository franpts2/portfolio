import React, { Suspense } from "react";
import {
	Route,
	createBrowserRouter,
	createRoutesFromElements,
} from "react-router-dom";

import Layout from "../layouts/Layout.tsx";

// Lazy load pages to enable code splitting
const HomePage = React.lazy(() => import("../pages/HomePage.tsx"));
const AboutPage = React.lazy(() => import("../pages/AboutPage.tsx"));
const ExperiencePage = React.lazy(() => import("../pages/ExperiencePage.tsx"));
const ProjectsPage = React.lazy(() => import("../pages/ProjectsPage.tsx"));
const ProjectDetail = React.lazy(
	() => import("../components/projects/ProjectDetail.tsx"),
);

// Loading fallback component
const PageLoader = () => (
	<div className="flex items-center justify-center min-h-screen">
		Loading...
	</div>
);

export const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/" element={<Layout />}>
			<Route
				index
				element={
					<Suspense fallback={<PageLoader />}>
						<HomePage />
					</Suspense>
				}
			/>
			<Route
				path="about"
				element={
					<Suspense fallback={<PageLoader />}>
						<AboutPage />
					</Suspense>
				}
			/>
			<Route
				path="experience"
				element={
					<Suspense fallback={<PageLoader />}>
						<ExperiencePage />
					</Suspense>
				}
			/>
			<Route
				path="projects"
				element={
					<Suspense fallback={<PageLoader />}>
						<ProjectsPage />
					</Suspense>
				}
			/>
			<Route
				path="/projects/:projectId"
				element={
					<Suspense fallback={<PageLoader />}>
						<ProjectDetail />
					</Suspense>
				}
			/>
		</Route>,
	),
);
