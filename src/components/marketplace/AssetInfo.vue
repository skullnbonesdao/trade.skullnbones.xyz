<template>
    <div>
        <div v-if="show_search_modal">
            <SearchAssetModal @select-event="(symbol) => action_update_symbol(symbol).then(() => {})" />
        </div>
        <div class="flex flex-row space-x-5 items-center">
            <div
                class="flex flex-col"
                @click="
                    () => {
                        show_search_modal = false
                    }
                "
            >
                <div class="flex flex-row items-center gap-2">
                    <div class="relative">
                        <img
                            class="rounded-md w-24"
                            :src="'/sa_images/webp/' + useGlobalStore().symbol.mint_asset + '.webp'"
                            alt="asset_image"
                        />
                        <div class="absolute top-0 left-10 -w-12">
                            <CurrencyIcon
                                class="rounded-md"
                                :currency="
                                    CURRENCIES.find((c) => c.mint === useGlobalStore().symbol.mint_pair.toString())
                                "
                            />
                        </div>
                    </div>
                    <h3>
                        {{
                            useAssetsStore().allAssets.find(
                                (asset) => asset.mint.toString() === useGlobalStore().symbol.mint_asset.toString()
                            )?.name +
                            '/' +
                            CURRENCIES.find((c) => c.mint === useGlobalStore().symbol.mint_pair.toString())?.name
                        }}
                    </h3>
                </div>
            </div>
            <div class="flex w-full"></div>
            <Button color="blue" size="xl" @click="action_enable_modal"><div class="i-carbon:search" /> </Button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Button } from 'flowbite-vue'
import { useGlobalStore } from '../../stores/GlobalStore'
import { useAssetsStore } from '../../stores/AssetsStore'
import { CURRENCIES } from '../../typescript/constants/currencies'
import CurrencyIcon from '../icon-helper/CurrencyIcon.vue'
import { ref } from 'vue'
import SearchAssetModal from '../modals/SearchAssetModal.vue'

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
