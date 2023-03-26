<template>
    <div class="flex flex-col items-center px-5 pb-2 mt-6 elementcontainer space-y-3">
        <div class="">
            <CurrencyIcon class="w-24" :currency="props.currency" />
        </div>
        <div class="flex flex-col space-y-5">
            <span
                class="price_badge bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300 border-purple-200 dark:border-purple-700"
                >{{ balance }}</span
            >
            <span
                class="price_badge bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 border-blue-200 dark:border-blue-700"
                >{{ value_usdc.toFixed(3) }}$</span
            >
        </div>
    </div>
</template>
<script setup lang="ts">
import CurrencyIcon from '../icon-helper/CurrencyIcon.vue'
import { onMounted, PropType, ref } from 'vue'
import { CURRENCIES, E_CURRENCIES, I_CURRENCY } from '../../typescript/constants/currencies'
import { useGlobalStore } from '../../stores/GlobalStore'
import { useWallet } from 'solana-wallets-vue'
import { PublicKey } from '@solana/web3.js'
import { useTokenPriceStore } from '../../stores/TokenPriceStore'

const props = defineProps({
    currency: {
        type: Object as PropType<I_CURRENCY>,
        default: CURRENCIES[0],
    },
})

const balance = ref(0.0)
const value_usdc = ref(0.0)

onMounted(async () => {
    await fetchWalletTokenBalances()
})

async function fetchWalletTokenBalances() {
    const { publicKey } = useWallet()
    if (publicKey.value) {
        switch (props.currency?.type) {
            case E_CURRENCIES.SOL:
                balance.value = (await useGlobalStore().connection.getBalance(publicKey.value)) * Math.pow(10, -9)
                value_usdc.value = parseFloat(useTokenPriceStore().token_price.solana) * balance.value
                break
            default:
                let response_tokenAccount = await useGlobalStore().connection.getTokenAccountsByOwner(publicKey.value, {
                    mint: new PublicKey(props.currency?.mint),
                })

                let response_tokenBalance = await useGlobalStore().connection.getTokenAccountBalance(
                    response_tokenAccount.value[0].pubkey
                )
                balance.value = response_tokenBalance.value.uiAmount ?? 0.0

                switch (props.currency.type) {
                    case E_CURRENCIES.ATLAS:
                        value_usdc.value = parseFloat(useTokenPriceStore().token_price.atlas) * balance.value
                        break
                    case E_CURRENCIES.POLIS:
                        value_usdc.value = parseFloat(useTokenPriceStore().token_price.polis) * balance.value
                        break
                }

                break
        }
    }
}
</script>

<style scoped>
.price_badge {
    @apply w-full text-center font-medium px-5 py-0.5 rounded d uppercase border-2;
}
</style>
