<template>
    <h1>New orderbook</h1>

    <div class="flex flex-col text-sm lg:text-base">
        <div class="flex items-center w-full h-14 px-8 border-b border-gray-500">Order Book</div>
        <div class="flex-1 flex flex-col overflow-hidden">
            <order-book-socket-state-display></order-book-socket-state-display>
            <order-book-side-header :rtl="true">
                <order-book-side type="asks" originX="r" originY="b"></order-book-side>
            </order-book-side-header>

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
import OrderBookSocketStateDisplay from './components/OrderBookSocketStateDisplay.vue'
import OrderBookSideHeader from './components/OrderBookSideHeader.vue'
import OrderBookSide from './components/OrderBookSide.vue'
</script>

<style scoped></style>
<script></script>
