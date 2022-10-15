<template>
    <div :style="'minHeight: ' + ROW_HEIGHT" class="flex-1 grid grid-cols-3 items-center relative px-4 lg:px-16">
        <order-cell text="TOTAL" color="text-gray-500"></order-cell>
        <order-cell text="SIZE" color="text-gray-500"></order-cell>
        <order-cell text="PRICE" color="text-gray-500"></order-cell>
    </div>
</template>

<script setup lang="ts">
import OrderCell from '../components/OrderCell.vue'

const ROW_HEIGHT = 26

import { defineProps } from 'vue'
const props = defineProps({
    rtl: {
        type: Boolean,
        required: false,
    },
    children: {
        type: Object,
        required: false,
        default: 'no child',
    },
})
</script>

<style scoped></style>
