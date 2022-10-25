<template>
    <div class="flex flex-row space-x-1">
        <div class="w-9 pt-1">
            <img class="" :src="'/tokens/' + props.imageName + '.webp'" :alt="props.imageName" />
        </div>

        <div>
            <div class="flex items-center">
                <div class="text-right">{{ props.price }}</div>
                <div class="i-carbon-currency-dollar"></div>
            </div>

            <div class="flex items-center">
                <div
                    class="text-sm"
                    :class="change24h > 0 ? 'i-carbon-arrow-up-right text-buy' : 'i-carbon-arrow-down-right text-sell'"
                ></div>
                <div class="text-right" :class="change24h > 0 ? 'text-buy' : 'text-sell'">
                    {{ props.change24h.toFixed(2) }}%
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
    imageName: {
        type: String,
        default: 'bitcoin',
    },

    price: {
        type: String,
        default: '100',
    },
    change24h: {
        type: Number,
        default: 0.053433443,
    },
})
</script>

<style scoped></style>
