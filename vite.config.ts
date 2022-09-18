import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Unocss from 'unocss/vite'
import Markdown from 'vite-plugin-vue-markdown'
import Shiki from 'markdown-it-shiki'
import LinkAttributes from 'markdown-it-link-attributes'
import * as path from 'path'

export default defineConfig({
    base: '/',

    plugins: [
        vue({
            include: [/\.vue$/, /\.md$/], // <--
        }),
        Markdown({
            wrapperClasses: 'prose prose-sm m-auto text-left',
            headEnabled: true,
            markdownItSetup(md) {
                // https://prismjs.com/
                md.use(Shiki, {
                    theme: {
                        light: 'vitesse-light',
                        dark: 'vitesse-dark',
                    },
                })
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

    server: {
        proxy: {
            '/api': {
                target: 'https://api2.skullnbones.xyz',
                changeOrigin: true,
                secure: false,
                ws: true,
                rewrite: (path) => path.replace(/^\/api/, ''),
            },
        },
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
