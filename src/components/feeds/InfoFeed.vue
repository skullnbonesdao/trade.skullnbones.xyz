<template>
    <div class="flex flex-col px-4 py-2 flex md:space-x-6 md:flex-row items-center">
        <div class="flex flex-row">
            <div class="inline-flex items-baseline space-x-2 w-full">
                <div class="w-4 rounded-full">
                    <img src="../../assets/tokens/bitcoin.webp" alt="bitcoin" />
                </div>

                <span class="w-full text-right font-bold">
                    {{ useTokenPriceStore().token_price.bitcoin }}
                </span>
                <span class="w-full text-right font-bold">
                    {{ useTokenPriceStore().change_24.bitcoin.toFixed(3) * 100 }}%
                </span>
            </div>
        </div>
        <div class="flex flex-row">
            <div class="inline-flex items-baseline space-x-2 w-full">
                <div class="w-4 rounded-full">
                    <img src="../../assets/tokens/solana.webp" alt="solana" />
                </div>
                <span class="w-full text-right font-bold">
                    {{ useTokenPriceStore().token_price.solana }}
                </span>
                <span class="w-full text-right font-bold">
                    {{ useTokenPriceStore().change_24.solana.toFixed(3) * 100 }}%
                </span>
            </div>
        </div>
        <div class="flex flex-row">
            <div class="inline-flex items-baseline space-x-2 w-full">
                <div class="w-4 rounded-full">
                    <img src="../../assets/tokens/polis.webp" alt="polis" />
                </div>
                <span class="w-full text-right font-bold">
                    {{ useTokenPriceStore().token_price.polis }}
                </span>
            </div>
        </div>
        <div class="flex flex-row">
            <div class="inline-flex items-baseline space-x-2 w-full">
                <div class="w-4 rounded-full">
                    <img src="../../assets/tokens/atlas.webp" alt="atlas" />
                </div>
                <span class="w-full text-right font-bold">
                    {{ useTokenPriceStore().token_price.atlas }}
                </span>
            </div>
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

const solanaNetwork = useSolanaNetworkStore()
</script>

<style scoped></style>
