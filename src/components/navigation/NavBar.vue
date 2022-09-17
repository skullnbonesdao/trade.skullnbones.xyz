<template>
    <div class="navbar bg-base-100 dark:bg-black">
        <div class="flex-1">
            <button class="btn">
                <RouterLink class="text-white transition" to="/">RougeMarket</RouterLink>
            </button>
        </div>
        <div class="flex-none">
            <ul class="menu menu-horizontal p-0">
                <li>
                    <RouterLink class="text-white transition hover:text-white/75" to="/">Home</RouterLink>
                </li>

                <li>
                    <RouterLink class="text-white transition hover:text-white/75" to="/marketplace"
                        >Marketplace
                    </RouterLink>
                </li>
                <li>
                    <RouterLink class="text-white transition hover:text-white/75" to="/p2p">P2P</RouterLink>
                </li>

                <li>
                    <RouterLink class="text-white transition hover:text-white/75" to="/about">About</RouterLink>
                </li>
                <li>
                    <div class="sm:gap-4 sm:flex">
                        <wallet-multi-button dark />
                    </div>
                </li>
                <li>
                    <div>
                        <toggle-mode></toggle-mode>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<style scoped></style>
<script lang="ts">
import { WalletMultiButton } from 'solana-wallets-vue'
import ToggleMode from '../buttons/ToggleMode.vue'

export default {
    components: { ToggleMode, WalletMultiButton },
}
</script>