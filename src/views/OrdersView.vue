<template>
    <div class="p-2 flex flex-col space-y-2">
        <div class="content-box">
            <h2>Orders</h2>
        </div>
        <order-table :orders="orders" class="content-box" />
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
