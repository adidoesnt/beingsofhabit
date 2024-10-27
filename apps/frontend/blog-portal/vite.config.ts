import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [TanStackRouterVite({}), react()],
  resolve: {
    alias: {
      "@/packages/types": path.resolve(
        __dirname,
        "../../../packages/types/lib",
      ),
      "@/packages/utils": path.resolve(
        __dirname,
        "../../../packages/utils/lib",
      ),
      "@": path.resolve(__dirname, "./src"),
    },
    preserveSymlinks: true,
  },
});
