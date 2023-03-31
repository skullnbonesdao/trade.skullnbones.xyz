<template>
    <LoadingModal v-model="show_loading_modal" @confirm="show_loading_modal = false" />
    <div class="flex flex-col space-y-2">
        <div v-if="!useWallet().publicKey.value" class="flex w-full elementcontainer justify-center p-2">
            <wallet-multi-button dark />
        </div>
        <div v-else-if="!is_loading" class="flex flex-col space-y-2">
            <div class="grid sm:grid-cols-3 grid-cols-2 gap-2 justify-around">
                <TokenWalletInfoBadge
                    class="col-span-2 sm:col-span-1"
                    :currency="CURRENCIES.find((c) => c.type === E_CURRENCIES.SOL)"
                />
                <TokenWalletInfoBadge :currency="CURRENCIES.find((c) => c.type === E_CURRENCIES.ATLAS)" />
                <TokenWalletInfoBadge :currency="CURRENCIES.find((c) => c.type === E_CURRENCIES.POLIS)" />
            </div>
            <div class="elementcontainer">
                <h1 class="text-4xl">History</h1>
            </div>

            <h3 v-if="api_trades.s === 1" class="elementcontainer text-center">No Data found!</h3>

            <div
                v-else
                v-for="(element_group, idx) in api_trades_grouped"
                :key="idx"
                class="elementcontainer relative overflow-x-auto"
            >
                <div
                    class="flex flex-row items-center elementcontainer hoverable border-b-2 border-gray-300"
                    @click="toggle_view(idx)"
                >
                    <h3 class="w-full">
                        {{ useAssetsStore().allAssets.find((a) => a.mint === element_group[0].asset_mint)?.name }}
                    </h3>
                    <div class="flex justify-end items-center">
                        <i
                            class="w-12 h-12 i-carbon:text-indent-more"
                            :class="show_element_from_grouped?.find((e) => e.index === idx)?.value ? 'rotate-90' : ''"
                        ></i>
                    </div>
                </div>
                <Transition>
                    <AssetTableModular :is_simple="true" :api_trades="element_group" :pub-key="publicKey.toString()" />

                    <!--                    <table v-if="show_element_from_grouped?.find((e) => e.index === idx)?.value" class="">-->
                    <!--                        <thead>-->
                    <!--                            <tr>-->
                    <!--                                <th></th>-->
                    <!--                                <th class="text-left">Pair</th>-->
                    <!--                                <th>Info</th>-->
                    <!--                                <th class="text-left">Side</th>-->
                    <!--                                <th class="text-right">Size</th>-->
                    <!--                                <th class="text-right">Cost</th>-->
                    <!--                                <th class="text-right">Price</th>-->
                    <!--                                <th class="text-right"></th>-->
                    <!--                            </tr>-->
                    <!--                        </thead>-->
                    <!--                        <tbody>-->
                    <!--                            <tr v-for="(trade, idx) in element_group" :key="idx">-->
                    <!--                                <th id="">-->
                    <!--                                    <AssetPairImage-->
                    <!--                                        :mint="trade.asset_mint"-->
                    <!--                                        :pair="CURRENCIES.find((c) => c.mint === trade.currency_mint)"-->
                    <!--                                    />-->
                    <!--                                </th>-->
                    <!--                                <td id="pair" class="font-bold">{{ trade.symbol }}</td>-->
                    <!--                                <td id="info">-->
                    <!--                                    <div class="flex flex-col text-sm">-->
                    <!--                                        <div class="flex">-->
                    <!--                                            UTC: {{ new Date(trade.timestamp * 1000).toUTCString() }}-->
                    <!--                                        </div>-->
                    <!--                                        <div class="flex text-purple">-->
                    <!--                                            <p>Before: {{ calc_passed_time(trade.timestamp) }}</p>-->
                    <!--                                        </div>-->
                    <!--                                        <div class="flex text-2xs">-->
                    <!--                                            <p>{{ trade.signature }}</p>-->
                    <!--                                        </div>-->
                    <!--                                    </div>-->
                    <!--                                </td>-->
                    <!--                                <td id="buy-sell" class="text-left">-->
                    <!--                                    <div class="text-blue" v-if="trade.order_taker === publicKey?.toString()">-->
                    <!--                                        Taker-->
                    <!--                                    </div>-->
                    <!--                                    <div v-else class="text-orange">Maker</div>-->
                    <!--                                </td>-->

                    <!--                                <td id="size" class="text-right">{{ trade.asset_change }}</td>-->
                    <!--                                <td id="cost" class="">-->
                    <!--                                    <div class="flex flex-row justify-end items-center space-x-2">-->
                    <!--                                        <div class="text-right">-->
                    <!--                                            {{ (trade.asset_change * trade.price).toFixed(2) }}-->
                    <!--                                        </div>-->
                    <!--                                        <CurrencyIcon-->
                    <!--                                            class="w-4 h-4"-->
                    <!--                                            :currency="CURRENCIES.find((c) => c.mint === trade.currency_mint)"-->
                    <!--                                        />-->
                    <!--                                    </div>-->
                    <!--                                </td>-->
                    <!--                                <td id="price" class="">-->
                    <!--                                    <div class="flex flex-row justify-end items-center space-x-2">-->
                    <!--                                        <div class="text-right">-->
                    <!--                                            {{ trade.price }}-->
                    <!--                                        </div>-->

                    <!--                                        <CurrencyIcon-->
                    <!--                                            class="w-4 h-4"-->
                    <!--                                            :currency="CURRENCIES.find((c) => c.mint === trade.currency_mint)"-->
                    <!--                                        />-->
                    <!--                                    </div>-->
                    <!--                                </td>-->
                    <!--                                <td id="" class="">-->
                    <!--                                    <div class="flex flex-row justify-end items-center space-x-2">-->
                    <!--                                        <ExplorerIcon-->
                    <!--                                            class="w-5"-->
                    <!--                                            :explorer="EXPLORER.find((e) => e.type === E_EXPLORER.SOLSCAN)"-->
                    <!--                                            :signature="trade.signature"-->
                    <!--                                        />-->
                    <!--                                        <ExplorerIcon-->
                    <!--                                            class="w-5"-->
                    <!--                                            :explorer="EXPLORER.find((e) => e.type === E_EXPLORER.SOLANAFM)"-->
                    <!--                                            :signature="trade.signature"-->
                    <!--                                        />-->
                    <!--                                    </div>-->
                    <!--                                </td>-->
                    <!--                            </tr>-->
                    <!--                        </tbody>-->
                    <!--                    </table>-->
                </Transition>
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
import AssetPairImage from '../components/marketplace/AssetPairImage.vue'
import { CURRENCIES, E_CURRENCIES } from '../typescript/constants/currencies.js'
import ExplorerIcon from '../components/icon-helper/ExplorerIcon.vue'
import { E_EXPLORER, EXPLORER } from '../typescript/constants/explorer.js'
import CurrencyIcon from '../components/icon-helper/CurrencyIcon.vue'
import { Api, Trade } from '../typescript/skullnbones_api/skullnbones_api'
import { useWallet, WalletMultiButton } from 'solana-wallets-vue'
import { groupBy } from '../typescript/helper/groupBy'
import { useAssetsStore } from '../stores/AssetsStore'
import TokenWalletInfoBadge from '../components/elements/TokenWalletInfoBadge.vue'
import { useGlobalStore } from '../stores/GlobalStore'
import WalletInfoBadge from '../components/elements/WalletInfoBadge.vue'
import LoadingModal from '../components/modals/LoadingModal.vue'
import { calc_passed_time } from '../typescript/helper/calc_passed_time'
import BeatLoader from 'vue-spinner/src/BeatLoader.vue'
import AssetTableModular from '../components/tables/AssetTableModular.vue'
const { publicKey } = useWallet()

interface GroupedToggle {
    index: String
    value: Boolean
}

const show_loading_modal = ref(true)
const is_loading = ref(true)
const api_trades = ref<Array<Trade> | any>()
const api_trades_grouped = ref<Record<string, Trade[]>>()
const show_element_from_grouped = ref<Array<GroupedToggle>>()

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

            if (api_trades.value != undefined && api_trades.value.s !== 1) {
                api_trades_grouped.value = groupBy(api_trades.value, (t) => t.asset_mint)
                show_element_from_grouped.value = []
                Object.keys(api_trades_grouped.value).forEach((t) =>
                    show_element_from_grouped.value?.push({
                        index: t,
                        value: true,
                    })
                )
            }

            is_loading.value = false
        })
}

function toggle_view(idx: String) {
    show_element_from_grouped.value?.forEach((e) => {
        if (e.index == idx) e.value = !e.value
    })
}
</script>
