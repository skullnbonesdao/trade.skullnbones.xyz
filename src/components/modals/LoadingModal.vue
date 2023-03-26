<script setup lang="ts">
import { VueFinalModal } from 'vue-final-modal'
import { onMounted, ref } from 'vue'
import CurrencyIcon from '../icon-helper/CurrencyIcon.vue'
import { CURRENCIES, E_CURRENCIES } from '../../typescript/constants/currencies'
import { useGlobalStore } from '../../stores/GlobalStore'
import { useAssetsStore } from '../../stores/AssetsStore'
import { useTokenPriceStore } from '../../stores/TokenPriceStore'
import { useSolanaNetworkStore } from '../../stores/SolanaNetworkStore'
import { useStaratlasGmStore } from '../../stores/StaratlasGmStore'
import BeatLoader from 'vue-spinner/src/BeatLoader.vue'

const emit = defineEmits<{
    (e: 'confirm'): void
}>()

onMounted(async () => {
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
    emit('confirm')
})
</script>
<template>
    <VueFinalModal
        class="flex justify-center items-center"
        content-class="flex flex-col mx-4 p-4 bg-white dark:bg-gray-900 border dark:border-gray-700 rounded-lg space-y-2"
    >
        <h2 class="text-center pb-2">Loading</h2>
        <BeatLoader class="elementcontainer flex w-full justify-center" :loading="true" color="#ff150c" />

        <div class="pt-2 flex justify-center">
            <div @click="emit('confirm')" class="text-white border rounded-2xl">
                <div class="w-9 h-9 i-carbon-close"></div>
            </div>
        </div>
    </VueFinalModal>
</template>
