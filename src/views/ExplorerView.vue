<template>
    <div>
        <h1>Explorer</h1>
        <div class="flex w-full px-5">
            <div class="flex px-3">
                <div class="i-carbon:search"></div>
            </div>
            <input class="flex w-full" v-model="user_search_text" type="text" />
        </div>

        <div class="relative overflow-x-auto">
            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th>Pair</th>
                        <th>Timestamp</th>
                        <th>Asset-Mint</th>
                        <th>Currency-Mint</th>
                        <th>Size</th>
                        <th>Price</th>
                        <th>Cost</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="mint in api_trades_mint" :key="mint">
                        <th>
                            <div class="w-12">
                                <img
                                    class="rounded-md"
                                    :src="'/sa_images/webp/' + useGlobalStore().symbol.mint_asset + '.webp'"
                                    alt="asset_image"
                                />
                            </div>
                        </th>
                        <th>{{ mint.pair }}</th>
                        <td>{{ mint.timestamp }}</td>
                        <td>{{ mint.assetMint }}</td>
                        <td>{{ mint.currencyMint }}</td>
                        <td class="text-right">{{ mint.size }}</td>
                        <td class="text-right">{{ mint.price.toFixed(5) }}</td>
                        <td class="text-right">{{ mint.cost.toFixed(2) }} {{}}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        {{ user_search_text }}
        {{ api_trades_mint }}
    </div>
</template>

<script setup lang="ts">
import { Api, TradesResponse } from '../typescript/skullnbones_api/skullnbones_api'
import { computed, onMounted, ref, watch } from 'vue'
import { useGlobalStore } from '../stores/GlobalStore'
const api_trades_mint = ref<Array<TradesResponse>>()
const api_trades_address = ref<Array<TradesResponse>>()
const api_trades_signature = ref<Array<TradesResponse>>()

const user_search_text = ref()

watch(user_search_text, () => {
    console.log(user_search_text)
})

onMounted(async () => {
    fetch('https://api2.skullnbones.xyz/info')
        .then((resp) => resp.text())
        .then((data) => console.log(data))

    const api = new Api({ baseUrl: 'https://api2.skullnbones.xyz' })

    api.trades.getMint({ mint: 'ammo', limit: 100 }).then((resp) => (api_trades_mint.value = resp.data))
    api.trades.getAddress({ address: 'ammo', limit: 100 }).then((resp) => (api_trades_address.value = resp.data))
    api.trades.getSignature({ signature: 'ammo' }).then((resp) => (api_trades_signature.value = resp.data))
})
</script>
