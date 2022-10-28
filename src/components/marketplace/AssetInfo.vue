<template>
    <div>
        <div class="flex items-center space-x-2">
            <div class="border-r p-2">
                <div class="w-12">
                    <img
                        class="rounded-md"
                        :src="'/sa_images/webp/' + useGlobalStore().symbol.mint_asset + '.webp'"
                        alt="asset_image"
                    />
                </div>
            </div>
            <div class="flex flex-row w-full">
                <div class="flex flex-col">
                    <div class="flex flex-row items-center space-x-2">
                        <h4>Symbol:</h4>
                        <h3>
                            {{
                                useAssetsStore().allAssets.find(
                                    (asset) => asset.mint.toString() === useGlobalStore().symbol.mint_asset.toString()
                                )?.name ?? ''
                            }}
                        </h3>
                    </div>
                    <div class="flex flex-row items-center space-x-2">
                        <h4>Pair:</h4>
                        <h3>
                            {{
                                Currencies.find(
                                    (currency) => currency.mint === useGlobalStore().symbol.mint_pair.toString()
                                ).name
                            }}
                        </h3>
                    </div>
                </div>
                <div class="flex flex-row items-center">
                    <h4>Explorer:</h4>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Currencies } from '../../typescript/constants/tokens'

import { useGlobalStore } from '../../stores/GlobalStore'
import { useAssetsStore } from '../../stores/AssetsStore'
import AssetImageNameBadge from '../badges/AssetImageNameBadge.vue'
</script>

<style scoped></style>
