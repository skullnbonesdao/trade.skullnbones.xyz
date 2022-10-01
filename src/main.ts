import { createApp } from 'vue'
//import './style.css'
import App from './App.vue'
import { createPinia } from 'pinia'
import { createRouter, createWebHashHistory } from 'vue-router'
import '@unocss/reset/tailwind.css'
import '@kidonng/daisyui/full.min.css'
import 'uno.css'
import './style.scss'
import Home from '../src/views/HomeView.vue'
import MarketplaceView from '../src/views/MarketplaceView.vue'
import PersonToPersonView from '../src/views/PersonToPersonView.vue'
import OrdersView from '../src/views/OrdersView.vue'
import PortfolioView from '../src/views/PortfolioView.vue'
import StatsView from '../src/views/StatsView.vue'
import About from '../src/views/About.vue'
// @ts-ignore
import { createHead } from '@vueuse/head' // <--
import 'solana-wallets-vue/styles.css'
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base'
import { PhantomWalletAdapter, SlopeWalletAdapter, SolflareWalletAdapter } from '@solana/wallet-adapter-wallets'
import SolanaWallets from 'solana-wallets-vue'
import SmartTable from 'vuejs-smart-table'

const head = createHead()
const pinia = createPinia()

const routes = [
    { path: '/', component: Home },
    { path: '/marketplace', component: MarketplaceView },
    { path: '/p2p', component: PersonToPersonView },
    { path: '/orders', component: OrdersView },
    { path: '/portfolio', component: PortfolioView },
    { path: '/stats', component: StatsView },
    { path: '/about', component: About },
]

const walletOptions = {
    wallets: [
        new PhantomWalletAdapter(),
        new SlopeWalletAdapter(),
        new SolflareWalletAdapter({ network: WalletAdapterNetwork.Mainnet }),
    ],
    autoConnect: true,
}

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

createApp(App).use(head).use(pinia).use(SolanaWallets, walletOptions).use(SmartTable).use(router).mount('#app')
