<template>
    <div class="relative overflow-x-auto">
        <table>
            <thead>
                <tr>
                    <th class="">Pair</th>
                    <th>Info</th>
                    <th v-if="!is_simple">Mint</th>
                    <th v-if="!is_simple">Wallets</th>

                    <th v-if="is_simple">Side</th>

                    <th class="text-right">Fee</th>
                    <th class="text-right">Size</th>
                    <th class="text-right">Price</th>
                    <th class="text-right">Total</th>
                    <th class="text-right"></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(trade, idx) in api_trades" :key="idx">
                    <th id="flex flex-col ">
                        <AssetPairImage
                            :mint="trade.asset_mint"
                            :pair="CURRENCIES.find((c) => c.mint === trade.currency_mint)"
                        />
                        <div class="text-center">{{ trade.symbol }}</div>
                    </th>

                    <td id="info">
                        <div class="flex flex-col text-xs">
                            <div class="flex">{{ new Date(trade.timestamp * 1000).toISOString() }}</div>
                            <div class="text-purple">
                                <p class="">Before: {{ calc_passed_time(trade.timestamp) }}</p>
                            </div>
                            <div class="flex text-2xs">
                                <p>{{ trade.signature.slice(0, 10) }}[...]{{ trade.signature.slice(-10) }}</p>
                            </div>
                        </div>
                    </td>
                    <td id="mint" v-if="!is_simple">
                        <div class="flex flex-row space-x-2 text-xs">
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
                    <td id="wallet" v-if="!is_simple">
                        <div class="flex flex-row space-x-2 text-xs">
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
                                </div>
                                <div
                                    :class="
                                        trade.asset_receiving_wallet === trade.order_taker
                                            ? 'text-green-500'
                                            : 'text-red-500'
                                    "
                                >
                                    {{ trade.order_taker }}
                                </div>
                            </div>

                            <div class="flex flex-col">
                                <div
                                    :class="
                                        trade.asset_receiving_wallet === trade.order_initializer
                                            ? 'text-green-500'
                                            : 'text-red-500'
                                    "
                                >
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
                                    {{ trade.asset_receiving_wallet === trade.order_taker ? '[Buyer]' : '[Seller]' }}
                                </div>
                            </div>
                        </div>
                    </td>
                    <td
                        id="side"
                        v-if="is_simple"
                        class="uppercase"
                        :class="trade.asset_receiving_wallet === pubKey ? 'text-green-500' : 'text-red-500'"
                    >
                        {{ trade.asset_receiving_wallet === pubKey ? 'buy' : 'sell' }}
                    </td>
                    <td id="fee" class="text-right">
                        {{ ((trade.market_fee / (trade.asset_change * trade.price)) * 100).toFixed(1) }}%
                    </td>
                    <td id="size" class="text-right">x{{ trade.asset_change }}</td>
                    <td id="price" class="">
                        <div class="flex flex-row justify-end items-center space-x-2">
                            <div class="text-right">
                                {{ Number(trade.price) }}
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
                                <p
                                    v-if="
                                        trade.currency_mint ===
                                        CURRENCIES.find((c) => c.type === E_CURRENCIES.ATLAS)?.mint
                                    "
                                >
                                    {{ trade.total_cost }}
                                </p>
                                <p
                                    v-if="
                                        trade.currency_mint ===
                                        CURRENCIES.find((c) => c.type === E_CURRENCIES.USDC)?.mint
                                    "
                                >
                                    {{ trade.total_cost }}
                                </p>
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
import { CURRENCIES, E_CURRENCIES } from '../../typescript/constants/currencies.js'
import { E_EXPLORER, EXPLORER } from '../../typescript/constants/explorer.js'
import { Trade } from '../../typescript/skullnbones_api/skullnbones_api'
import { PropType } from 'vue'
import { calc_passed_time } from '../../typescript/helper/calc_passed_time'

defineProps({
    api_trades: {
        type: [] as PropType<Array<Trade>>,
    },
    is_simple: {
        type: Boolean,
        default: false,
    },
    pubKey: {
        type: String,
        default: '',
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

function formatNumberToBase10(num: number): string {
    const exponent = Math.floor(Math.log10(num))
    const base = num / Math.pow(10, exponent)
    return `${base}E${exponent}`
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
