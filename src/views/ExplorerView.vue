<template>
    <div class="mx-5">
        <div class="flex flex-col md:flex-row my-5 p-2 items-center border-2 rounded-2xl border-gray-700 space-x-2">
            <div class="dark:text-gray-100 border-gray-700 rounded-xl">
                <label class="input-group">
                    <span class="dark:bg-gray-800 dark:text-gray-400">Search</span>
                    <select
                        class="select md:select-md select-xs dark:bg-gray-700 dark:text-gray-400"
                        v-model="selected_search_type"
                    >
                        <option v-bind:value="'text'">Text</option>
                        <option v-bind:value="'mint'">Mint</option>
                        <option v-bind:value="'address'">Address</option>
                        <option v-bind:value="'signature'">Signature</option>
                    </select></label
                >
            </div>
            <div class="flex flex-row w-full items-center dark:text-gray-100">
                <input class="flex w-full bg-transparent p-2" v-model="user_search_text" type="text" />
                <div class="i-carbon:search m-2"></div>
            </div>
        </div>

        <div v-if="is_loading">
            <DotLoader class="flex w-full justify-center" :loading="is_loading" color="#ff150c" />
        </div>
        <div v-else class="flex flex-col space-y-2">
            <div
                class="elementcontainer h-64"
                v-if="chart.is_shown && (selected_search_type === 'mint' || selected_search_type === 'text')"
            >
                <chartjs-line-chart :data="chart.data" :labels="chart.lables"></chartjs-line-chart>
            </div>
            <div class="relative overflow-x-auto">
                <table>
                    <thead>
                        <tr>
                            <th></th>
                            <th class="text-left">Pair</th>
                            <th>Info</th>
                            <th>Mint</th>
                            <th>Wallets</th>
                            <th class="text-right">Size</th>
                            <th class="text-right">Cost</th>
                            <th class="text-right">Price</th>
                            <th class="text-right"></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(trade, idx) in api_trades" :key="idx">
                            <th>
                                <div class="w-12">
                                    <img
                                        class="rounded-md"
                                        :src="'/sa_images/webp/' + trade.asset_mint + '.webp'"
                                        alt="asset_image"
                                    />
                                </div>
                            </th>
                            <td class="font-bold">{{ trade.symbol }}</td>

                            <td>
                                <div class="flex flex-col text-xs">
                                    <div>{{ trade.signature.slice(0, 3) }}[...]{{ trade.signature.slice(-3) }}</div>
                                    <div>{{ new Date(trade.timestamp).toDateString() }}</div>
                                </div>
                            </td>

                            <td>
                                <div class="flex flex-col">
                                    <div class="flex flex-row space-x-1 text-xs">
                                        <div>Token:</div>
                                        <div>{{ trade.currency_mint }}</div>
                                    </div>
                                    <div class="flex flex-row space-x-1 text-xs">
                                        <div>Asset:</div>
                                        <div>{{ trade.asset_mint }}</div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div class="flex flex-col">
                                    <div class="flex flex-row space-x-1 text-xs">
                                        <div>Seller:</div>
                                        <div>{{ trade.order_initializer }}</div>
                                    </div>
                                    <div class="flex flex-row space-x-1 text-xs">
                                        <div>Buyer:</div>
                                        <div>{{ trade.order_taker }}</div>
                                    </div>
                                </div>
                            </td>
                            <td class="text-right">{{ trade.asset_change }}</td>
                            <td class="">
                                <div class="flex flex-row justify-end items-center space-x-2">
                                    <div class="text-right">{{ trade.total_cost.toFixed(2) }}</div>

                                    <CurrencyIcon
                                        class="w-4 h-4"
                                        :currency="CURRENCIES.find((c) => c.mint === trade.currency_mint)"
                                    />
                                </div>
                            </td>
                            <td class="">
                                <div class="flex flex-row justify-end items-center space-x-2">
                                    <div class="text-right">
                                        {{ (trade.total_cost / trade.asset_change).toFixed(5) }}
                                    </div>

                                    <CurrencyIcon
                                        class="w-4 h-4"
                                        :currency="CURRENCIES.find((c) => c.mint === trade.currency_mint)"
                                    />
                                </div>
                            </td>

                            <td class="">
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
    </div>
</template>

<script setup lang="ts">
import BounceLoader from 'vue-spinner/src/BounceLoader.vue'
import DotLoader from 'vue-spinner/src/DotLoader.vue'
import { Api, SATrade } from '../typescript/skullnbones_api/skullnbones_api'
import { onMounted, reactive, ref, watch } from 'vue'
import CurrencyIcon from '../components/icon-helper/CurrencyIcon.vue'
import { CURRENCIES, E_CURRENCIES } from '../typescript/constants/currencies'
import ChartjsLineChart from '../components/charts/chartjs/ChartjsLineChart.vue'
import ExplorerIcon from '../components/icon-helper/ExplorerIcon.vue'
import { E_EXPLORER, EXPLORER } from '../typescript/constants/explorer.js'
import { useAssetsStore } from '../stores/AssetsStore'
import { Dropdown, ListGroup, ListGroupItem } from 'flowbite-vue'

const selected_search_type = ref<'mint' | 'address' | 'signature' | 'text'>('text')
const api_trades = ref<Array<SATrade>>()
const user_search_text = ref('ammo')
const chart = reactive({
    is_shown: false,
    data: [
        {
            label: 'Line One',
            yAxisID: 'Left',
            radius: 3,
            fill: false,
            borderColor: '#0f86ff',
            data: [0, 0, 5],
        },
        {
            label: 'Line two',
            yAxisID: 'Right',
            radius: 3,
            fill: false,
            borderColor: '#816223',
            data: [0, 0, 5],
        },
    ],
    lables: [0, 1, 2],
})

const is_loading = ref(true)

watch(user_search_text, () => {
    is_loading.value = true
    console.log(user_search_text)
    action_fetch_api()
    is_loading.value = false
})

watch(selected_search_type, async () => {
    is_loading.value = true
    api_trades.value = []
    await action_fetch_api()
    is_loading.value = false
})

onMounted(async () => {
    is_loading.value = true
    while (useAssetsStore().allAssets.length === 0) {
        await delay(1000)
    }
    await action_fetch_api()
    is_loading.value = false
})

async function action_fetch_api() {
    chart.is_shown = false

    const api = new Api({ baseUrl: 'https://api2.skullnbones.xyz' })
    let data: SATrade[] = []

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
        case 'text':
            await api.trades
                .getMint({
                    mint:
                        useAssetsStore().allAssets.find(
                            (asset) =>
                                asset.symbol.toUpperCase().includes(user_search_text.value.toUpperCase()) ||
                                asset.name.toUpperCase().includes(user_search_text.value.toUpperCase())
                        )?.mint ?? 'fuel',
                    limit: 100,
                })
                .then((resp) => (data = resp.data))
                .catch((err) => console.error(err))
            break
    }
    api_trades.value = []
    api_trades.value = data

    chart.lables = []
    chart.data.forEach((d) => (d.data = []))

    data.forEach((trade) => {
        switch (trade.currency_mint) {
            case CURRENCIES.find((c) => c.type == E_CURRENCIES.ATLAS)?.mint:
                chart.data[0].label = 'ATLAS'
                chart.data[0].data.push(trade.total_cost / trade.asset_change)
                break
            case CURRENCIES.find((c) => c.type == E_CURRENCIES.USDC)?.mint:
                chart.data[1].label = 'USDC'
                chart.data[1].data.push(trade.total_cost / trade.asset_change)
                break
        }
        chart.lables.push(trade.timestamp)
    })

    //  chart.data = data.flatMap((trade) => trade.price) as never
    //  chart.lables = data.flatMap((trade) => trade.timestamp) as never
    chart.is_shown = true
}

function delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms))
}
</script>

<style scoped>
ul {
    @apply hidden text-sm font-medium text-center text-gray-500 divide-x divide-gray-200 rounded-lg shadow sm:flex dark:divide-gray-700 dark:text-gray-400;
}
#s_element {
    @apply inline-block w-full p-4 bg-white  hover:text-gray-700 hover:bg-gray-50 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700;
}
#s_element.active {
    @apply dark:bg-gray-700 dark:text-gray-200;
}

a {
    display: block;
}
</style>
