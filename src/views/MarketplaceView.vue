<template>
    <div class="">
        <info-feed class="content-box" />
    </div>
    <div class="flex flex-col md:flex-row">
        <div class="basis-2/3">
            <trading-view-chart class="content-box" />
            <order-table :orders="orders" class="content-box"></order-table>
        </div>
        <div class="basis-1/3">
            <order-setter class="content-box" />
            <order-book class="content-box" />
        </div>
    </div>
</template>

<script lang="ts" setup>
import InfoFeed from '../components/feeds/InfoFeed.vue'
import { onMounted, watchEffect } from 'vue'
import { useTokenPriceStore } from '../stores/TokenPriceStore'
import { useSolanaNetworkStore } from '../stores/SolanaNetworkStore'
import { useStaratlasGmStore } from '../stores/StaratlasGmStore'
import { useAssetsStore } from '../stores/AssetsStore'
import TradingViewChart from '../components/charts/tradingview/TradingViewChart.vue'
import OrderSetter from '../components/marketplace/OrderSetter.vue'
import { useGlobalStore } from '../stores/GlobalStore'
import { ref } from 'vue'
import { useWallet } from 'solana-wallets-vue'
import OrderTable from '../components/tables/OrderTable.vue'
import OrderBook from '../components/marketplace/orderbook/OrderBook.vue'

const orders = ref()
onMounted(async () => {
    const globalStore = useGlobalStore()
    globalStore.init()

    const tokenPriceWebsocket = useTokenPriceStore()
    await tokenPriceWebsocket.init()

    const solanaNetworkWebsocket = useSolanaNetworkStore()
    solanaNetworkWebsocket.init()
    solanaNetworkWebsocket.run_tps().catch((err) => console.error(`tps monitor: ${err}`))

    const assetsStore = useAssetsStore()
    await assetsStore.init()

    useStaratlasGmStore()
        .getOpenOrdersForAsset(
            useAssetsStore().allAssets?.find((asset) => useGlobalStore().symbol.name.includes(asset.symbol))?.mint ?? ''
        )
        .then(() => {})
        .catch((err) => console.log(err))
})

watchEffect(async () => {
    orders.value = await useStaratlasGmStore().getOpenOrdersForPlayer(useWallet().publicKey.value)
})
</script>
