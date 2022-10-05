<template>
    <h2>Orderbook</h2>
    {{ symbol }}
    <div>
        <select v-model="selectedCurrency">
            <option>ATLAS</option>
            <option>USDC</option>
        </select>
        <div class="flex flex-row">
            <div class="order-type-container">
                <p>Sell orders:</p>

                <div
                    v-for="order in selectedCurrency === 'ATLAS' ? atlasOrders.sellOrders : usdcOrders.sellOrders"
                    :key="order.id"
                >
                    <div class="w-full flex flex-row rounded-full">
                        <div
                            :style="
                                'width: ' +
                                (order.orderOriginationQty /
                                    useStaratlasGmStore().getSumOrders(
                                        'sell',
                                        selectedCurrency === 'ATLAS' ? TOKEN_ATLAS : TOKEN_USDC
                                    )) *
                                    100 +
                                '%'
                            "
                            class="flex flex-row sell-side order-group-row"
                        >
                            <div>{{ order.orderQtyRemaining }}</div>
                        </div>
                        <div
                            :style="
                                'width: ' +
                                (1 -
                                    order.orderOriginationQty /
                                        useStaratlasGmStore().getSumOrders(
                                            'sell',
                                            selectedCurrency === 'ATLAS' ? TOKEN_ATLAS : TOKEN_USDC
                                        )) *
                                    100 +
                                '%'
                            "
                            class="justify-end flex flex-row transparent z-10"
                        >
                            <div>{{ order.uiPrice }}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="order-type-container">
                <p>Buy orders:</p>
                <div
                    v-for="order in selectedCurrency === 'ATLAS' ? atlasOrders.buyOrders : usdcOrders.buyOrders"
                    :key="order.id"
                >
                    <div class="w-full flex flex-row rounded-full">
                        <div
                            :style="
                                'width: ' +
                                (1 -
                                    order.orderOriginationQty /
                                        useStaratlasGmStore().getSumOrders(
                                            'buy',
                                            selectedCurrency === 'ATLAS' ? TOKEN_ATLAS : TOKEN_USDC
                                        )) *
                                    100 +
                                '%'
                            "
                            class="flex flex-row transparent z-10"
                        >
                            <div>{{ order.uiPrice }}</div>
                        </div>
                        <div
                            :style="
                                'width: ' +
                                (order.orderOriginationQty /
                                    useStaratlasGmStore().getSumOrders(
                                        'buy',
                                        selectedCurrency === 'ATLAS' ? TOKEN_ATLAS : TOKEN_USDC
                                    )) *
                                    100 +
                                '%'
                            "
                            class="justify-end flex flex-row buy-side order-group-row"
                        >
                            <div>{{ order.orderQtyRemaining }}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { watch } from 'vue'
import { useStaratlasGmStore } from '../../stores/StaratlasGmStore'
import { storeToRefs } from 'pinia'
import { useGlobalStore } from '../../stores/GlobalStore'
import { useAssetsStore } from '../../stores/AssetsStore'
import { TOKEN_ATLAS, TOKEN_USDC } from '../../typescript/constants/tokens'

const { symbol, selectedCurrency } = storeToRefs(useGlobalStore())
const { atlasOrders, usdcOrders } = storeToRefs(useStaratlasGmStore())

watch(symbol, (current) => {
    useStaratlasGmStore().getOpenOrdersForAsset(
        useAssetsStore().allAssets?.find((asset) => current.includes(asset.symbol))?.mint ?? ''
    )
})
</script>

<style>
.order-type-container {
    width: 100%;
    border: 1px solid white;
    color: white;
    font-weight: 200;
}

.order-group-row {
    row-gap: 0px;
    margin-bottom: 1px;
}

.sell-side {
    background-color: rgba(242,60,105,0.6);
    color: #ffffff;
}

.buy-side {
    background-color: rgba(65,199,122,0.6);
    color: #ffffff;
}

</style>