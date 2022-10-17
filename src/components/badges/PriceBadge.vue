<template>
    <div class="flex flex-row space-x-1">
        <div class="w-9 pt-1">
            <img class="" :src="'/tokens/' + props.imageName + '.webp'" :alt="props.imageName" />
        </div>
        <div class="flex flex-row w-28">
            <div class="">
                <div class="text-right">{{ props.price }}</div>
                <div v-if="props.change24h > 0" class="text-right text-green-400">
                    {{ props.change24h.toFixed(2) }}
                </div>
                <div v-if="props.change24h <= 0" class="text-right text-red-400">
                    {{ props.change24h.toFixed(2) }}
                </div>
            </div>
            <div>
                <div class="text-sm i-carbon-currency-dollar"></div>
                <div v-if="props.change24h > 0" class="text-sm i-carbon-percentage text-green-400"></div>
                <div v-if="props.change24h <= 0" class="text-sm i-carbon-percentage text-red-400"></div>
                <div class="space-x-0.5">
                    <div v-if="props.change24h > 0" class="text-sm i-carbon-arrow-up-right text-green-400"></div>
                    <div v-if="props.change24h <= 0" class="text-sm i-carbon-arrow-down-right text-red-400"></div>
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
