<template>
    <div class="grid xl:grid-cols-5 grid-cols-2 gap-2">
        <price-badge
            class="elementcontainer justify-center"
            image-name="bitcoin"
            :currency="CURRENCIES.find((c) => c.type === E_CURRENCIES.BTC)"
            :price="useTokenPriceStore().token_price.bitcoin"
            :change24h="useTokenPriceStore().change24h.bitcoin"
        />
        <price-badge
            class="elementcontainer justify-center"
            image-name="solana"
            :currency="CURRENCIES.find((c) => c.type === E_CURRENCIES.SOL)"
            :price="useTokenPriceStore().token_price.solana"
            :change24h="useTokenPriceStore().change24h.solana"
        />
        <price-badge
            class="elementcontainer justify-center"
            image-name="polis"
            :currency="CURRENCIES.find((c) => c.type === E_CURRENCIES.POLIS)"
            :price="useTokenPriceStore().token_price.polis"
            :change24h="useTokenPriceStore().change24h.polis"
        />
        <price-badge
            class="elementcontainer justify-center"
            image-name="atlas"
            :currency="CURRENCIES.find((c) => c.type === E_CURRENCIES.ATLAS)"
            :price="useTokenPriceStore().token_price.atlas"
            :change24h="useTokenPriceStore().change24h.atlas"
        />

        <div
            class="elementcontainer flex flex-row space-x-1 items-center col-span-2 xl:col-span-1 justify-center"
            :class="solanaNetwork.transactions_per_second < 1000 ? 'text-red-400' : 'text-green-700'"
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
import { CURRENCIES, E_CURRENCIES } from '../../typescript/constants/currencies.js'

const solanaNetwork = useSolanaNetworkStore()
</script>

<style scoped></style>
