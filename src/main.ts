import { createApp } from 'vue'
import { createVfm } from 'vue-final-modal'

//import './style.css'
import App from './App.vue'
import { createPinia } from 'pinia'
import { createRouter, createWebHashHistory } from 'vue-router'
import 'vue-final-modal/style.css'
import './index.css'
import '@unocss/reset/tailwind.css'
import '@kidonng/daisyui/full.min.css'
import 'uno.css'
import './style.scss'
import 'mosha-vue-toastify/dist/style.css'
import Home from '../src/views/HomeView.vue'
import MarketplaceView from '../src/views/MarketplaceView.vue'
import ExplorerView from './views/ExplorerView.vue'
import PersonToPersonView from '../src/views/PersonToPersonView.vue'
import OrdersView from '../src/views/OrdersView.vue'
import PortfolioView from '../src/views/PortfolioView.vue'
import StatsView from '../src/views/StatsView.vue'
import About from '../src/views/About.vue'
import 'solana-wallets-vue/styles.css'
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base'
import { PhantomWalletAdapter, SlopeWalletAdapter, SolflareWalletAdapter } from '@solana/wallet-adapter-wallets'
import SolanaWallets from 'solana-wallets-vue'
import SmartTable from 'vuejs-smart-table'
import VueApexCharts from 'vue3-apexcharts'
import { createHead } from '@vueuse/head'

const head = createHead()
const pinia = createPinia()

const routes = [
    { path: '/', component: Home },
    { path: '/marketplace', component: MarketplaceView },
    { path: '/explorer', component: ExplorerView },
    { path: '/p2p', component: PersonToPersonView },
    { path: '/orders', component: OrdersView },
    { path: '/portfolio', component: PortfolioView },
    { path: '/stats', component: StatsView },
    { path: '/about', component: About },
]

const walletOptions = {
    wallets: [
        new PhantomWalletAdapter({ network: WalletAdapterNetwork.Mainnet }),
        new SolflareWalletAdapter({ network: WalletAdapterNetwork.Mainnet }),
    ],
    autoConnect: true,
}

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})
const vfm = createVfm()

createApp(App)
    .use(head)
    .use(pinia)
    .use(vfm)
    .use(SolanaWallets, walletOptions)
    .use(VueApexCharts)
    .use(SmartTable)
    .use(router)
    .mount('#app')
