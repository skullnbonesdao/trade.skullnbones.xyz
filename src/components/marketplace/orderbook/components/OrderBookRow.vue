<template>
    <div class="flex flex-row bg-bar">
        <p class="basis-1/3 text-left">{{ order.length }}</p>

        <p class="basis-1/3 text-center">
            {{ orderQty }}
        </p>

        <p class="basis-1/3 text-right" :class="side === 'buy' ? 'text-green-500' : 'text-red-500'">
            {{ order[0].uiPrice.toFixed(8) }}
        </p>
    </div>
</template>

<script setup lang="ts">
import { defineProps, PropType } from 'vue'
import { Order } from '@staratlas/factory'
const props = defineProps(['order', 'side', 'max_size'])

const orderQty = props.order
    .flatMap((order: any) => {
        return order.orderQtyRemaining
    })
    .reduce((a: any, b: any) => a + b, 0)

const percentage_fill = (orderQty / props.max_size) * 100 - 10
const bg_color = props.side == 'buy' ? '#0D2A2E' : '#361a24'
</script>

<style scoped>
.bg-bar {
    z-index: -1;
    background: linear-gradient(
        to left,
        v-bind(bg_color) v-bind(percentage_fill + '%'),
        black v-bind(1- percentage_fill + '%')
    );
}
</style>
