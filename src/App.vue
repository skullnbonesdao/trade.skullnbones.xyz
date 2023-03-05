<script lang="ts" setup>
import { watch } from 'vue'
import NavBar from './navigation/NavBar.vue'
import FooterComponent from './navigation/FooterComponent.vue'
import { onMounted } from 'vue'
import { useGlobalStore } from './stores/GlobalStore'
import { useTokenPriceStore } from './stores/TokenPriceStore'
import { useStaratlasGmStore } from './stores/StaratlasGmStore'
import { useAssetsStore } from './stores/AssetsStore'
import { useSolanaNetworkStore } from './stores/SolanaNetworkStore'
import { createToast } from 'mosha-vue-toastify'
import { TOAST_SUCCESS } from './typescript/constants/toast-config'

const globalStore = useGlobalStore()
globalStore.init()

onMounted(async () => {
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
            useAssetsStore().allAssets?.find((asset) => useGlobalStore().symbol.name.includes(asset.symbol))?.mint ?? ''
        )
        .then(() => {})
        .catch((err) => console.log(err))
    /*await useStaratlasGmStore().getOpenOrdersForAsset(
useAssetsStore().allAssets?.find((asset) => useGlobalStore().symbol.includes(asset.symbol))?.mint ?? ''
)*/
})

watch(
    () => useGlobalStore().rpc,
    (n) => {
        createToast(`Changed RPC to: ${n.name}`, TOAST_SUCCESS)
        useGlobalStore().init()
    }
)
</script>

<template>
    <div class="flex flex-col items-stretch bg-gray-200 dark:bg-gray-900 min-h-screen">
        <NavBar class=""></NavBar>
        <RouterView class=""></RouterView>
        <footer-component class="fixed inset-x-0 bottom-0"></footer-component>
    </div>
</template>

<style scoped></style>
