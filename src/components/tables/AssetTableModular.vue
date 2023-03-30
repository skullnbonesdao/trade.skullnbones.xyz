<template>
    <div class="relative overflow-x-auto">
        <table>
            <thead>
                <tr>
                    <th></th>
                    <th class="text-left">Pair</th>
                    <th>Info</th>
                    <th>Mint</th>
                    <th>Wallets</th>
                    <th class="text-right">Fee</th>
                    <th class="text-right">Size</th>
                    <th class="text-right">Price</th>
                    <th class="text-right">Total</th>
                    <th class="text-right"></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(trade, idx) in api_trades" :key="idx">
                    <th id="">
                        <AssetPairImage
                            :mint="trade.asset_mint"
                            :pair="CURRENCIES.find((c) => c.mint === trade.currency_mint)"
                        />
                    </th>
                    <td id="pair" class="font-bold">{{ trade.symbol }}</td>
                    <td id="info">
                        <div class="flex flex-col text-sm">
                            <div class="flex">{{ new Date(trade.timestamp * 1000).toISOString() }}</div>
                            <div class="flex text-purple">
                                <p>Before: {{ calc_passed_time(trade.timestamp) }}</p>
                            </div>
                            <div class="flex text-2xs">
                                <p>{{ trade.signature.slice(0, 10) }}[...]{{ trade.signature.slice(-10) }}</p>
                            </div>
                        </div>
                    </td>
                    <td id="mint">
                        <div class="flex flex-row space-x-2">
                            <div class="flex flex-col">
                                <div>Token:</div>
                                <div>Asset:</div>
                            </div>
                            <div class="flex flex-col">
                                <div>{{ trade.currency_mint }}</div>
                                <div>{{ trade.asset_mint }}</div>
                            </div>
                        </div>
                    </td>
                    <td id="wallet">
                        <div class="flex flex-row space-x-2">
                            <div class="flex flex-col">
                                <div>Maker:</div>
                                <div>Taker:</div>
                            </div>
                            <div class="flex flex-col">
                                <div
                                    :class="
                                        trade.asset_receiving_wallet === trade.order_initializer
                                            ? 'text-green-500'
                                            : 'text-red-500'
                                    "
                                >
                                    {{ trade.order_initializer }}
                                    {{
                                        trade.asset_receiving_wallet === trade.order_initializer
                                            ? '[Buyer]'
                                            : '[Seller]'
                                    }}
                                </div>
                                <div
                                    :class="
                                        trade.asset_receiving_wallet === trade.order_taker
                                            ? 'text-green-500'
                                            : 'text-red-500'
                                    "
                                >
                                    {{ trade.order_taker }}
                                    {{ trade.asset_receiving_wallet === trade.order_taker ? '[Buyer]' : '[Seller]' }}
                                </div>
                            </div>
                        </div>
                    </td>
                    <td id="fee" class="text-right">
                        {{ ((trade.market_fee / (trade.asset_change * trade.price)) * 100).toFixed(2) }}%
                    </td>
                    <td id="size" class="text-right">x{{ trade.asset_change }}</td>
                    <td id="price" class="">
                        <div class="flex flex-row justify-end items-center space-x-2">
                            <div class="text-right">
                                {{ abbreviateNumber(trade.price) }}
                            </div>
                            <CurrencyIcon
                                class="w-4 h-4"
                                :currency="CURRENCIES.find((c) => c.mint === trade.currency_mint)"
                            />
                        </div>
                    </td>
                    <td id="total" class="">
                        <div class="flex flex-row justify-end items-center space-x-2">
                            <div class="text-right">
                                {{ abbreviateNumber(trade.price * trade.asset_change) }}
                            </div>
                            <CurrencyIcon
                                class="w-4 h-4"
                                :currency="CURRENCIES.find((c) => c.mint === trade.currency_mint)"
                            />
                        </div>
                    </td>
                    <td id="" class="">
                        <div class="flex flex-row justify-end items-center space-x-2">
                            <ExplorerIcon
                                class="w-5"
                                :explorer="EXPLORER.find((e) => e.type === E_EXPLORER.SOLSCAN)"
                                :signature="trade.signature"
                            />
                            <ExplorerIcon
                                class="w-5"
                                :explorer="EXPLORER.find((e) => e.type === E_EXPLORER.SOLANAFM)"
                                :signature="trade.signature"
                            />
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script setup lang="ts">
import AssetPairImage from '../marketplace/AssetPairImage.vue'
import CurrencyIcon from '../icon-helper/CurrencyIcon.vue'
import ExplorerIcon from '../icon-helper/ExplorerIcon.vue'
import { CURRENCIES } from '../../typescript/constants/currencies.js'
import { E_EXPLORER, EXPLORER } from '../../typescript/constants/explorer.js'
import { Trade } from '../../typescript/skullnbones_api/skullnbones_api'
import { PropType } from 'vue'
import { calc_passed_time } from '../../typescript/helper/calc_passed_time'

defineProps({
    api_trades: {
        type: [] as PropType<Array<Trade>>,
    },
})
function abbreviateNumber(num: number): string {
    const abbreviations = [
        { value: 1_000_000_000_000, symbol: 'T' },
        { value: 1_000_000_000, symbol: 'B' },
        { value: 1_000_000, symbol: 'M' },
        { value: 1_000, symbol: 'k' },
        { value: 1, symbol: '' },
        { value: 0.001, symbol: 'm' },
    ]

    for (const abbreviation of abbreviations) {
        if (num >= abbreviation.value) {
            return (num / abbreviation.value).toFixed(2) + abbreviation.symbol
        }
    }

    return num.toFixed(2)
}
</script>
<style scoped>
ul {
    @apply hidden text-sm font-medium text-center text-gray-500 divide-x divide-gray-200 rounded-lg shadow sm:flex dark:divide-gray-700 dark:text-gray-400;
}

a {
    display: block;
}
</style>
