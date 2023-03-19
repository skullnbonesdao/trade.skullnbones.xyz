<template>
    <div>
        <div v-if="show_search_modal">
            <SearchAssetModal @select-event="(symbol) => action_update_symbol(symbol).then(() => {})" />
        </div>
        <div @click="action_enable_modal" class="flex flex-row space-x-5 items-center">
            <div
                class="flex flex-col"
                @click="
                    () => {
                        show_search_modal = false
                    }
                "
            >
                <div class="flex flex-row items-center gap-2">
                    <AssetPairImage
                        :mint="useGlobalStore().symbol.mint_asset.toString()"
                        :pair="CURRENCIES.find((c) => c.mint === useGlobalStore().symbol.mint_pair.toString())"
                    />
                    <div class="flex flex-col">
                        <div class="flex flex-row items-baseline space-x-1">
                            <h3>
                                {{
                                    useAssetsStore().allAssets.find(
                                        (asset) =>
                                            asset.mint.toString() === useGlobalStore().symbol.mint_asset.toString()
                                    )?.name
                                }}
                            </h3>
                            <h4>
                                [{{
                                    CURRENCIES.find((c) => c.mint === useGlobalStore().symbol.mint_pair.toString())
                                        ?.name
                                }}]
                            </h4>
                        </div>
                        <div class="flex flex-row">
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
            </div>
            <div class="flex w-full flex-row items-center space-x-2 justify-end">
                <div>
                    <div class="text-right">
                        {{ price_24_h?.toFixed(2)
                        }}{{ CURRENCIES.find((c) => useGlobalStore().symbol.mint_pair.toString() === c.mint).char }}
                    </div>
                    <div class="flex items-center float-right">
                        <div
                            class="text-sm"
                            :class="
                                price_24_change === 0
                                    ? 'i-carbon-arrow-right text-gray'
                                    : price_24_change >= 1
                                    ? 'i-carbon-arrow-up-right text-green'
                                    : 'i-carbon-arrow-down-right text-red'
                            "
                        ></div>

                        <div
                            class="text-right"
                            :class="
                                price_24_change === 0 ? 'text-gray' : price_24_change > 1 ? 'text-green' : 'text-red'
                            "
                        >
                            {{ price_24_change >= 1 ? (price_24_change - 1).toFixed(2) : price_24_change.toFixed(2) }}%
                        </div>
                    </div>
                </div>
                <div class="flex flex-col space-y-2">
                    <p class="text-xs">Last Trade</p>
                    <p class="text-xs">(-24h)</p>
                </div>
            </div>

            <div class="flex justify-end p-2">
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
import SearchAssetModal from '../modals/SearchAssetModal.vue'
import AssetPairImage from './AssetPairImage.vue'
import AssetRarityBadge from '../badges/AssetRarityBadge.vue'
import AssetItemTypeBadge from '../badges/AssetItemTypeBadge.vue'
import AssetTextBadge from '../badges/AssetTextBadge.vue'
import { Api, Trade } from '../../typescript/skullnbones_api/skullnbones_api'
const api = new Api({ baseUrl: 'https://api2.skullnbones.xyz' })

const show_search_modal = ref(false)
const price_24_h = ref(0.0)
const price_24_change = ref(0.0)
fetch_price_24_h()

watch(useGlobalStore().symbol, (new_value) => {
    fetch_price_24_h()
})

function action_enable_modal() {
    show_search_modal.value = true
}

async function action_update_symbol(symbol: string) {
    show_search_modal.value = false
    if (symbol.length > 0) {
        useGlobalStore().draw_tv = true
        useGlobalStore().updateSymbol(symbol)
    }
    console.log(symbol)
}

function fetch_price_24_h() {
    let tsNow = Math.round(new Date().getTime() / 1000)
    let tsYesterday = tsNow - 24 * 3600
    let api_trade: Trade[] = []

    let price_temp = 0

    //Get trade now-24h
    api.trades
        .getSymbol({ symbol: useGlobalStore().symbol?.name, limit: 1, to: tsYesterday })
        .then((resp) => resp.data)
        .then((data) => {
            console.log(data[0])
            price_temp = data[0].price
        })
    //Get trade now
    api.trades
        .getSymbol({ symbol: useGlobalStore().symbol?.name, limit: 1, to: tsNow })
        .then((resp) => resp.data)
        .then((data) => {
            console.log(data[0])

            price_24_change.value = price_temp / data[0].price
            price_24_h.value = data[0].price
        })
}
</script>

<style scoped></style>
