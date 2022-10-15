<template>
    <RowWithDeph {...props}>
        <order-cell>{formatInt(total)}</order-cell>
        <order-cell>{formatInt(size)}</order-cell>
        <order-cell :color="props.type === 'bids' ? 'text-green-600' : 'text-red-600'">
            {formatFloat(price)}
        </order-cell>
    </RowWithDeph>
</template>

<script setup lang="ts">
import { defineProps, PropType } from 'vue'
import { DeltaType } from '../types'
import OrderCell from './OrderCell.vue'

const props = defineProps({
    index: {
        type: Number,
        required: false,
    },
    type: {
        type: Object as PropType<DeltaType>,
        required: false,
    },
    rtl: {
        type: Boolean,
        required: false,
    },
})
</script>

<style scoped></style>
