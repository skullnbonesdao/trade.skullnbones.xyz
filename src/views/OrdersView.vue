<template>
    <div class="p-2 flex flex-col space-y-2">
        <div class="content-box">
            <h2>Orders</h2>
        </div>
        <order-table :orders="orders" class="content-box" />
    </div>
</template>

<script lang="ts" setup>
import { Order } from '@staratlas/factory'
import { useWallet } from 'solana-wallets-vue'
import { onMounted, ref, watch } from 'vue'
import { useAssetsStore } from '../stores/AssetsStore'
import { useStaratlasGmStore } from '../stores/StaratlasGmStore'
import { Currencies } from '../typescript/constants/tokens'
import OrderTable from '../components/tables/OrderTable.vue'
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
