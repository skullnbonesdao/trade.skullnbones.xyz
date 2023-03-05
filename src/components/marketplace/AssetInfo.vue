<template>
    <div class="flex flex-row space-x-5 items-center">
        <div class="flex flex-col">
            <div class="flex flex-row items-center gap-2">
                <div class="relative">
                    <img
                        class="rounded-md w-24"
                        :src="'/sa_images/webp/' + useGlobalStore().symbol.mint_asset + '.webp'"
                        alt="asset_image"
                    />
                    <div class="absolute top-0 left-10">
                        <CurrencyIcon
                            class="rounded-md"
                            :currency="CURRENCIES.find((c) => c.mint === useGlobalStore().symbol.mint_pair.toString())"
                        />
                    </div>
                </div>
                <h3>
                    {{
                        useAssetsStore().allAssets.find(
                            (asset) => asset.mint.toString() === useGlobalStore().symbol.mint_asset.toString()
                        )?.name +
                        '/' +
                        CURRENCIES.find((c) => c.mint === useGlobalStore().symbol.mint_pair.toString()).name
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
import CurrencyIcon from '../icon-helper/CurrencyIcon.vue'
import { E_CURRENCIES } from '../../typescript/constants/currencies'
</script>

<style scoped></style>
