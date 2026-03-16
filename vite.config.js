import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import compression from "vite-plugin-compression";

// https://vite.dev/config/
export default defineConfig({
	plugins: [
		react(),
		tailwindcss(),
		// Enable gzip and brotli compression for faster document delivery
		compression({
			algorithm: "gzip",
			ext: ".gz",
			deleteOriginFile: false,
			threshold: 1024, // Only compress files > 1KB
		}),
		compression({
			algorithm: "brotliCompress",
			ext: ".br",
			deleteOriginFile: false,
			threshold: 1024,
		}),
	],
	build: {
		// Optimize initial document size
		cssCodeSplit: true,
		// Inline small assets to reduce additional requests
		assetsInlineLimit: 4096,
		rollupOptions: {
			output: {
				// Split vendor libraries into separate chunk to improve caching
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
	// Optimize server response time
	server: {
		// Enable compression on dev server too
		middlewareMode: false,
		// Use correct mimeType for .mjs files
		mimeTypes: {
			".mjs": "application/javascript",
		},
	},
});
