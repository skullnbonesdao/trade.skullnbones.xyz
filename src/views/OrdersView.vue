<template>
    <div class="p-2">
        <div class="px-4 py-2 flex flex-col justify-center bg-gray-200 dark:bg-gray-800 shadow-xl rounded-box">
            <div class="flex justify-center">
                <h1 class="text-4xl">Orders</h1>
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
                                    <div class="avatar">
                                        <div class="mask mask-squircle w-12 h-12">
                                            <img
                                                :src="'/public/sa_images/webp/' + row.orderMint + '.webp'"
                                                alt="Avatar Tailwind CSS Component"
                                            />
                                        </div>
                                    </div>
                                </th>
                                <th>{{ row.orderType }}</th>
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
                            </tr>
                        </template>
                    </VTable>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { Order } from '@staratlas/factory'
import { useWallet } from 'solana-wallets-vue'
import { onMounted, ref, watch } from 'vue'
import { useAssetsStore } from '../stores/AssetsStore'
import { useStaratlasGmStore } from '../stores/StaratlasGmStore'
import { Currencies } from '../typescript/constants/tokens'
const { publicKey } = useWallet()

let orders = ref()

onMounted(async () => {
    if (publicKey.value !== null) orders.value = await useStaratlasGmStore().getOpenOrdersForPlayer(publicKey.value)
    console.log(orders.value)
})

watch(
    () => publicKey,
    async (publicKey) => {
        if (publicKey.value !== null) orders.value = await useStaratlasGmStore().getOpenOrdersForPlayer(publicKey.value)
    }
)
</script>
