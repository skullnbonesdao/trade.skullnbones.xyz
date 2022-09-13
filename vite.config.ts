import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import inject from "@rollup/plugin-inject";

// https://vitejs.dev/config/
export default defineConfig({
    base: './',

    plugins: [
        inject({
            Buffer: ['buffer', 'Buffer'],
        }),
        vue(),
    ],
    optimizeDeps: {
        esbuildOptions: {
            target: 'es2020',
        },
        include: ['buffer'],
    },
    build: {
        target: 'es2020',
    },
})
