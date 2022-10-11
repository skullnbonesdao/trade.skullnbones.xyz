<template>
    <div class="p-2 grid md:grid-cols-3 gap-2">
        <div class="col-span-3">
            <info-feed class="content-box" />
        </div>
        <div class="col-span-2">
            <trading-view-chart class="content-box" />
        </div>
        <div class="space-y-2">
            <order-setter class="content-box" />
            <orderbook-list class="content-box" />
            <assets-list class="content-box" />
        </div>
    </div>
</template>

<script lang="ts" setup>
import InfoFeed from '../components/feeds/InfoFeed.vue'
import OrderbookList from '../components/marketplace/OrderbookList.vue'
import AssetsList from '../components/marketplace/AssetsList.vue'
import { onMounted } from 'vue'
import { useTokenPriceStore } from '../stores/TokenPriceStore'
import { useSolanaNetworkStore } from '../stores/SolanaNetworkStore'
import { useStaratlasGmStore } from '../stores/StaratlasGmStore'
import { useAssetsStore } from '../stores/AssetsStore'
import TradingViewChart from '../components/charts/tradingview/TradingViewChart.vue'
import OrderSetter from '../components/marketplace/OrderSetter.vue'
import { useGlobalStore } from '../stores/GlobalStore'

onMounted(async () => {
    const globalStore = useGlobalStore()
    globalStore.init()

    const tokenPriceWebsocket = useTokenPriceStore()
    //tokenPriceWebsocket.init()
    const staratlasGmStore = useStaratlasGmStore()

    const solanaNetworkWebsocket = useSolanaNetworkStore()
    solanaNetworkWebsocket.init()
    solanaNetworkWebsocket.run_tps().catch((err) => console.error(`tps monitor: ${err}`))

    const assetsStore = useAssetsStore()
    await assetsStore.init()

    useStaratlasGmStore()
        .getOpenOrdersForAsset(
            useAssetsStore().allAssets?.find((asset) => useGlobalStore().symbol.includes(asset.symbol))?.mint ?? ''
        )
        .then(() => {})
        .catch((err) => console.log(err))
    /*await useStaratlasGmStore().getOpenOrdersForAsset(
useAssetsStore().allAssets?.find((asset) => useGlobalStore().symbol.includes(asset.symbol))?.mint ?? ''
)*/
})
</script>
