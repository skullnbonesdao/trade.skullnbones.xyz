<script setup lang="ts">
import { VueFinalModal } from 'vue-final-modal'
import { ref } from 'vue'
import CurrencyIcon from '../icon-helper/CurrencyIcon.vue'
import { CURRENCIES, E_CURRENCIES } from '../../typescript/constants/currencies'
import { useGlobalStore } from '../../stores/GlobalStore'
import { useAssetsStore } from '../../stores/AssetsStore'

const user_search_text = ref('')
const emit = defineEmits<{
    (e: 'confirm'): void
}>()

function update_store(symbol: String, pair: String) {
    useGlobalStore().updateSymbol(symbol.toString() + pair.toString())
    emit('confirm')
}
</script>
<template>
    <VueFinalModal
        class="flex justify-center items-center"
        content-class="flex flex-col mx-4 p-4 bg-white dark:bg-gray-900 border dark:border-gray-700 rounded-lg space-y-4"
    >
        <h2 class="text-center">Search</h2>
        <div class="flex flex-row w-full items-center dark:text-gray-100 border-2 rounded-xl">
            <input class="flex w-full bg-transparent p-2" v-model="user_search_text" type="text" />
            <div class="i-carbon:search m-2"></div>
        </div>
        <div class="relative overflow-auto max-h-72" v-if="user_search_text">
            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th class="text-left">Name</th>
                        <th>Pair</th>
                    </tr>
                </thead>
                <tbody>
                    <tr
                        class="max-h-24"
                        v-for="(asset, idx) in useAssetsStore().allAssets.filter((a) => {
                            return (
                                a.name.toLowerCase().includes(user_search_text.toString().toLowerCase()) ||
                                a.symbol.toLowerCase().includes(user_search_text.toString().toLowerCase())
                            )
                        })"
                        :key="idx"
                    >
                        <th>
                            <div class="h-6 sm:w-24">
                                <img
                                    class="rounded-md"
                                    :src="'/sa_images/webp/' + asset.mint + '.webp'"
                                    alt="asset_image"
                                />
                            </div>
                        </th>
                        <td class="font-bold text-xs">{{ asset.name }}</td>
                        <td class="">
                            <div class="flex flex-row justify-around space-x-2">
                                <CurrencyIcon
                                    @click="update_store(asset.symbol, 'ATLAS')"
                                    class="w-6 h-6 sm:w-12 sm:h-12 hoverable"
                                    :currency="CURRENCIES.find((c) => c.type === E_CURRENCIES.ATLAS)"
                                ></CurrencyIcon>

                                <CurrencyIcon
                                    @click="update_store(asset.symbol, 'USDC')"
                                    class="w-6 h-6 sm:w-12 sm:h-12 hoverable"
                                    :currency="CURRENCIES.find((c) => c.type === E_CURRENCIES.USDC)"
                                ></CurrencyIcon>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="pt-2 flex justify-center">
            <div @click="emit('confirm')" class="text-white border rounded-2xl">
                <div class="w-9 h-9 i-carbon-close"></div>
            </div>
        </div>
    </VueFinalModal>
</template>
