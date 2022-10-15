<template>
    <div class="flex flex-col text-sm lg:text-base">
        <h1>New orderbook</h1>
        <div class="flex-1 flex flex-col overflow-hidden">
            <!--            {{ useStaratlasGmStore().usdcOrders.buyOrders }}-->
            <div class="flex flex-row space-x-1">
                <div class="basis-1/2">
                    <order-book-header> </order-book-header>
                    <div v-for="order in orders_grouped" :key="order">
                        <order-book-row :order="order" side="buy" :max_size="max_size"></order-book-row>
                    </div>
                </div>
                <div class="basis-1/2">
                    <order-book-header :reverse_order="true"> </order-book-header>
                    <div v-for="order in orders_grouped" :key="order">
                        <order-book-row
                            :order="order"
                            side="sell"
                            :max_size="max_size"
                            :reverse_order="true"
                        ></order-book-row>
                    </div>
                </div>
            </div>

            <!--            <OrderBookSocketStateDisplay>
                <OrderBookSideHeader rtl>
                    <OrderBookSide type="asks" originX="r" originY="b" />
                    <OrderBookSpread />
                    <OrderBookSide type="bids" originX="r" />
                </OrderBookSideHeader>
            </OrderBookSocketStateDisplay>-->
        </div>
        <div class="flex items-center justify-center h-14">
            <!--            <OrderBookFooter />-->
        </div>
    </div>
</template>

<script setup>
import { ref, watchEffect, unref } from 'vue'
import { Order } from '@staratlas/factory'
import { useStaratlasGmStore } from '../../../stores/StaratlasGmStore'

import OrderBookHeader from './components/OrderBookHeader.vue'
import OrderBookRow from './components/OrderBookRow.vue'
import { useWallet } from 'solana-wallets-vue'
const orders = ref()
const orders_grouped = ref()
const max_size = ref(0)

watchEffect(async () => {
    orders.value = useStaratlasGmStore().atlasOrders.buyOrders
    orders_grouped.value = groupBy(orders.value, 'uiPrice')

    for (const [key, value] of Object.entries(orders_grouped.value)) {
        let sum_inner = 0
        value.forEach((element) => (sum_inner += element.orderQtyRemaining))

        if (sum_inner > max_size.value) {
            max_size.value = sum_inner
        }
    }
})

function groupBy(arrayObjects, key) {
    return arrayObjects.reduce(function (result, currentObject) {
        const val = currentObject[key]
        result[val] = result[val] || []
        result[val].push(currentObject)
        return result
    }, {})
}
</script>
