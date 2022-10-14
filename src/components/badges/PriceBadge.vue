<template>
    <div class="flex flex-row space-x-2">
        <div class="w-6 rounded-full pt2">
            <img class="" :src="'/tokens/' + props.imageName + '.webp'" :alt="props.imageName" />
        </div>
        <div class="flex flex-col">
            <div class="flex flex-row space-x-1">
                <div class="i-carbon:currency-dollar"></div>
                <div>{{ props.price }}</div>
            </div>
            <div class="flex flex-row space-x-1">
                <div v-if="props.change24h * 100 > 0" class="i-carbon:arrow-up-right text-green-400"></div>
                <div v-if="props.change24h * 100 <= 0" class="i-carbon:arrow-down-right text-red-400"></div>
                <div>{{ (props.change24h * 100).toFixed(2) }}%</div>
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
