<template>
    <div class="flex flex-col space-y-2">
        <div
            class="elementcontainer flex md:flex-row md:space-x-2 md:space-y-0 space-y-2 flex-col w-full items-center bg-gray-300 dark:bg-gray-600 p-1 shadow-lg"
        >
            <TextBox class="flex w-full" text="Search" type="text" ref="tb_value" :default="search_public_key" />
            <div
                @click="
                    () => {
                        btn_search_wallet().then(() => {})
                    }
                "
                class="hoverable flex flex-auto bg-gray-300 dark:bg-gray-600"
            >
                <div class="flex-grow my-3 w-16 i-carbon:search"></div>
            </div>
        </div>

        <div v-if="!useWallet().publicKey.value" class="flex w-full elementcontainer justify-center p-2">
            <wallet-multi-button dark />
        </div>
        <div v-else-if="!is_loading" class="flex flex-col space-y-2">
            <div class="grid sm:grid-cols-3 grid-cols-2 gap-2 justify-around">
                <TokenWalletInfoBadge
                    class="col-span-2 sm:col-span-1"
                    :currency="CURRENCIES.find((c) => c.type === E_CURRENCIES.SOL)"
                />
                <TokenWalletInfoBadge :currency="CURRENCIES.find((c) => c.type === E_CURRENCIES.ATLAS)" />
                <TokenWalletInfoBadge :currency="CURRENCIES.find((c) => c.type === E_CURRENCIES.POLIS)" />
            </div>
            <div class="elementcontainer">
                <h1 class="text-4xl">History</h1>
            </div>

            <h3 v-if="api_trades.s === 1" class="elementcontainer text-center">No Data found!</h3>

            <div
                v-else
                v-for="(element_group, idx) in api_trades_grouped"
                :key="idx"
                class="elementcontainer relative overflow-x-auto"
            >
                <div
                    class="flex flex-row items-center elementcontainer hoverable border-b-2 border-gray-300"
                    @click="toggle_view(idx)"
                >
                    <h3 class="w-full">
                        {{ useAssetsStore().allAssets.find((a) => a.mint === element_group[0].asset_mint)?.name }}
                    </h3>
                    <div class="flex justify-end items-center">
                        <i
                            class="w-12 h-12 i-carbon:text-indent-more"
                            :class="show_element_from_grouped?.find((e) => e.index === idx)?.value ? 'rotate-90' : ''"
                        ></i>
                    </div>
                </div>
                <Transition>
                    <AssetTableModular
                        v-if="show_element_from_grouped?.find((e) => e.index === idx)?.value"
                        :is_simple="true"
                        :api_trades="element_group"
                        :pub-key="publicKey?.toString()"
                    />
                </Transition>
            </div>
        </div>
        <BeatLoader
            class="elementcontainer flex w-full justify-center"
            :loading="is_loading && publicKey"
            color="#ff150c"
        />
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { CURRENCIES, E_CURRENCIES } from '../typescript/constants/currencies.js'
import { Api, Trade } from '../typescript/skullnbones_api/skullnbones_api'
import { useWallet, WalletMultiButton } from 'solana-wallets-vue'
import { groupBy } from '../typescript/helper/groupBy'
import { useAssetsStore } from '../stores/AssetsStore'
import TokenWalletInfoBadge from '../components/elements/TokenWalletInfoBadge.vue'
import BeatLoader from 'vue-spinner/src/BeatLoader.vue'
import AssetTableModular from '../components/tables/AssetTableModular.vue'
import TextBox from '../components/buttons/TextBox.vue'
const { publicKey } = useWallet()

interface GroupedToggle {
    index: String
    value: Boolean
}

const show_loading_modal = ref(true)
const is_loading = ref(true)
const api_trades = ref<Array<Trade> | any>()
const api_trades_grouped = ref<Record<string, Trade[]>>()
const show_element_from_grouped = ref<Array<GroupedToggle>>()

const search_public_key = ref('')

const api = new Api({ baseUrl: 'https://api2.skullnbones.xyz' })

watch(
    () => publicKey.value,
    (new_value) => {
        is_loading.value = true
        if (new_value !== null) {
            fetch_wallet_trades(new_value.toString())
        }
    }
)

onMounted(() => {
    is_loading.value = true
    if (publicKey.value) {
        fetch_wallet_trades(publicKey.value.toString())
    }
})

function btn_search_wallet() {
    is_loading.value = true
    fetch_wallet_trades(search_public_key.value)
}

function fetch_wallet_trades(wallet: string) {
    api.trades
        .getAddress({ address: wallet })
        .then((resp) => resp.data)
        .then((data) => {
            api_trades.value = data

            if (api_trades.value != undefined && api_trades.value.s !== 1) {
                api_trades_grouped.value = groupBy(api_trades.value, (t) => t.asset_mint)
                show_element_from_grouped.value = []
                Object.keys(api_trades_grouped.value).forEach((t) =>
                    show_element_from_grouped.value?.push({
                        index: t,
                        value: true,
                    })
                )
            }

            is_loading.value = false
        })
}

function toggle_view(idx: String) {
    show_element_from_grouped.value?.forEach((e) => {
        if (e.index == idx) e.value = !e.value
    })
}
</script>
