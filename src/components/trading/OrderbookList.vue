<template>
    <h1>Orderbook</h1>
    <div>
        <select v-model="selected_currency">
            <option>ATLAS</option>
            <option>USDC</option>
        </select>
        <div class="order-type-container">
            <p>Sell orders:</p>
            <p
                v-for="order in selected_currency === 'ATLAS' ? atlasOrders.sellOrders : usdcOrders.sellOrders"
                :key="order.id"
            >
                {{ order.uiPrice }}
            </p>
        </div>
        <div class="order-type-container">
            <p>Buy orders:</p>
            <p
                v-for="order in selected_currency === 'ATLAS' ? atlasOrders.buyOrders : usdcOrders.buyOrders"
                :key="order.id"
            >
                {{ order.uiPrice }}
            </p>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useStaratlasGmStore } from '../../stores/StaratlasGmStore'
import { storeToRefs } from 'pinia'

const { atlasOrders, usdcOrders } = storeToRefs(useStaratlasGmStore())

const selected_currency = ref('USDC')
</script>

<style>
.order-type-container {
    border: 1px solid white;
}
</style>