<template>
    <div
        @click="
            () => {
                show_search_modal = false
            }
        "
        class="flex sm:flex-row flex-col space-x-5 items-center sm:space-y-0 space-y-3"
    >
        <div class="flex flex-row w-full">
            <div class="flex flex-col w-full sm:pr-3 sm:flex-row">
                <div class="flex w-full flex-row items-center space-x-3">
                    <AssetPairImage
                        :mint="useGlobalStore().symbol.mint_asset.toString()"
                        :pair="CURRENCIES.find((c) => c.mint === useGlobalStore().symbol.mint_pair.toString())"
                    />
                    <div class="flex w-full flex-col sm:flex-row items-baseline">
                        <h3 class="w-full">
                            {{
                                useAssetsStore().allAssets.find(
                                    (asset) => asset.mint.toString() === useGlobalStore().symbol.mint_asset.toString()
                                )?.name
                            }}
                        </h3>
                        <div class="flex flex-row items-center space-x-2 sm:justify-end">
                            <div>
                                <div class="flex flex-row items-center space-x1">
                                    <p>{{ price_last?.toFixed(6) }}</p>
                                    <CurrencyIcon
                                        class="w-4 h-4"
                                        :currency="
                                            CURRENCIES.find(
                                                (c) => useGlobalStore().symbol.mint_pair.toString() === c.mint
                                            )
                                        "
                                    />
                                </div>
                                <div class="flex items-center sm:float-right">
                                    <div
                                        class="text-sm"
                                        :class="
                                            price_24_change === 1
                                                ? 'i-carbon-arrow-right text-gray'
                                                : price_24_change >= 1
                                                ? 'i-carbon-arrow-down-right text-red'
                                                : 'i-carbon-arrow-up-right text-green'
                                        "
                                    ></div>

                                    <div
                                        class="text-right text-sm"
                                        :class="
                                            price_24_change === 1
                                                ? 'text-gray'
                                                : price_24_change > 1
                                                ? 'text-red'
                                                : 'text-green'
                                        "
                                    >
                                        {{
                                            price_24_change >= 1
                                                ? (price_24_change - 1).toFixed(2)
                                                : (1 - price_24_change).toFixed(2)
                                        }}%
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="flex flex-col items-end">
                        <AssetRarityBadge
                            :asset_class="
                                useAssetsStore().allAssets.find(
                                    (a) => a.mint === useGlobalStore().symbol.mint_asset.toString()
                                )?.attributes?.rarity
                            "
                        />
                        <AssetItemTypeBadge
                            :asset_class="
                                useAssetsStore().allAssets.find(
                                    (a) => a.mint === useGlobalStore().symbol.mint_asset.toString()
                                )?.attributes?.itemType
                            "
                        />
                        <AssetTextBadge
                            :text="
                                useAssetsStore().allAssets.find(
                                    (a) => a.mint === useGlobalStore().symbol.mint_asset.toString()
                                )?.attributes?.spec
                            "
                        />
                    </div>
                </div>
            </div>
            <div class="flex items-center px-3 border-l">
                <div class="i-carbon:search" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Button } from 'flowbite-vue'
import { useGlobalStore } from '../../stores/GlobalStore'
import { useAssetsStore } from '../../stores/AssetsStore'
import { CURRENCIES } from '../../typescript/constants/currencies'
import { ref, watch } from 'vue'

import AssetPairImage from './AssetPairImage.vue'
import AssetRarityBadge from '../badges/AssetRarityBadge.vue'
import AssetItemTypeBadge from '../badges/AssetItemTypeBadge.vue'
import AssetTextBadge from '../badges/AssetTextBadge.vue'
import { Api, Trade } from '../../typescript/skullnbones_api/skullnbones_api'
import CurrencyIcon from '../icon-helper/CurrencyIcon.vue'
const api = new Api({ baseUrl: 'https://api2.skullnbones.xyz' })

const show_search_modal = ref(false)
const price_24_h = ref(0.0)
const price_last = ref(0.0)
const price_24_change = ref(0.0)

fetch_price_24_h()

watch(useGlobalStore().symbol, (new_value) => {
    fetch_price_24_h()
})

async function action_update_symbol(symbol: string) {
    show_search_modal.value = false
    if (symbol.length > 0) {
        useGlobalStore().draw_tv = true
        useGlobalStore().updateSymbol(symbol)
    }
    console.log(symbol)
}

async function fetch_price_24_h() {
    let tsNow = Math.round(new Date().getTime() / 1000)
    let tsYesterday = tsNow - 24 * 3600
    let api_trade: Trade[] = []

    let price_temp = 0

    //Get trade now-24h
    await api.trades
        .getSymbol({ symbol: useGlobalStore().symbol?.name, limit: 1, to: tsYesterday })
        .then((resp) => resp.data)
        .then((data) => {
            console.log(data[0])
            price_24_h.value = data[0].price
        })
    //Get trade now
    await api.trades
        .getSymbol({ symbol: useGlobalStore().symbol?.name, limit: 1, to: tsNow })
        .then((resp) => resp.data)
        .then((data) => {
            console.log(data[0])
            price_last.value = data[0].price
        })
    price_24_change.value = price_24_h.value / price_last.value
}
</script>

<style scoped></style>
