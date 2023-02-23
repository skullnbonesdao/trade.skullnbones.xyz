import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Unocss from 'unocss/vite'
import Markdown from 'vite-plugin-vue-markdown'
import Shiki from 'markdown-it-shiki'
// @ts-ignore
import LinkAttributes from 'markdown-it-link-attributes'
import * as path from 'path'

export default defineConfig({
    base: '/',

    server: {
        proxy: {
            '/coingecko': {
                target: 'https://api.coingecko.com/api/v3/coins/markets',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/coingecko/, ''),
            },
            '/api': {
                target: 'https://api2.skullnbones.xyz',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, ''),
            },
        },
    },
    preview: {
        proxy: {
            '/coingecko': {
                target: 'https://api.coingecko.com/api/v3/coins/markets',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/coingecko/, ''),
            },
        },
    },
    resolve: {
        alias: {
            process: 'process/browser',
            stream: 'stream-browserify',
            zlib: 'browserify-zlib',
            util: 'util',
        },
    },

    plugins: [
        vue({
            include: [/\.vue$/, /\.md$/], // <--
        }),
        Markdown({
            wrapperClasses: 'prose prose-sm m-auto text-left',
            headEnabled: true,
            markdownItSetup(md) {
                // https://prismjs.com/
                md.use(Shiki, {})
                md.use(LinkAttributes, {
                    matcher: (link: string) => /^https?:\/\//.test(link),
                    attrs: {
                        target: '_blank',
                        rel: 'noopener',
                    },
                })
            },
        }),

        Unocss(),
    ],
    optimizeDeps: {
        esbuildOptions: {
            target: 'es2020',
        },
    },
    build: {
        target: 'es2020',
    },
})
