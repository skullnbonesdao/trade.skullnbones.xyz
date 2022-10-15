<template>
    <order-row :rtl="props.rtl">
        {{ props.children }}
        <div
            class="absolute h-full w-full"
            :style="'{transform: translateX(' + translateX + ',  zIndex: -1, backgroundColor }'"
        />
    </order-row>
</template>

<script setup lang="ts">
import { defineProps, PropType } from 'vue'
import { DeltaType } from '../types'
import OrderRow from './OrderRow.vue'

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
    children: {
        type: Object,
        required: false,
    },
})

const levelDepth = 2
const backgroundColor = props.type === 'asks' ? '#361A24' : '#0D2A2E'
const translateX = (100 - levelDepth) * (props.rtl ? -1 : 1) + '%'
</script>

<style scoped></style>
