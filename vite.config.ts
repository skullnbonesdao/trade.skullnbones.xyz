import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'


// https://vitejs.dev/config/
export default defineConfig({
    base: "/trade.skullnbones.xyz/",
    plugins: [vue(),],
    optimizeDeps: {
        esbuildOptions: {
            target: 'es2020'
        }
    },
    build: {
        target: 'es2020'
    }

})
