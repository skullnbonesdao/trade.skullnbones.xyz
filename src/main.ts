import { createApp } from 'vue'
//import './style.css'
import App from './App.vue'
import { createPinia } from 'pinia'
import { createRouter, createWebHashHistory } from 'vue-router'
import './index.css'
import './style.css'
import Home from '../src/views/HomeView.vue'
import MarketplaceView from '../src/views/MarketplaceView.vue'
import PersonToPersonView from '../src/views/PersonToPersonView.vue'
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'solana-wallets-vue/styles.css'
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base'
import { PhantomWalletAdapter, SlopeWalletAdapter, SolflareWalletAdapter } from '@solana/wallet-adapter-wallets'
import SolanaWallets from 'solana-wallets-vue'

const pinia = createPinia()

const About = { template: '<div>About</div>' }

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

createApp(App).use(pinia).use(SolanaWallets, walletOptions).use(router).mount('#app')
