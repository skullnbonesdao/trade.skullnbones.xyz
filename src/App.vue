<script lang="ts" setup>
import NavBar from './components/navigation/NavBar.vue'
import FooterComponent from './components/navigation/FooterComponent.vue'
import { onMounted } from 'vue'
import { useGlobalStore } from './stores/GlobalStore'
import { useTokenPriceStore } from './stores/TokenPriceStore'
import { useStaratlasGmStore } from './stores/StaratlasGmStore'
import { useAssetsStore } from './stores/AssetsStore'
import { useSolanaNetworkStore } from './stores/SolanaNetworkStore'

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

<template>
    <div class="h-screen justify-between bg-gray-200 dark:bg-gray-900">
        <NavBar class="bg-gray-200 dark:bg-gray-900"></NavBar>
        <RouterView class="bg-gray-200 dark:bg-gray-900"></RouterView>
        <footer-component class="bg-gray-200 dark:bg-gray-900"></footer-component>
    </div>
</template>

<style scoped></style>
