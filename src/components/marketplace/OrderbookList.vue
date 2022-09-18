<template>
    <h2>Orderbook</h2>
    {{ symbol }}
    <div>
        <select v-model="selected_currency">
            <option>ATLAS</option>
            <option>USDC</option>
        </select>
        <div class="flex flex-row">
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
    </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import { useStaratlasGmStore } from '../../stores/StaratlasGmStore'
import { storeToRefs } from 'pinia'
import { useGlobalStore } from '../../stores/GlobalStore'
import { useAssetsStore } from '../../stores/AssetsStore'

const { symbol } = storeToRefs(useGlobalStore())
const { atlasOrders, usdcOrders } = storeToRefs(useStaratlasGmStore())

const selected_currency = ref('USDC')

watch(symbol, (current) => {
    useStaratlasGmStore().getOpenOrdersForAsset(
        useAssetsStore().allAssets.find((asset) => current.includes(asset.symbol))?.mint ?? ''
    )
    console.log(current)
})
</script>

<style>
.order-type-container {
    width: 100%;
    border: 1px solid white;
}
</style>