<template>
    <div class="flex flex-col space-y-2">
        <div class="elementcontainer">
            <div class="flex">
                <h1 class="text-4xl">Active</h1>
            </div>
        </div>
        <div v-if="!useWallet().publicKey.value" class="flex w-full elementcontainer justify-center p-2">
            <wallet-multi-button dark />
        </div>
        <BeatLoader
            v-else-if="!orders"
            class="elementcontainer flex w-full justify-center"
            :loading="!orders"
            color="#ff150c"
        />
        <order-table v-else :orders="orders" class="elementcontainer" />
        <div class="elementcontainer">
            <div class="flex">
                <h1 class="text-4xl">History</h1>
            </div>
        </div>
        <div class="elementcontainer">
            <div v-if="!useWallet().publicKey.value" class="flex w-full elementcontainer justify-center p-2">
                <wallet-multi-button dark />
            </div>
            <BeatLoader
                v-else-if="!history"
                class="elementcontainer flex w-full justify-center"
                :loading="!history"
                color="#ff150c"
            />
            <div v-else>
                <h3 v-if="history.s === 1" class="text-center">No Data Found</h3>
                <div v-else class="">
                    <AssetTableModular :api_trades="history" :is_simple="true" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useWallet, WalletMultiButton } from 'solana-wallets-vue'
import { onMounted, ref, watchEffect } from 'vue'
import OrderTable from '../components/tables/OrderTable.vue'
import { useStaratlasGmStore } from '../stores/StaratlasGmStore'
import { Api } from '../typescript/skullnbones_api/skullnbones_api'
import AssetPairImage from '../components/marketplace/AssetPairImage.vue'
import { CURRENCIES } from '../typescript/constants/currencies'
import { calc_passed_time } from '../typescript/helper/calc_passed_time'
import CurrencyIcon from '../components/icon-helper/CurrencyIcon.vue'
import ExplorerIcon from '../components/icon-helper/ExplorerIcon.vue'
import { E_EXPLORER, EXPLORER } from '../typescript/constants/explorer'
import BeatLoader from 'vue-spinner/src/BeatLoader.vue'
import AssetTableModular from '../components/tables/AssetTableModular.vue'

const { publicKey } = useWallet()

let orders = ref()
let history = ref()

const api = new Api({ baseUrl: 'https://api2.skullnbones.xyz' })

watchEffect(async () => {
    orders.value = await useStaratlasGmStore().getOpenOrdersForPlayer(useWallet().publicKey.value)
})

onMounted(() => {
    fetch_trades()
})

function fetch_trades() {
    if (publicKey.value !== undefined)
        api.trades
            .getAddress({ address: publicKey.value?.toString() ?? '000' })
            .then((resp) => resp.data)
            .then((data) => {
                history.value = data
            })
}
</script>
