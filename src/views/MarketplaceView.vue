<template>
    <div class="">
        <InfoFeed />
        <div class="grid grid-cols-3 gap-3">
            <div class="col-span-2">
                <trading-view-chart />
            </div>
            <div>
                <orderbook-list />
                <order-setter />
                <!--                <assets-list />-->
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import InfoFeed from '../components/feeds/InfoFeed.vue'
import OrderbookList from '../components/marketplace/OrderbookList.vue'
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

    const tokenPriceWebsocket = useTokenPriceStore()
    //tokenPriceWebsocket.init()

    const solanaNetworkWebsocket = useSolanaNetworkStore()
    solanaNetworkWebsocket.init()
    solanaNetworkWebsocket.run_tps()

    const staratlasGmStore = useStaratlasGmStore()

    const assetsStore = useAssetsStore()
    await assetsStore.init()

    await useStaratlasGmStore().getOpenOrdersForAsset(
        useAssetsStore().allAssets?.find((asset) => useGlobalStore().symbol.includes(asset.symbol))?.mint ?? ''
    )
})
</script>