import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Unocss from 'unocss/vite'
import Markdown from 'vite-plugin-vue-markdown'
import Shiki from 'markdown-it-shiki'
// @ts-ignore
import LinkAttributes from 'markdown-it-link-attributes'

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

    server: {
        proxy: {
            '/rcpportal': {
                target: 'https://solana-mainnet.gateway.pokt.network/v1/lb/54c6d469ad149f8ca51f0908',
                changeOrigin: true,
                secure: true,
                ws: true,
                rewrite: (path) => path.replace(/^\/rcpportal/, ''),
            },

            '/api': {
                target: 'https://api2.skullnbones.xyz',
                changeOrigin: true,
                secure: false,
                ws: true,
                rewrite: (path) => path.replace(/^\/api/, ''),
            },
            '/ftx': {
                target: 'https://ftx.com/api',
                changeOrigin: true,
                secure: false,
                ws: true,
                rewrite: (path) => path.replace(/^\/ftx/, ''),
            },
        },
    },
})
