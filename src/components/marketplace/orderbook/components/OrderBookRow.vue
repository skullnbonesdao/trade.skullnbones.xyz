<template>
    <div
        class="text-gray-500"
        :class="is_user_order && (reverse_order ? 'border-r-4 border-sky-500' : 'border-l-4 border-sky-500')"
    >
        <div class="flex flex-row bg-bar" :class="reverse_order ? 'flex-row-reverse' : ''">
            <!--            <p class="basis-1/3" :class="reverse_order ? 'text-right' : 'text-left'">{{ order?.owners.length }}</p>-->
            <p class="basis-1/2" :class="reverse_order ? 'text-right' : 'text-left'">
                {{ order?.size }}
            </p>
            <p class="basis-1/2 bg-text" :class="reverse_order ? 'text-left' : 'text-right'">
                {{ order?.price.toFixed(8).substring(0, 10) }}
            </p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { defineProps, PropType } from 'vue'
import { useWallet } from 'solana-wallets-vue'
import { ref, watchEffect, unref } from 'vue'
import { OrderBookOrderMap } from '../../../../stores/StaratlasGmStore'

const is_user_order = ref(false)

const props = defineProps({
    order: { type: Object as PropType<OrderBookOrderMap> },
    side: String,
    max_size: { type: Number, default: 100 },
    reverse_order: Boolean,
})

// const orderQty = props.order
//     .flatMap((order: any) => {
//         return order.size
//     })
//     .reduce((a: any, b: any) => a + b, 0)

const percentage_fill = props.reverse_order
    ? (props.order!.size / props.max_size) * 90
    : (props.order!.size / props.max_size) * 90
const percentage_unfill = props.reverse_order
    ? (props.order!.size / props.max_size) * 90
    : (props.order!.size / props.max_size) * 90

const bg_color = props.side == 'buy' ? '#0d7e04' : '#5e0b27'
const text_color = props.side == 'buy' ? '#24de18' : '#ee0000'
const direction = props.reverse_order ? 'right' : 'left'

//TODO: Add back marking user orders
//
// function isUserOrderBlock(order: any, publicKey: string | undefined) {
//     const userOrderBlock = order.find((block: any) => {
//         return block.owner === publicKey
//     })
//     return userOrderBlock !== undefined
// }

// watchEffect(async () => {
//     const publicKey = useWallet().publicKey?.value?.toString()
//     is_user_order.value = isUserOrderBlock(props.order, publicKey)
// })
</script>

<style scoped>
.bg-bar {
    z-index: -1;
    background: linear-gradient(
        to v-bind(direction),
        v-bind(bg_color) v-bind(percentage_fill + '%'),
        #03102f00 v-bind(percentage_unfill + '%')
    );
}

.bg-text {
    color: v-bind(text_color);
}
</style>
