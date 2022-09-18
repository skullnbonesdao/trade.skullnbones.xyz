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

                <div
                    v-for="order in selected_currency === 'ATLAS' ? atlasOrders.sellOrders : usdcOrders.sellOrders"
                    :key="order.id"
                >
                    <div class="w-full flex flex-row rounded-full">
                        <div
                            :style="
                                'width: ' +
                                (order.orderOriginationQty /
                                    useStaratlasGmStore().getSumOrders(
                                        'sell',
                                        selected_currency === 'ATLAS' ? TOKEN_ATLAS : TOKEN_USDC
                                    )) *
                                    100 +
                                '%'
                            "
                            class="flex flex-row sellSide"
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
                                            selected_currency === 'ATLAS' ? TOKEN_ATLAS : TOKEN_USDC
                                        )) *
                                    100 +
                                '%'
                            "
                            class="justify-end flex flex-row transparent"
                        >
                            <div class="sellSideText">{{ order.uiPrice }}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="order-type-container">
                <p>Buy orders:</p>
                <div
                    v-for="order in selected_currency === 'ATLAS' ? atlasOrders.buyOrders : usdcOrders.buyOrders"
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
                                            selected_currency === 'ATLAS' ? TOKEN_ATLAS : TOKEN_USDC
                                        )) *
                                    100 +
                                '%'
                            "
                            class="flex flex-row transparent"
                        >
                            <div class="buySideText">{{ order.uiPrice }}</div>
                        </div>
                        <div
                            :style="
                                'width: ' +
                                (order.orderOriginationQty /
                                    useStaratlasGmStore().getSumOrders(
                                        'buy',
                                        selected_currency === 'ATLAS' ? TOKEN_ATLAS : TOKEN_USDC
                                    )) *
                                    100 +
                                '%'
                            "
                            class="justify-end flex flex-row buySide"
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
import { ref, watch } from 'vue'
import { useStaratlasGmStore } from '../../stores/StaratlasGmStore'
import { storeToRefs } from 'pinia'
import { useGlobalStore } from '../../stores/GlobalStore'
import { useAssetsStore } from '../../stores/AssetsStore'
import { TOKEN_ATLAS, TOKEN_USDC } from '../../typescript/constants/tokens'

const { symbol } = storeToRefs(useGlobalStore())
const { atlasOrders, usdcOrders } = storeToRefs(useStaratlasGmStore())

const selected_currency = ref('USDC')

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
}

.sellSide {
    background-color: #a20f0f;
    color: #ffffff;
}

.sellSideText {
    color: #e02d2d;
}

.buySide {
    background-color: #01620d;
    color: #ffffff;
}

.buySideText {
    color: #24de18;
}
</style>