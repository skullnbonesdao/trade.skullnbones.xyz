<template>
    <div ref="{tableRef}" class="flex-1 flex flex-col overflow-hidden font-mono">
        <order-book-side-level :key="1" :index="1" :type="props.type" :rtl="props.originX === 'r'" />
    </div>
</template>

<script setup lang="ts">
import { defineProps, PropType } from 'vue'
import OrderBookSideLevel from './OrderBookSideLevel.vue'
import { DeltaType } from '../types'
/*
const tableRef = useRef(null)
const tableSize = useElementSize(tableRef)
const totalRowCount = Math.floor(tableSize.height / ROW_HEIGHT)*/

const props = defineProps({
    type: {
        type: Object as PropType<DeltaType>,
        required: false,
    },
    originX: {
        type: String,
        required: false,
    },
    originY: {
        type: String,
        required: false,
    },
    vertical: {
        type: Boolean,
        required: false,
    },
})
</script>

<style scoped></style>
