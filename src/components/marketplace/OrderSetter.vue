<template>
    <div>
        <div class="container mx-auto">
            <ul class="nav nav-tabs flex flex-col md:flex-row flex-wrap list-none border-b-0 pl-0 mb-4">
                <li class="nav-item flex-auto text-center">
                    <button
                        @click="currentTab(1)"
                        v-bind:class="tab === 1 ? 'active' : ''"
                        class="nav-link w-full block font-medium text-xs leading-tight uppercase px-6 py-3 my-2 hover:border-transparent hover:bg-gray-100 focus:border-transparent green"
                    >
                        Buy
                    </button>
                </li>
                <li class="nav-item flex-auto text-center">
                    <button
                        @click="currentTab(2)"
                        v-bind:class="tab === 2 ? 'active' : ''"
                        class="nav-link w-full block font-medium text-xs leading-tight uppercase px-6 py-3 my-2 hover:border-transparent hover:bg-gray-100 focus:border-transparent red"
                    >
                        Sell
                    </button>
                </li>
            </ul>
            <div class="p-3 mt-6 text-center">
                <p v-bind:class="tab === 1 ? 'block' : 'hidden'">
                    Buy price:{{ input.price }} Buy size:{{ input.size }}
                </p>
                <p v-bind:class="tab === 2 ? 'block' : 'hidden'">
                    Sell price:{{ input.price }} Sell size:{{ input.size }}
                </p>
                <p>PublicKey: {{ publicKey }}</p>
                <p>Asset Mint: {{ assetsStore.currentAsset }}</p>
                <div>
                    <TradeInput ref="input" />
                </div>
                <button
                    @click.prevent="submitOrder().then(() => {})"
                    id="order-submit-btn"
                    class="border hover:bg-gray-100 hover:border-transparent focus:border-transparent"
                >
                    {{ tab === 1 ? 'Buy' : 'Sell' }}
                </button>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import TradeInput from './TradeInput.vue'
import { useWallet } from 'solana-wallets-vue'
import { OrderSide } from '@staratlas/factory'
import { useStaratlasGmStore } from '../../stores/StaratlasGmStore'
import { useAssetsStore } from '../../stores/AssetsStore'
import { TOKEN_ATLAS, TOKEN_USDC } from '../../typescript/constants/tokens'
import { useSolanaNetworkStore } from '../../stores/SolanaNetworkStore'

const tab = ref(1)
const input = ref({ price: 0, size: 0 })
const currentTab = (tabNumber: number) => (tab.value = tabNumber)

const { publicKey, sendTransaction } = useWallet()
const staratlasGmStore = useStaratlasGmStore()
const assetsStore = useAssetsStore()
const solanaNetworkStore = useSolanaNetworkStore()

async function submitOrder() {
    console.log('clicked btn')

    if (publicKey.value !== null && assetsStore.currentAsset !== '') {
        const orderSide = tab.value === 1 ? OrderSide.Buy : OrderSide.Sell
        const { transaction, signers } = await staratlasGmStore.getInitializeOrderTransaction(
            publicKey.value,
            assetsStore.currentAsset,
            TOKEN_ATLAS,
            input.value.size,
            input.value.price,
            orderSide
        )
        const signature = sendTransaction(transaction, solanaNetworkStore.connection, {
            signers: signers,
        })
        // await solanaNetworkStore.connection.confirmTransaction(signature, 'processed');
    } else {
        console.log('not submitting')
    }
}
</script>
