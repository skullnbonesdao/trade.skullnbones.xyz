<template>
    <div class="flex flex-col space-y-2">
        <div class="elementcontainer">
            <div class="flex">
                <h1 class="text-4xl">Active</h1>
            </div>
        </div>
        <order-table :orders="orders" class="elementcontainer" />
        <div class="elementcontainer">
            <div class="flex">
                <h1 class="text-4xl">History</h1>
            </div>
        </div>
        <div class="elementcontainer">
            <table v-if="history" class="">
                <thead>
                    <tr>
                        <th></th>
                        <th class="text-left">Pair</th>
                        <th>Info</th>
                        <th class="text-left">Side</th>
                        <th class="text-right">Fee</th>
                        <th class="text-right">Size</th>
                        <th class="text-right">Price</th>

                        <th class="text-right">Cost</th>
                        <th class="text-right"></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(trade, idx) in history" :key="idx">
                        <th id="">
                            <AssetPairImage
                                :mint="trade.asset_mint"
                                :pair="CURRENCIES.find((c) => c.mint === trade.currency_mint)"
                            />
                        </th>
                        <td id="pair" class="font-bold">{{ trade.symbol }}</td>
                        <td id="info">
                            <div class="flex flex-col text-sm">
                                <div class="flex">UTC: {{ new Date(trade.timestamp * 1000).toUTCString() }}</div>
                                <div class="flex text-purple">
                                    <p>Before: {{ calc_passed_time(trade.timestamp) }}</p>
                                </div>
                                <div class="flex text-2xs">
                                    <p>{{ trade.signature }}</p>
                                </div>
                            </div>
                        </td>
                        <td id="buy-sell" class="text-left">
                            <div class="text-blue" v-if="trade.order_taker === publicKey?.toString()">Taker</div>
                            <div class="text-orange" v-if="trade.order_initializer === publicKey?.toString()">
                                Maker
                            </div>
                        </td>
                        <td id="fee" class="">
                            <div class="flex flex-row justify-end items-center space-x-2">
                                <div class="text-right">
                                    {{ ((trade.market_fee / (trade.asset_change * trade.price)) * 100).toFixed(2) }}%
                                </div>
                            </div>
                        </td>
                        <td id="size" class="text-right">{{ trade.asset_change }}</td>
                        <td id="price" class="">
                            <div class="flex flex-row justify-end items-center space-x-2">
                                <div class="text-right">
                                    {{ trade.price }}
                                </div>
                                <CurrencyIcon
                                    class="w-4 h-4"
                                    :currency="CURRENCIES.find((c) => c.mint === trade.currency_mint)"
                                />
                            </div>
                        </td>

                        <td id="cost" class="">
                            <div class="flex flex-row justify-end items-center space-x-2">
                                <div class="text-right">
                                    {{ trade.price * trade.asset_change }}
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
    </div>
</template>

<script setup>
import { useWallet } from 'solana-wallets-vue'
import { onMounted, ref, watchEffect } from 'vue'
import OrderTable from '../components/tables/OrderTable.vue'
import { useStaratlasGmStore } from '../stores/StaratlasGmStore'
import { Api } from '../typescript/skullnbones_api/skullnbones_api'
import AssetPairImage from '../components/marketplace/AssetPairImage.vue'
import { CURRENCIES } from '../typescript/constants/currencies'
import { calc_passed_time } from '../typescript/helper/calc_passed_time'
import CurrencyIcon from '../components/icon-helper/CurrencyIcon.vue'
import ExplorerIcon from '../components/icon-helper/ExplorerIcon.vue'
import { E_EXPLORER, EXPLORER } from '../typescript/constants/explorer'
const { publicKey } = useWallet()

let orders = ref()
let history = ref()

const api = new Api({ baseUrl: 'https://api2.skullnbones.xyz' })

watchEffect(async () => {
    orders.value = await useStaratlasGmStore().getOpenOrdersForPlayer(useWallet().publicKey.value)
})

onMounted(() => {
    fetch_trades()
})

function fetch_trades() {
    api.trades
        .getAddress({ address: publicKey.value?.toString() ?? '' })
        .then((resp) => resp.data)
        .then((data) => {
            history.value = data
        })
}
</script>
