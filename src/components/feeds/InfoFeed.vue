<template>
    <div class="flex flex-col px-4 py-2 flex md:space-x-3 md:flex-row">
        <div class="flex flex-col">
            <h2>BTC/USDC</h2>
            <h3>{{ tokenPriceStore.btc }}</h3>
        </div>
        <div class="flex flex-col">
            <h2>SOL/USDC</h2>
            <h3>{{ tokenPriceStore.sol }}</h3>
        </div>
        <div class="flex flex-col">
            <h2>ATLAS/USDC</h2>
            <h3>{{ tokenPriceStore.atlas }}</h3>
        </div>
        <div class="flex flex-col">
            <h2>POLIS/USDC</h2>
            <h3>{{ tokenPriceStore.polis }}</h3>
        </div>
        <div
            :class="solanaNetwork.transactions_per_second < 1000 ? 'text-red-400' : 'text-green-700'"
            class="flex w-full justify-end flex-row space-x-1 items-center"
        >
            <div class="i-carbon:ibm-cloud-pak-watson-aiops"></div>
            <div>
                <p>{{ solanaNetwork.transactions_per_second.toFixed(0) }}</p>
                <sup>TPS</sup>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { useTokenPriceStore } from '../../stores/TokenPriceStore'
import { useSolanaNetworkStore } from '../../stores/SolanaNetworkStore'

const tokenPriceStore = useTokenPriceStore()
const solanaNetwork = useSolanaNetworkStore()
</script>

<style scoped></style>
