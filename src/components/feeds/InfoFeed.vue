<template>
    <div class="px-4 py-2 flex flex-row space-x-2 bg-gray-100 dark:bg-gray-800 shadow-xl rounded-box">
        <div class="flex flex-row space-x-1">
            <h2>BTC/USDC</h2>
            <h3>{{ tokenPriceStore.btc }}</h3>
        </div>
        <div class="flex flex-row space-x-1">
            <h2>SOL/USDC</h2>
            <h3>{{ tokenPriceStore.sol }}</h3>
        </div>
        <div class="flex flex-row space-x-1">
            <h2>ATLAS/USDC</h2>
            <h3>{{ tokenPriceStore.atlas }}</h3>
        </div>
        <div class="flex flex-row space-x-1">
            <h2>POLIS/USDC</h2>
            <h3>{{ tokenPriceStore.polis }}</h3>
        </div>
        <div
            :class="solanaNetwork.transactions_per_second < 1000 ? 'text-red-400' : 'text-green-700'"
            class="flex w-full justify-end flex-row space-x-1 items-center"
        >
            <p>{{ solanaNetwork.transactions_per_second.toFixed(0) }}</p>
            <div class="i-carbon:ibm-cloud-pak-watson-aiops"></div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { useTokenPriceStore } from '../../stores/TokenPriceStore'
import { useSolanaNetworkStore } from '../../stores/SolanaNetworkStore'
import { onMounted } from 'vue'

const tokenPriceStore = useTokenPriceStore()
const solanaNetwork = useSolanaNetworkStore()

onMounted(async () => {
    //await solanaNetwork.run_tps();
})
</script>

<style scoped></style>