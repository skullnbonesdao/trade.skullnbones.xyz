<template>
    <div class="flex flex-col space-y-2">
        <div class="elementcontainer">
            <h1 class="text-4xl">Wallet History</h1>
        </div>
        <div v-if="!useWallet().publicKey.value" class="flex w-full elementcontainer justify-center p-2">
            <wallet-multi-button dark />
        </div>

        <div v-if="!is_loading && api_trades" class="space-y-2">
            <div v-for="(element_group, idx) in api_trades_grouped" :key="idx" class="elementcontainer">
                <h2>{{ useAssetsStore().allAssets.find((a) => a.mint === element_group[0].asset_mint)?.name }}</h2>
                <table class="relative overflow-x-auto">
                    <thead>
                        <tr>
                            <th></th>
                            <th class="text-left">Pair</th>
                            <th>Info</th>
                            <th class="text-left">Side</th>
                            <th class="text-right">Size</th>
                            <th class="text-right">Cost</th>
                            <th class="text-right">Price</th>
                            <th class="text-right"></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(trade, idx) in element_group" :key="idx">
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

                            <td id="size" class="text-right">{{ trade.asset_change }}</td>
                            <td id="cost" class="">
                                <div class="flex flex-row justify-end items-center space-x-2">
                                    <div class="text-right">{{ (trade.asset_change * trade.price).toFixed(2) }}</div>
                                    <CurrencyIcon
                                        class="w-4 h-4"
                                        :currency="CURRENCIES.find((c) => c.mint === trade.currency_mint)"
                                    />
                                </div>
                            </td>
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

        <BeatLoader
            class="elementcontainer flex w-full justify-center"
            :loading="is_loading && publicKey"
            color="#ff150c"
        />
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import BeatLoader from 'vue-spinner/src/BeatLoader.vue'
import AssetPairImage from '../components/marketplace/AssetPairImage.vue'
import { CURRENCIES } from '../typescript/constants/currencies.js'
import ExplorerIcon from '../components/icon-helper/ExplorerIcon.vue'
import { E_EXPLORER, EXPLORER } from '../typescript/constants/explorer.js'
import CurrencyIcon from '../components/icon-helper/CurrencyIcon.vue'
import { Api, Trade } from '../typescript/skullnbones_api/skullnbones_api'
import { useWallet, WalletMultiButton } from 'solana-wallets-vue'
import { groupBy } from '../typescript/helper/groupBy'
import { useAssetsStore } from '../stores/AssetsStore'

const { publicKey } = useWallet()

const is_loading = ref(true)
const api_trades = ref<Array<Trade>>()
const api_trades_grouped = ref<Record<string, Trade[]>>()

const api = new Api({ baseUrl: 'https://api2.skullnbones.xyz' })

watch(
    () => publicKey.value,
    (new_value) => {
        is_loading.value = true
        fetch_wallet_trades()
    }
)

onMounted(() => {
    is_loading.value = true
    if (publicKey.value) fetch_wallet_trades()
})

function fetch_wallet_trades() {
    api.trades
        .getAddress({ address: publicKey.value?.toString() ?? '' })
        .then((resp) => resp.data)
        .then((data) => {
            api_trades.value = data

            if (api_trades.value != undefined) api_trades_grouped.value = groupBy(api_trades.value, (t) => t.asset_mint)
            is_loading.value = false
        })
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
</script>
