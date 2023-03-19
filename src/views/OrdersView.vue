<template>
    <div class="flex flex-col space-y-2">
        <div class="elementcontainer">
            <div class="flex">
                <h1 class="text-4xl">Active</h1>
            </div>
        </div>
        <order-table :orders="orders" class="elementcontainer" />
        <div class="elementcontainer">
            <div class="flex">
                <h1 class="text-4xl">History</h1>
            </div>
        </div>
        <order-table :orders="orders" class="elementcontainer" />
    </div>
</template>

<script setup>
import { useWallet } from 'solana-wallets-vue'
import { ref, watchEffect } from 'vue'
import OrderTable from '../components/tables/OrderTable.vue'
import { useStaratlasGmStore } from '../stores/StaratlasGmStore'
const { publicKey } = useWallet()

let orders = ref()

watchEffect(async () => {
    orders.value = await useStaratlasGmStore().getOpenOrdersForPlayer(useWallet().publicKey.value)
})
</script>
