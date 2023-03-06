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
                        <h3>
                            {{
                                useAssetsStore().allAssets.find(
                                    (asset) => asset.mint.toString() === useGlobalStore().symbol.mint_asset.toString()
                                )?.name +
                                '/' +
                                CURRENCIES.find((c) => c.mint === useGlobalStore().symbol.mint_pair.toString())?.name
                            }}
                        </h3>
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
            <div class="flex w-full justify-end p-2">
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
import { ref } from 'vue'
import SearchAssetModal from '../modals/SearchAssetModal.vue'
import AssetPairImage from './AssetPairImage.vue'
import AssetRarityBadge from '../badges/AssetRarityBadge.vue'
import AssetItemTypeBadge from '../badges/AssetItemTypeBadge.vue'
import AssetTextBadge from '../badges/AssetTextBadge.vue'

const show_search_modal = ref(false)

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
</script>

<style scoped></style>
