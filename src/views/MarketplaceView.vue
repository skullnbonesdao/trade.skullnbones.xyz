<template>
    <SearchHelperModal v-model="show_modal" @confirm="show_modal = false"> </SearchHelperModal>
    <div class="space-y-2">
        <div class="flex flex-col space-y-2">
            <info-feed class=" " />
            <asset-info @click="show_modal = true" class="elementcontainer hoverable" />
        </div>
        <div class="flex flex-col space-y-2 md:flex-row md:space-x-2 md:space-y-0">
            <div class="basis-2/3 space-y-2">
                <trading-view-chart v-if="show_tv" class="elementcontainer" />
                <order-table :orders="orders" class="elementcontainer"></order-table>
            </div>
            <div class="basis-1/3 space-y-2">
                <order-setter class="elementcontainer" />
                <order-book class="elementcontainer" />
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import InfoFeed from '../components/feeds/InfoFeed.vue'
import { onMounted, watch, watchEffect } from 'vue'
import { useTokenPriceStore } from '../stores/TokenPriceStore'
import { useSolanaNetworkStore } from '../stores/SolanaNetworkStore'
import { useStaratlasGmStore } from '../stores/StaratlasGmStore'
import { useAssetsStore } from '../stores/AssetsStore'
import TradingViewChart from '../components/charts/tradingview/TradingViewChart.vue'
import OrderSetter from '../components/marketplace/OrderSetter.vue'
import { endpoints_list, useGlobalStore } from '../stores/GlobalStore'
import { ref } from 'vue'
import { useWallet } from 'solana-wallets-vue'
import OrderTable from '../components/tables/OrderTable.vue'
import OrderBook from '../components/marketplace/orderbook/OrderBook.vue'
import AssetInfo from '../components/marketplace/AssetInfo.vue'
import { storeToRefs } from 'pinia'
import SearchHelperModal from '../components/modals/SearchHelperModal.vue'
import { ModalsContainer, useModal } from 'vue-final-modal'
import LoadingModal from '../components/modals/LoadingModal.vue'

const show_modal = ref(false)
const show_tv = ref(true)

const orders = ref()

watchEffect(async () => {
    orders.value = await useStaratlasGmStore().getOpenOrdersForPlayer(useWallet().publicKey.value)
})
</script>
