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
                <p>Asset Mint: {{ useGlobalStore().symbol.mint_asset }}</p>
                <p>Pair Mint: {{ useGlobalStore().symbol.mint_pair }}</p>
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
import { useGlobalStore } from '../../stores/GlobalStore'
import { useSolanaNetworkStore } from '../../stores/SolanaNetworkStore'
import { createToast } from 'mosha-vue-toastify'
import { watch } from 'vue'
import { CURRENCIES } from '../../typescript/constants/currencies'
import { PublicKey } from '@solana/web3.js'

const tab = ref(1)
const input = ref({ price: 0, size: 0 })
const currentTab = (tabNumber: number) => (tab.value = tabNumber)

const { publicKey, sendTransaction } = useWallet()
const staratlasGmStore = useStaratlasGmStore()
const globalStore = useGlobalStore()
const solanaNetworkStore = useSolanaNetworkStore()

async function submitOrder() {
    if (publicKey.value === null) return createToast('Wallet not connected', { type: 'danger' })
    if (globalStore.symbol.mint_asset === undefined) return createToast('Asset not selected', { type: 'danger' })
    const availableTokenData = globalStore.userTokens.find(
        (userToken) => userToken.mint === useGlobalStore().symbol.mint_pair.toString()
    )
    if (input.value.size === 0 || input.value.price === 0)
        return createToast('Incorrect price or size', { type: 'danger' })
    // when wallet has no specific tokens `account` is an empty object
    if (availableTokenData === undefined)
        return createToast('No available token data on this wallet', { type: 'danger' })
    const availableTokens = availableTokenData.data.account.data?.parsed?.info?.tokenAmount?.uiAmount

    if (availableTokens === undefined) return createToast('Empty token data', { type: 'danger' })

    const neededTokens = input.value.size * input.value.price
    const orderSide = tab.value === 1 ? OrderSide.Buy : OrderSide.Sell

    if (orderSide === OrderSide.Buy && neededTokens > availableTokens)
        return createToast(
            `Not enough ${CURRENCIES.find((currency) => useGlobalStore().symbol.name.includes(currency.name))?.name}`,
            { type: 'danger' }
        )

    if (orderSide === OrderSide.Sell) {
        const selectedUserAsset = globalStore.userStarAtlasNfts.find(
            (asset) => asset.account.data?.parsed?.info?.mint === globalStore.symbol.mint_asset.toString()
        )
        const selectedUserAssetAmount = selectedUserAsset?.account?.data?.parsed?.info?.tokenAmount?.uiAmount
        if (selectedUserAssetAmount < input.value.size)
            return createToast(`Not enough ${globalStore.symbol.name}`, { type: 'danger' })
    }
    const { transaction, signers } = await staratlasGmStore.getInitializeOrderTransaction(
        publicKey.value,
        globalStore.symbol.mint_asset.toString(),
        new PublicKey(availableTokenData.data.account.data?.parsed?.info?.mint),
        input.value.size,
        input.value.price,
        orderSide
    )
    const signature = await sendTransaction(transaction, solanaNetworkStore.connection, {
        signers: signers,
    })
    const latestBlockHash = await solanaNetworkStore.connection.getLatestBlockhash()
    solanaNetworkStore.connection
        .confirmTransaction(
            {
                blockhash: latestBlockHash.blockhash,
                lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
                signature: signature,
            },
            'processed'
        )
        .then((result) =>
            result.value.err === null
                ? createToast('Order created', { type: 'success' })
                : createToast('Error creating order', { type: 'danger' })
        )
}
watch(
    () => publicKey.value,
    async (publicKey) => {
        if (publicKey !== null) {
            await globalStore.refreshAccountInfo(publicKey)
        }
    }
)
</script>
