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

            <div id="resources" class="elementcontainer">
                <div
                    class="flex flex-row items-center elementcontainer hoverable border-b-2 border-gray-300"
                    @click="show_resources = !show_resources"
                >
                    <h3 class="w-full">Resources</h3>
                    <div class="flex justify-end items-center">
                        <i class="w-12 h-12 i-carbon:text-indent-more" :class="show_resources ? 'rotate-90' : ''"></i>
                    </div>
                </div>
                <TransitionGroup>
                    <div
                        v-if="show_resources"
                        v-for="(element_group, idx) in api_trades_grouped.resources"
                        :key="idx"
                        class="elementcontainer relative overflow-x-auto"
                    >
                        <div
                            class="flex flex-row items-center elementcontainer hoverable border-b-2 border-gray-300"
                            @click="toggle_view('resources', idx)"
                        >
                            <h4 class="w-full">
                                {{
                                    useAssetsStore().allAssets.find((a) => a.mint === element_group[0].asset_mint)?.name
                                }}
                            </h4>
                            <div class="flex justify-end items-center">
                                <i
                                    class="w-12 h-12 i-carbon:text-indent-more"
                                    :class="
                                        show_element_from_grouped?.resources.find((e) => e.index === idx)?.value
                                            ? 'rotate-90'
                                            : ''
                                    "
                                ></i>
                            </div>
                        </div>
                        <Transition>
                            <AssetTableModular
                                v-if="show_element_from_grouped?.resources.find((e) => e.index === idx)?.value"
                                :is_simple="true"
                                :api_trades="element_group"
                                :pub-key="publicKey?.toString()"
                            />
                        </Transition>
                    </div>
                </TransitionGroup>
            </div>
            <div id="ships" class="elementcontainer">
                <div
                    class="flex flex-row items-center elementcontainer hoverable border-b-2 border-gray-300"
                    @click="show_ships = !show_ships"
                >
                    <h3 class="w-full">Ships</h3>
                    <div class="flex justify-end items-center">
                        <i class="w-12 h-12 i-carbon:text-indent-more" :class="show_ships ? 'rotate-90' : ''"></i>
                    </div>
                </div>
                <TransitionGroup>
                    <div
                        v-if="show_ships"
                        v-for="(element_group, idx) in api_trades_grouped.ships"
                        :key="idx"
                        class="elementcontainer relative overflow-x-auto"
                    >
                        <div
                            class="flex flex-row items-center elementcontainer hoverable border-b-2 border-gray-300"
                            @click="toggle_view('ships', idx)"
                        >
                            <h4 class="w-full">
                                {{
                                    useAssetsStore().allAssets.find((a) => a.mint === element_group[0].asset_mint)?.name
                                }}
                            </h4>
                            <div class="flex justify-end items-center">
                                <i
                                    class="w-12 h-12 i-carbon:text-indent-more"
                                    :class="
                                        show_element_from_grouped?.ships.find((e) => e.index === idx)?.value
                                            ? 'rotate-90'
                                            : ''
                                    "
                                ></i>
                            </div>
                        </div>
                        <Transition>
                            <AssetTableModular
                                v-if="show_element_from_grouped?.ships.find((e) => e.index === idx)?.value"
                                :is_simple="true"
                                :api_trades="element_group"
                                :pub-key="publicKey?.toString()"
                            />
                        </Transition>
                    </div>
                </TransitionGroup>
            </div>
            <div id="other" class="elementcontainer">
                <div
                    class="flex flex-row items-center elementcontainer hoverable border-b-2 border-gray-300"
                    @click="show_other = !show_other"
                >
                    <h3 class="w-full">Other</h3>
                    <div class="flex justify-end items-center">
                        <i class="w-12 h-12 i-carbon:text-indent-more" :class="show_other ? 'rotate-90' : ''"></i>
                    </div>
                </div>
                <TransitionGroup>
                    <div
                        v-if="show_other"
                        v-for="(element_group, idx) in api_trades_grouped.other"
                        :key="idx"
                        class="elementcontainer relative overflow-x-auto"
                    >
                        <div
                            class="flex flex-row items-center elementcontainer hoverable border-b-2 border-gray-300"
                            @click="toggle_view('other', idx)"
                        >
                            <h4 class="w-full">
                                {{
                                    useAssetsStore().allAssets.find((a) => a.mint === element_group[0].asset_mint)?.name
                                }}
                            </h4>
                            <div class="flex justify-end items-center">
                                <i
                                    class="w-12 h-12 i-carbon:text-indent-more"
                                    :class="
                                        show_element_from_grouped?.other.find((e) => e.index === idx)?.value
                                            ? 'rotate-90'
                                            : ''
                                    "
                                ></i>
                            </div>
                        </div>
                        <Transition>
                            <AssetTableModular
                                v-if="show_element_from_grouped?.other.find((e) => e.index === idx)?.value"
                                :is_simple="true"
                                :api_trades="element_group"
                                :pub-key="publicKey?.toString()"
                            />
                        </Transition>
                    </div>
                </TransitionGroup>
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
import { ItemType, useAssetsStore } from '../stores/AssetsStore'
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

const show_resources = ref(true)
const show_ships = ref(true)
const show_other = ref(true)

const api_trades_grouped = ref({
    resources: {} as Record<string, Trade[]>,
    ships: {} as Record<string, Trade[]>,
    other: {} as Record<string, Trade[]>,
})

const show_element_from_grouped = ref({
    resources: {} as Array<GroupedToggle>,
    ships: {} as Array<GroupedToggle>,
    other: {} as Array<GroupedToggle>,
})

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
                api_trades_grouped.value.resources = groupBy(
                    data.filter((t) =>
                        useAssetsStore()
                            .allAssets.filter((a) => a.attributes.itemType === ItemType.Resource)
                            .some((a) => a.mint === t.asset_mint)
                    ),
                    (t) => t.asset_mint
                )
                api_trades_grouped.value.ships = groupBy(
                    data.filter((t) =>
                        useAssetsStore()
                            .allAssets.filter((a) => a.attributes.itemType === ItemType.Ship)
                            .some((a) => a.mint === t.asset_mint)
                    ),
                    (t) => t.asset_mint
                )
                api_trades_grouped.value.other = groupBy(
                    data.filter((t) =>
                        useAssetsStore()
                            .allAssets.filter(
                                (a) =>
                                    a.attributes.itemType != ItemType.Ship && a.attributes.itemType != ItemType.Resource
                            )
                            .some((a) => a.mint === t.asset_mint)
                    ),
                    (t) => t.asset_mint
                )

                show_element_from_grouped.value.resources = []
                show_element_from_grouped.value.ships = []
                show_element_from_grouped.value.other = []

                Object.keys(api_trades_grouped.value.resources).forEach((t) =>
                    show_element_from_grouped.value?.resources.push({
                        index: t,
                        value: false,
                    })
                )
                Object.keys(api_trades_grouped.value.ships).forEach((t) =>
                    show_element_from_grouped.value?.ships.push({
                        index: t,
                        value: false,
                    })
                )
                Object.keys(api_trades_grouped.value.other).forEach((t) =>
                    show_element_from_grouped.value?.other.push({
                        index: t,
                        value: false,
                    })
                )
            }

            is_loading.value = false
        })
}

function toggle_view(type: 'resources' | 'ships' | 'other', idx: String) {
    switch (type) {
        case 'resources':
            show_element_from_grouped.value?.resources.forEach((e) => {
                if (e.index == idx) e.value = !e.value
            })
            break
        case 'ships':
            show_element_from_grouped.value?.ships.forEach((e) => {
                if (e.index == idx) e.value = !e.value
            })
            break
        case 'other':
            show_element_from_grouped.value?.other.forEach((e) => {
                if (e.index == idx) e.value = !e.value
            })
            break
    }
}
</script>
