import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "VITE_");
  const apiOrigin = env.VITE_API_ORIGIN || "http://localhost:8081";

  return {
    base: "/",
    plugins: [react()],
    build: {
      outDir: "dist",
      sourcemap: false,
      rollupOptions: {
        output: {
          entryFileNames: "assets/[name]-[hash].js",
          chunkFileNames: "assets/[name]-[hash].js",
          assetFileNames: "assets/[name]-[hash][extname]",
          manualChunks: {
            "vendor-react": ["react", "react-dom"],
            "vendor-query": ["@tanstack/react-query"],
          },
        },
      },
    },
    server: {
      port: 5174,
      proxy: {
        "/api": { target: apiOrigin, changeOrigin: true },
        "/media": { target: apiOrigin, changeOrigin: true },
        "^/[a-z]{2}/.+/data/$": { target: apiOrigin, changeOrigin: true },
      },
    },
  };
});