import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import * as path from 'path'
import Unocss from 'unocss/vite'

export default defineConfig({
    base: './',

    plugins: [vue(), Unocss()],
    optimizeDeps: {
        esbuildOptions: {
            target: 'es2020',
        },
    },
    build: {
        target: 'es2020',
    },
    resolve: {
        alias: {
            process: 'process/browser',
            stream: 'stream-browserify',
            zlib: 'browserify-zlib',
            util: 'util',
            web3: path.resolve(__dirname, './node_modules/web3/dist/web3.min.js'),
        },
    },
})
