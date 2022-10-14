<template>
    <div class="flex flex-row space-x-2">
        <div class="w-4 rounded-full pt3">
            <img class="" :src="'/tokens/' + props.imageName + '.webp'" :alt="props.imageName" />
        </div>
        <div class="flex flex-col">
            <div>{{ props.price }}$</div>
            <div>{{ (props.change24h * 100).toFixed(2) }}%</div>
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
