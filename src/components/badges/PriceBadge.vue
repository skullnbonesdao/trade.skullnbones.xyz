<template>
    <div class="flex flex-row space-x-2">
        <div class="w-9 pt-1">
            <img class="" :src="'/tokens/' + props.imageName + '.webp'" :alt="props.imageName" />
        </div>
        <div class="w-28">
            <div class="flex flex-row space-x-0">
                <div class="">{{ props.price }}</div>
                <div class="text-sm i-carbon-currency-dollar"></div>
            </div>
            <div class="flex flex-row space-x-0">
                <div>{{ (props.change24h * 100).toFixed(2) }}</div>
                <div>
                    <div class="text-sm i-carbon-percentage"></div>
                    <div v-if="props.change24h * 100 > 0" class="text-sm i-carbon-arrow-up-right text-green-400"></div>
                    <div v-if="props.change24h * 100 <= 0" class="text-sm i-carbon-arrow-down-right text-red-400"></div>
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
