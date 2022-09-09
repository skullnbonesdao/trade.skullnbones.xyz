import {defineConfig} from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  base: process.env.NODE_ENV === "production" ? "/" : "/",

  plugins: [vue()],
  optimizeDeps: {
    esbuildOptions: {
      target: "es2020",
    },
  },
  build: {
    target: "es2020",
  },
});
