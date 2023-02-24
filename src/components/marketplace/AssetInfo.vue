<template>
    <div class="flex flex-row space-x-5">
        <div class="border-r p-3 border-gray-700">
            <div class="w-12">
                <img
                    class="rounded-md"
                    :src="'/sa_images/webp/' + useGlobalStore().symbol.mint_asset + '.webp'"
                    alt="asset_image"
                />
            </div>
        </div>
        <div class="flex flex-col">
            <div class="grid grid-cols-2 items-center gap-2">
                <h3 class="i-carbon:type-pattern"></h3>
                <h3>
                    {{
                        useAssetsStore().allAssets.find(
                            (asset) => asset.mint.toString() === useGlobalStore().symbol.mint_asset.toString()
                        )?.name ?? ''
                    }}
                </h3>
                <h3 class="i-carbon:money"></h3>
                <h3>
                    {{
                        CURRENCIES.find((currency) => currency.mint === useGlobalStore().symbol.mint_pair.toString())
                            .name
                    }}
                </h3>
            </div>
        </div>
        <div class="flex w-full"></div>
        <Button color="default"><div class="i-carbon:search" /> </Button>
    </div>
</template>

<script setup lang="ts">
import { Button } from 'flowbite-vue'
import { useGlobalStore } from '../../stores/GlobalStore'
import { useAssetsStore } from '../../stores/AssetsStore'
import AssetImageNameBadge from '../badges/AssetImageNameBadge.vue'
import { CURRENCIES } from '../../typescript/constants/currencies'
</script>

<style scoped></style>
