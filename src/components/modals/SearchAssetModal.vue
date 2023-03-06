<script setup lang="ts">
import { ref, watch } from 'vue'
import { useAssetsStore } from '../../stores/AssetsStore.js'
import { Button } from 'flowbite-vue'
import CurrencyIcon from '../icon-helper/CurrencyIcon.vue'
import { CURRENCIES, E_CURRENCIES, I_CURRENCY } from '../../typescript/constants/currencies.js'
import { useGlobalStore } from '../../stores/GlobalStore'

const props = defineProps({
    is_shown: Boolean,
})

const user_search_text = ref()
</script>

<template>
    <div
        v-if="true"
        id="defaultModal"
        tabindex="-1"
        aria-hidden="true"
        class="flex fixed justify-center top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] md:h-full"
    >
        <div class="relative w-full h-full max-w-2xl md:h-auto">
            <!-- Modal content -->
            <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                <!-- Modal header -->
                <div class="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                    <h3 class="text-xl font-semibold text-gray-900 dark:text-white">Search</h3>
                    <button
                        @click="$emit('selectEvent')"
                        type="button"
                        class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                        <svg
                            aria-hidden="true"
                            class="w-5 h-5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fill-rule="evenodd"
                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                clip-rule="evenodd"
                            ></path>
                        </svg>
                        <span class="sr-only">Close modal</span>
                    </button>
                </div>
                <!-- Modal body -->
                <div class="p-6 space-y-6">
                    <div class="flex flex-row w-full items-center dark:text-gray-100 border-2 rounded-xl">
                        <input class="flex w-full bg-transparent p-2" v-model="user_search_text" type="text" />
                        <div class="i-carbon:search m-2"></div>
                    </div>

                    <div class="relative overflow-x-auto" v-if="user_search_text">
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
                                    v-for="(asset, idx) in useAssetsStore().allAssets.filter(
                                        (a) =>
                                            a.name.toLowerCase().includes(user_search_text.toString().toLowerCase()) ||
                                            a.symbol.toLowerCase().includes(user_search_text.toString().toLowerCase())
                                    )"
                                    :key="idx"
                                >
                                    <th>
                                        <div class="w-12 sm:w-24">
                                            <img
                                                class="rounded-md"
                                                :src="'/sa_images/webp/' + asset.mint + '.webp'"
                                                alt="asset_image"
                                            />
                                        </div>
                                    </th>
                                    <td class="font-bold">{{ asset.name }}</td>
                                    <td class="font-bold flex sm:flex-row flex-col md:space-y-1 justify-around">
                                        <Button
                                            class="flex justify-center shadow-md"
                                            color="blue"
                                            @click="$emit('selectEvent', asset.symbol + 'ATLAS')"
                                            ><CurrencyIcon
                                                class="w-12"
                                                :currency="CURRENCIES.find((c) => c.type === E_CURRENCIES.ATLAS)"
                                            ></CurrencyIcon
                                        ></Button>
                                        <Button
                                            class="flex justify-center shadow-md"
                                            color="blue"
                                            @click="$emit('selectEvent', asset.symbol + 'USDC')"
                                            ><CurrencyIcon
                                                class="w-12"
                                                :currency="CURRENCIES.find((c) => c.type === E_CURRENCIES.USDC)"
                                            ></CurrencyIcon
                                        ></Button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped></style>
