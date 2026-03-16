import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
	plugins: [react(), tailwindcss()],
	build: {
		rollupOptions: {
			output: {
				// Split vendor libraries into separate chunk
				manualChunks: {
					react: ["react", "react-dom", "react-router-dom"],
					ui: ["@iconify/react", "motion"],
				},
			},
		},
		// Report compressed size instead of raw size
		reportCompressedSize: true,
		// Minify with terser for better compression
		minify: "terser",
		terserOptions: {
			compress: {
				drop_console: true,
				drop_debugger: true,
			},
		},
	},
});
