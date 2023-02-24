<template>
    <div class="grid xl:grid-cols-5 grid-cols-2">
        <price-badge
            class="justify-center"
            image-name="bitcoin"
            :price="useTokenPriceStore().token_price.bitcoin"
            :change24h="useTokenPriceStore().change24h.bitcoin"
        />
        <price-badge
            class="justify-center"
            image-name="solana"
            :price="useTokenPriceStore().token_price.solana"
            :change24h="useTokenPriceStore().change24h.solana"
        />
        <price-badge
            class="justify-center"
            image-name="polis"
            :price="useTokenPriceStore().token_price.polis"
            :change24h="useTokenPriceStore().change24h.polis"
        />
        <price-badge
            class="justify-center"
            image-name="atlas"
            :price="useTokenPriceStore().token_price.atlas"
            :change24h="useTokenPriceStore().change24h.atlas"
        />

        <div
            :class="solanaNetwork.transactions_per_second < 1000 ? 'text-red-400' : 'text-green-700'"
            class="flex flex-row space-x-1 items-center"
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
import PriceBadge from '../badges/PriceBadge.vue'

const solanaNetwork = useSolanaNetworkStore()
</script>

<style scoped></style>
