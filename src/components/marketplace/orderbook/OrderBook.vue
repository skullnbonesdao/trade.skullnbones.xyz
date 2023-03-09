<template>
    <div class="flex flex-col text-sm lg:text-base">
        <DotLoader v-if="is_loading" class="flex w-full justify-center" :loading="is_loading" color="#ff150c" />
        <div v-else class="flex flex-col">
            <div class="flex sm:flex-row flex-col sm:space-x-1">
                <div class="basis-1/2">
                    <order-book-header></order-book-header>
                    <div v-for="orderBlock in orders_grouped_buy" :key="orderBlock">
                        <order-book-row :order="orderBlock" side="buy" :max_size="max_size_buy" />
                    </div>
                </div>
                <div class="basis-1/2">
                    <order-book-header :reverse_order="true"></order-book-header>
                    <div v-for="(orderBlock, idx) in orders_grouped_sell" :key="idx">
                        <order-book-row
                            :order="orderBlock"
                            side="sell"
                            :max_size="max_size_sell"
                            :reverse_order="true"
                        />
                    </div>
                </div>
            </div>
        </div>
        <div class="flex items-center justify-center h-14"></div>
    </div>
</template>

<script setup>
import { ref, watchEffect } from 'vue'
import OrderBookHeader from './components/OrderBookHeader.vue'
import OrderBookRow from './components/OrderBookRow.vue'
import DotLoader from 'vue-spinner/src/DotLoader.vue'
import { useGlobalStore } from '../../../stores/GlobalStore'
import { useStaratlasGmStore } from '../../../stores/StaratlasGmStore'
import { CURRENCIES } from '../../../typescript/constants/currencies'

const is_loading = ref(true)
const orders_grouped_buy = ref([])
const orders_grouped_sell = ref([])
const max_size_buy = ref(0)
const max_size_sell = ref(0)
const selectedCurrency = ref()

watchEffect(async () => {
    is_loading.value = true
    selectedCurrency.value =
        CURRENCIES.find((currency) => useGlobalStore().symbol.mint_pair.toString() === currency.mint)?.name ?? ''

    if (selectedCurrency.value === 'ATLAS') {
        orders_grouped_buy.value = useStaratlasGmStore().atlasOrders.buyOrders.sort((a, b) => b.price - a.price)
        orders_grouped_sell.value = useStaratlasGmStore().atlasOrders.sellOrders.sort((a, b) => a.price - b.price)

        max_size_buy.value = useStaratlasGmStore().atlasOrders.buyOrders.reduce((max, obj) => {
            return obj.size > max.size ? obj : max
        }).size
        max_size_sell.value = useStaratlasGmStore().atlasOrders.sellOrders.reduce((max, obj) => {
            return obj.size > max.size ? obj : max
        }).size
    } else {
        orders_grouped_buy.value = useStaratlasGmStore().usdcOrders.buyOrders.sort((a, b) => b.price - a.price)
        orders_grouped_sell.value = useStaratlasGmStore().usdcOrders.sellOrders.sort((a, b) => a.price - b.price)

        max_size_buy.value = useStaratlasGmStore().usdcOrders.buyOrders.reduce((max, obj) => {
            return obj.size > max.size ? obj : max
        }).size
        max_size_sell.value = useStaratlasGmStore().usdcOrders.sellOrders.reduce((max, obj) => {
            return obj.size > max.size ? obj : max
        }).size
    }
    is_loading.value = false
})
</script>