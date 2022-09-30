<template>
    <div class="p-2">
        <info-feed class="mb-2" />
        <div class="grid md:grid-cols-3 gap-3">
            <div class="col-span-2">
                <trading-view-chart />
            </div>
            <div class="space-y-2">
                <order-setter />
                <orderbook-list />
                <assets-list />
            </div>
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