import { createApp } from 'vue'
//import './style.css'
import App from './App.vue'
import { createPinia } from 'pinia'
import { createRouter, createWebHashHistory } from 'vue-router'
import '@unocss/reset/tailwind.css'
import '@kidonng/daisyui/full.min.css'
import 'uno.css'
import Home from '../src/views/HomeView.vue'
import MarketplaceView from '../src/views/MarketplaceView.vue'
import PersonToPersonView from '../src/views/PersonToPersonView.vue'
import About from '../src/views/About.vue'
// @ts-ignore
import { createHead } from '@vueuse/head' // <--
import 'solana-wallets-vue/styles.css'
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base'
import { PhantomWalletAdapter, SlopeWalletAdapter, SolflareWalletAdapter } from '@solana/wallet-adapter-wallets'
import SolanaWallets from 'solana-wallets-vue'

const head = createHead()
const pinia = createPinia()

const routes = [
    { path: '/', component: Home },
    { path: '/marketplace', component: MarketplaceView },
    { path: '/p2p', component: PersonToPersonView },
    { path: '/about', component: About },
]

const walletOptions = {
    wallets: [
        new PhantomWalletAdapter(),
        new SlopeWalletAdapter(),
        new SolflareWalletAdapter({ network: WalletAdapterNetwork.Devnet }),
    ],
    autoConnect: true,
}

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

createApp(App).use(head).use(pinia).use(SolanaWallets, walletOptions).use(router).mount('#app')
