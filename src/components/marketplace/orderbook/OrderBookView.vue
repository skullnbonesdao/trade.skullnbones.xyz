<template>
    <div class="flex flex-col text-sm lg:text-base">
        <div class="flex flex-col">
            <!--            {{ useStaratlasGmStore().usdcOrders.buyOrders }}-->
            <div class="flex p2 flex-row space-x-1">
                <div class="basis-1/2">
                    <order-book-header> </order-book-header>
                    <div v-for="order in orders_grouped_buy" :key="order">
                        <order-book-row :order="order" side="buy" :max_size="max_size_buy"></order-book-row>
                    </div>
                </div>
                <div class="basis-1/2">
                    <order-book-header :reverse_order="true"> </order-book-header>
                    <div v-for="order in orders_grouped_sell" :key="order">
                        <order-book-row
                            :order="order"
                            side="sell"
                            :max_size="max_size_sell"
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

import OrderBookHeader from './components/OrderBookHeader.vue'
import OrderBookRow from './components/OrderBookRow.vue'
import { useWallet } from 'solana-wallets-vue'
import { Currencies } from '../../../typescript/constants/tokens'
import { useGlobalStore } from '../../../stores/GlobalStore'
import { useStaratlasGmStore } from '../../../stores/StaratlasGmStore'
const orders = ref()
const orders_grouped_buy = ref()
const orders_grouped_sell = ref()
const max_size_buy = ref(0)
const max_size_sell = ref(0)

const selectedCurrency = ref()

watchEffect(async () => {
    selectedCurrency.value =
        Currencies.find((currency) => useGlobalStore().symbol.mint_pair.toString() === currency.mint)?.name ?? ''

    if (selectedCurrency.value === 'ATLAS') {
        orders_grouped_buy.value = groupBy(useStaratlasGmStore().atlasOrders.buyOrders, 'uiPrice')
        orders_grouped_sell.value = groupBy(useStaratlasGmStore().atlasOrders.sellOrders, 'uiPrice')
    } else {
        orders_grouped_buy.value = groupBy(useStaratlasGmStore().usdcOrders.buyOrders, 'uiPrice')
        orders_grouped_sell.value = groupBy(useStaratlasGmStore().usdcOrders.sellOrders, 'uiPrice')
    }

    max_size_buy.value = find_max(orders_grouped_buy)
    max_size_sell.value = find_max(orders_grouped_sell)
})

function find_max(grouped_orders) {
    let max = 0
    for (const [key, value] of Object.entries(grouped_orders.value)) {
        let sum_inner = 0
        value.forEach((element) => (sum_inner += element.orderQtyRemaining))

        if (sum_inner > max) {
            max = sum_inner
        }
    }
    return max
}

function groupBy(arrayObjects, key) {
    return arrayObjects.reduce(function (result, currentObject) {
        const val = currentObject[key]
        result[val] = result[val] || []
        result[val].push(currentObject)
        return result
    }, {})
}
</script>
