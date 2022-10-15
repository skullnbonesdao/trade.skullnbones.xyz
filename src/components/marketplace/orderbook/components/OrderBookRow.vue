<template>
    <div class="flex flex-row bg-bar" :class="reverse_order ? 'flex-row-reverse' : ''">
        <p class="basis-1/3" :class="reverse_order ? 'text-right' : 'text-left'">{{ order.length }}</p>

        <p class="basis-1/3" :class="reverse_order ? 'text-right' : 'text-left'">
            {{ orderQty }}
        </p>

        <p class="basis-1/3 bg-text" :class="reverse_order ? 'text-left' : 'text-right'">
            {{ order[0].uiPrice.toFixed(8) }}
        </p>
    </div>
</template>

<script setup lang="ts">
import { defineProps, PropType } from 'vue'
import { Order } from '@staratlas/factory'
const props = defineProps(['order', 'side', 'max_size', 'reverse_order'])

const orderQty = props.order
    .flatMap((order: any) => {
        return order.orderQtyRemaining
    })
    .reduce((a: any, b: any) => a + b, 0)

const percentage_fill = props.reverse_order ? (orderQty / props.max_size) * 90 : (orderQty / props.max_size) * 90
const percentage_unfill = props.reverse_order ? (orderQty / props.max_size) * 90 : (orderQty / props.max_size) * 90

const bg_color = props.side == 'buy' ? '#0d7e04' : '#5e0b27'
const text_color = props.side == 'buy' ? '#24de18' : '#ee0000'
const direction = props.reverse_order ? 'right' : 'left'
</script>

<style scoped>
.bg-bar {
    z-index: -1;
    background: linear-gradient(
        to v-bind(direction),
        v-bind(bg_color) v-bind(percentage_fill + '%'),
        #03102f v-bind(percentage_unfill + '%')
    );
}
.bg-text {
    color: v-bind(text_color);
}
</style>
