<template>
    <div>
        <div v-if="!orders">
            <h3 class="text-center">No orders found!</h3>
        </div>
        <div class="flex justify-center">
            <div v-if="orders" class="overflow-x-auto w-full">
                <VTable :data="orders" class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <template
                        #head
                        class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
                    >
                        <tr>
                            <th></th>
                            <th>Side</th>
                            <th>Name</th>
                            <th>Currency</th>
                            <th>Price</th>
                            <th>Amount</th>
                        </tr>
                    </template>
                    <template #body="{ rows }">
                        <tr
                            v-for="row in rows"
                            :key="row.id"
                            class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                        >
                            <th>
                                <AssetImageNameBadge
                                    p3
                                    :symbol="
                                        useAssetsStore().allAssets.find((asset) => asset.mint === row.orderMint)?.symbol
                                    "
                                    :img_url="'/sa_images/webp/' + row.orderMint + '.webp'"
                                />
                            </th>
                            <th class="uppercase" :class="row.orderType === 'sell' ? 'text-red' : 'text-green'">
                                {{ row.orderType }}
                            </th>
                            <td>
                                {{ useAssetsStore().allAssets.find((asset) => asset.mint === row.orderMint)?.name }}
                            </td>
                            <td>
                                {{ Currencies.find((c) => c.mint === row.currencyMint)?.name }}
                            </td>
                            <td>
                                {{ row.uiPrice }}
                            </td>
                            <td>{{ row.orderOriginationQty }}/{{ row.orderQtyRemaining }}</td>

                            <td>
                                <div class="flex justify-around">
                                    <button
                                        class="btn text-yellow"
                                        @click="createToast(`NOT-Implemented`, TOAST_WARNING)"
                                    >
                                        Edit
                                    </button>
                                    <button class="btn text-red" @click="createToast(`NOT-Implemented`, TOAST_WARNING)">
                                        Close
                                    </button>
                                </div>
                            </td>
                        </tr>
                    </template>
                </VTable>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Currencies } from '../../typescript/constants/tokens'
import { useAssetsStore } from '../../stores/AssetsStore'
import AssetImageNameBadge from '../badges/AssetImageNameBadge.vue'
import { createToast } from 'mosha-vue-toastify'
import { TOAST_WARNING } from '../../typescript/constants/toast-config'

defineProps({
    orders: {
        type: Array,
    },
})
</script>

<style scoped></style>
