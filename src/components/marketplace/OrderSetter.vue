<template>
    <div>
        <div class="container mx-auto">
            <div class="flex flex-row space-x-2">
                <button
                    @click="currentTab(1)"
                    v-bind:class="tab === 1 ? 'bg-green-500' : 'border-2'"
                    class="w-full block font-medium leading-tight uppercase px-6 py-3 my-2 hoverable"
                >
                    Buy
                </button>

                <button
                    @click="currentTab(2)"
                    v-bind:class="tab === 2 ? 'bg-red-500' : 'border-2'"
                    class="w-full block font-medium leading-tight uppercase px-6 py-3 my-2 hoverable"
                >
                    Sell
                </button>
            </div>
            <div class="p-3 text-center">
                <div class="flex flex-col space-y-2">
                    <TradeInput ref="input" />
                </div>
            </div>
            <button
                @click.prevent="submitOrder().then(() => {})"
                id="order-submit-btn"
                :class="tab === 1 ? 'bg-green-500' : 'bg-red-500'"
                class="nav-link w-full block font-medium leading-tight uppercase px-6 py-3 my-2 hoverable"
            >
                {{ tab === 1 ? 'Buy' : 'Sell' }}
            </button>
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
import TextBox from '../buttons/TextBox.vue'

const tab = ref(1)
const input = ref({
    price: {
        text_box_value: useGlobalStore().user_order_params.price,
    },
    size: {
        text_box_value: useGlobalStore().user_order_params.size,
    },
})
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
    if (input.value.size.text_box_value === 0 || input.value.price.text_box_value === 0)
        return createToast('Incorrect price or size', { type: 'danger' })
    // when wallet has no specific tokens `account` is an empty object
    if (availableTokenData === undefined)
        return createToast('No available token data on this wallet', { type: 'danger' })
    const availableTokens = availableTokenData.data.account.data?.parsed?.info?.tokenAmount?.uiAmount

    if (availableTokens === undefined) return createToast('Empty token data', { type: 'danger' })

    console.log(input.value.size.toString())

    const neededTokens = input.value.size.text_box_value * input.value.price.text_box_value
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
        input.value.size.text_box_value,
        input.value.price.text_box_value,
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
