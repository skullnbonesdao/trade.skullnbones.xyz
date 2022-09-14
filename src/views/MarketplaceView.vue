<template>
    <div class="">
        <InfoFeed />
        <div class="grid grid-cols-4 gap-4">
            <!--      <div><TradingViewChart /></div>-->
            <div>
                <OrderbookList />
            </div>
            <div>
                <OrderSetter />
            </div>
            <div>
                <AssetsList />
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import InfoFeed from '../components/feeds/InfoFeed.vue'
import OrderSetter from '../components/trading/OrderSetter.vue'
import AssetsList from '../components/marketplace/AssetsList.vue'
import OrderbookList from '../components/trading/OrderbookList.vue'
import { onMounted } from 'vue'
import { useTokenPriceStore } from '../stores/TokenPriceStore'
import { useSolanaNetworkStore } from '../stores/SolanaNetworkStore'
import { useStaratlasGmStore } from '../stores/StaratlasGmStore'
import { useAssetsStore } from '../stores/AssetsStore'

onMounted(async () => {
    const tokenPriceWebsocket = useTokenPriceStore()
    //tokenPriceWebsocket.init()

    const solanaNetworkWebsocket = useSolanaNetworkStore()
    //solanaNetworkWebsocket.init()

    const staratlasGmStore = useStaratlasGmStore()

    const assetsStore = useAssetsStore()
    await assetsStore.init()
})
</script>