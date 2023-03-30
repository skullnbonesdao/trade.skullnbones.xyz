<template>
    <div class="">
        <div
            class="elementcontainer flex flex-col md:flex-row my-2 p-2 items-center border-gray-700 md:space-x-2 space-y-1 md:space-y-0"
        >
            <div
                class="flex md:flex-row md:space-x-2 md:space-y-0 space-y-2 flex-col w-full items-center bg-gray-300 dark:bg-gray-600 p-1 shadow-lg"
            >
                <SelectBox
                    class="flex w-full"
                    text="Category"
                    :selected_in="selected_search_type"
                    :options="['symbol', 'mint', 'address', 'signature']"
                    @selected="
                        (value) => {
                            selected_search_type = value
                        }
                    "
                ></SelectBox>
                <SelectBox
                    class="flex"
                    text="Limit"
                    :selected_in="selected_search_limit.toString()"
                    :options="[10, 100, 500]"
                    @selected="
                        (value) => {
                            selected_search_limit = value
                        }
                    "
                ></SelectBox>

                <TextBox
                    class="flex w-full"
                    text="Search"
                    type="text"
                    ref="tb_value"
                    :default="useGlobalStore().symbol.name"
                />
                <div
                    @click="
                        () => {
                            action_fetch_api().then(() => {})
                        }
                    "
                    class="hoverable w-full flex flex-auto bg-gray-200 dark:bg-gray-800"
                >
                    <div class="flex-grow my-3 w-16 i-carbon:search"></div>
                </div>
            </div>
        </div>
        <div v-if="is_loading">
            <DotLoader class="flex w-full justify-center" :loading="is_loading" color="#ff150c" />
        </div>
        <div v-if="!no_data && !is_loading" class="flex flex-col space-y-2">
            <div class="elementcontainer" v-if="selected_search_type === 'mint' || selected_search_type === 'symbol'">
                <ExplorerChartElement v-if="!is_loading" :x_values="chart.data" :y_values="chart.lables" />
            </div>

            <AssetTableModular :api_trades="api_trades" />
        </div>
        <div class="elementcontainer text-center text-xl" v-if="no_data && !is_loading">No Data Found!</div>
    </div>
</template>

<script setup lang="ts">
import DotLoader from 'vue-spinner/src/DotLoader.vue'
import { Api, Trade } from '../typescript/skullnbones_api/skullnbones_api'
import { onMounted, reactive, ref } from 'vue'
import { CURRENCIES, E_CURRENCIES } from '../typescript/constants/currencies'
import { useAssetsStore } from '../stores/AssetsStore'
import SelectBox from '../components/buttons/SelectBox.vue'
import ExplorerChartElement from '../components/elements/ExplorerChartElement.vue'
import TextBox from '../components/buttons/TextBox.vue'
import { useGlobalStore } from '../stores/GlobalStore'
import AssetTableModular from '../components/tables/AssetTableModular.vue'

const no_data = ref(false)
const selected_search_type = ref<'mint' | 'address' | 'signature' | 'symbol'>('symbol')
const selected_search_limit = ref<10 | 100 | 500>(100)

const api_trades = ref<Array<Trade>>()

const tb_value = ref({ text_box_value: 'AMMOUSDC' })
const chart = reactive({
    data: [
        [0, 0, 5],
        [0, 0, 5],
    ],
    lables: [0, 1, 2],
})

const is_loading = ref(true)

// watch(
//     () => tb_value.value.text_box_value,
//     (new_value) => {
//         is_loading.value = true
//         action_fetch_api()
//     }
// )

onMounted(async () => {
    is_loading.value = true
    while (useAssetsStore().allAssets.length === 0) {
        await delay(1000)
    }
    await action_fetch_api()
})

async function action_fetch_api() {
    is_loading.value = true
    const api = new Api({ baseUrl: 'https://api2.skullnbones.xyz' })
    let data: Trade[] = []

    switch (selected_search_type.value) {
        case 'mint':
            await api.trades
                .getMint({ asset_mint: tb_value.value.text_box_value, limit: selected_search_limit.value })
                .then((resp) => {
                    data = resp.data
                })
                .catch((err) => console.error(err))
            break
        case 'address':
            await api.trades
                .getAddress({ address: tb_value.value.text_box_value, limit: selected_search_limit.value })
                .then((resp) => {
                    data = resp.data
                })
                .catch((err) => console.error(err))
            break
        case 'signature':
            await api.trades
                .getSignature({ signature: tb_value.value.text_box_value, limit: selected_search_limit.value })
                .then((resp) => {
                    data = resp.data
                })
                .catch((err) => console.error(err))
            break
        case 'symbol':
            await api.trades
                .getSymbol({ symbol: tb_value.value.text_box_value, limit: selected_search_limit.value })
                .then((resp) => {
                    data = resp.data
                })
                .catch((err) => console.error(err))
            break
    }

    chart.lables = []
    chart.data = [[], []]
    api_trades.value = []

    console.log(data.length)
    if (data.length != undefined) {
        api_trades.value = data.sort((a, b) => b.timestamp - a.timestamp)

        data.forEach((trade) => {
            switch (trade.currency_mint) {
                case CURRENCIES.find((c) => c.type == E_CURRENCIES.ATLAS)?.mint:
                    chart.data[0].push(trade.total_cost / trade.asset_change)
                    break
                case CURRENCIES.find((c) => c.type == E_CURRENCIES.USDC)?.mint:
                    chart.data[1].push(trade.total_cost / trade.asset_change)
                    break
            }
            chart.lables.push(trade.timestamp * 1000)
        })
        is_loading.value = false
        no_data.value = false
    } else {
        is_loading.value = false
        no_data.value = true
    }
}

function calc_passed_time(timestamp_to_get_since: number): String {
    let now = Date.now()
    let old: any = new Date(timestamp_to_get_since * 1000)
    let diffMs = now - old
    let diffDays = Math.floor(diffMs / 86400000) // days
    let diffHrs = Math.floor((diffMs % 86400000) / 3600000) // hours
    let diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000) // minutes
    return diffDays + ' days, ' + diffHrs + ' hours, ' + diffMins + ' minutes'
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
