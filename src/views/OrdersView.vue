<template>
    <div class="p-2">
        <div class="px-4 py-2 flex flex-col justify-center bg-gray-200 dark:bg-gray-800 shadow-xl rounded-box">
            <div class="flex justify-center">
                <h1>Orders</h1>
            </div>
            <div class="flex justify-center">
                <h2>{{ publicKey }}</h2>
            </div>
            <div class="flex justify-center">
                <h2>{{ orders }}</h2>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { useWallet } from 'solana-wallets-vue'
import { onMounted, ref, watch } from 'vue'
import { useStaratlasGmStore } from '../stores/StaratlasGmStore'

const { publicKey } = useWallet()

const orders = ref()

onMounted( async () => {
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