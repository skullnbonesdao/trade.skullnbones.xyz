<template>
    <div class="flex-1 flex flex-col">
        <div class="border-b border-gray-500">
            <order-row :rtl="props.rtl"> </order-row>
        </div>
    </div>
</template>

<script setup lang="ts">
import OrderRow from '../components/OrderRow.vue'
import OrderCell from '../components/OrderCell.vue'

import { defineProps } from 'vue'

const props = defineProps({
    rtl: {
        type: Boolean,
        required: false,
    },
    children: {
        type: Object,
        required: false,
    },
})
</script>

<style scoped></style>
