<template>
    <div class="mx-5">
        <div class="flex my-5 p-2 items-center border-2 rounded-2xl border-gray-700 space-x-2">
            <ul>
                <li class="w-full">
                    <a
                        class="rounded-l-lg"
                        @click="selected_search_type = 'mint'"
                        :class="selected_search_type === 'mint' ? ' active' : ''"
                        >Mint</a
                    >
                </li>
                <li class="w-full">
                    <a
                        @click="selected_search_type = 'address'"
                        :class="selected_search_type === 'address' ? ' active' : ''"
                        >Address</a
                    >
                </li>
                <li class="w-full">
                    <a
                        class="rounded-r-lg"
                        @click="selected_search_type = 'signature'"
                        :class="selected_search_type === 'signature' ? ' active' : ''"
                        >Signature</a
                    >
                </li>
            </ul>
            <div class="flex flex-row w-full items-center dark:text-gray-100 border-2 border-gray-700 rounded-xl">
                <input class="flex w-full bg-transparent p-2" v-model="user_search_text" type="text" />
                <div class="i-carbon:search m-2"></div>
            </div>
        </div>

        <div class="flex h-56" v-if="chart.is_shown && selected_search_type === 'mint'">
            <chartjs-line-chart :data="chart.data" :labels="chart.lables"></chartjs-line-chart>
        </div>
        <div class="relative overflow-x-auto">
            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th class="text-left">Pair</th>
                        <th>Timestamp</th>
                        <th>Signature</th>
                        <th>Mint</th>
                        <th>Wallets</th>
                        <th class="text-right">Size</th>
                        <th class="text-right">Price</th>
                        <th class="text-right">Cost</th>
                        <th class="text-right"></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="trade in api_trades" :key="trade">
                        <th>
                            <div class="w-12">
                                <img
                                    class="rounded-md"
                                    :src="'/sa_images/webp/' + trade.assetMint + '.webp'"
                                    alt="asset_image"
                                />
                            </div>
                        </th>
                        <td class="font-bold">{{ trade.pair }}</td>
                        <td>{{ new Date(trade.timestamp).toUTCString() }}</td>
                        <td>{{ trade.signature.slice(0, 3) }}[...]{{ trade.signature.slice(-3) }}</td>

                        <td>
                            <div class="flex flex-col">
                                <div class="flex flex-row space-x-1">
                                    <div>Token:</div>
                                    <div>{{ trade.currencyMint }}</div>
                                </div>
                                <div class="flex flex-row space-x-1">
                                    <div>Asset:</div>
                                    <div>{{ trade.assetMint }}</div>
                                </div>
                            </div>
                        </td>
                        <td>
                            <div class="flex flex-col">
                                <div class="flex flex-row space-x-1">
                                    <div>Seller:</div>
                                    <div>{{ trade.orderInitializer }}</div>
                                </div>
                                <div class="flex flex-row space-x-1">
                                    <div>Buyer:</div>
                                    <div>{{ trade.orderTaker }}</div>
                                </div>
                            </div>
                        </td>
                        <td class="text-right">{{ trade.size }}</td>
                        <td class="">
                            <div class="flex flex-row justify-end items-center space-x-2">
                                <div class="text-right">{{ trade.price.toFixed(5) }}</div>

                                <CurrencyIcon
                                    class="w-4 h-4"
                                    :currency="CURRENCIES.find((c) => c.mint === trade.currencyMint)"
                                />
                            </div>
                        </td>

                        <td class="">
                            <div class="flex flex-row justify-end items-center space-x-2">
                                <div class="text-right">{{ trade.cost.toFixed(2) }}</div>

                                <CurrencyIcon
                                    class="w-4 h-4"
                                    :currency="CURRENCIES.find((c) => c.mint === trade.currencyMint)"
                                />
                            </div>
                        </td>
                        <td class="">
                            <div class="flex flex-row justify-end items-center space-x-2">
                                <ExplorerIcon :explorer="EXPLORER.find((e) => e.type === E_EXPLORER.SOLSCAN)" />
                                <ExplorerIcon :explorer="EXPLORER.find((e) => e.type === E_EXPLORER.SOLANAFM)" />
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Api, TradesResponse } from '../typescript/skullnbones_api/skullnbones_api'
import { onMounted, reactive, ref, watch } from 'vue'
import { useGlobalStore } from '../stores/GlobalStore'
import CurrencyIcon from '../components/icon-helper/CurrencyIcon.vue'
import { CURRENCIES } from '../typescript/constants/currencies'
import ChartjsLineChart from '../components/charts/chartjs/ChartjsLineChart.vue'
import ExplorerIcon from '../components/icon-helper/ExplorerIcon.vue'
import { E_EXPLORER, EXPLORER } from '../typescript/constants/explorer.js'
import { Button } from 'flowbite-vue'

const selected_search_type = ref<'mint' | 'address' | 'signature'>('mint')
const api_trades = ref<Array<TradesResponse>>()
const user_search_text = ref('ammo')
const chart = reactive({
    is_shown: false,
    data: [0, 1, 2],
    lables: [0, 1, 2],
})

watch(user_search_text, () => {
    console.log(user_search_text)
    action_fetch_api()
})

onMounted(async () => {
    action_fetch_api()
})

async function action_fetch_api() {
    chart.is_shown = false

    const api = new Api({ baseUrl: 'https://api2.skullnbones.xyz' })
    let data: TradesResponse[] = []

    switch (selected_search_type.value) {
        case 'mint':
            await api.trades
                .getMint({ mint: user_search_text.value, limit: 100 })
                .then((resp) => {
                    data = resp.data
                })
                .catch((err) => console.error(err))
            break
        case 'address':
            await api.trades
                .getAddress({ address: user_search_text.value, limit: 100 })
                .then((resp) => {
                    data = resp.data
                })
                .catch((err) => console.error(err))
            break
        case 'signature':
            await api.trades
                .getSignature({ signature: user_search_text.value })
                .then((resp) => {
                    data = resp.data
                })
                .catch((err) => console.error(err))
            break
    }

    api_trades.value = data
    chart.data = data.flatMap((trade) => trade.price) as never
    chart.lables = data.flatMap((trade) => trade.timestamp) as never
    chart.is_shown = true
}
</script>

<style scoped>
ul {
    @apply hidden text-sm font-medium text-center text-gray-500 divide-x divide-gray-200 rounded-lg shadow sm:flex dark:divide-gray-700 dark:text-gray-400;
}
a {
    @apply inline-block w-full p-4 bg-white  hover:text-gray-700 hover:bg-gray-50 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700;
}
a.active {
    @apply dark:bg-gray-700 dark:text-gray-200;
}
</style>
