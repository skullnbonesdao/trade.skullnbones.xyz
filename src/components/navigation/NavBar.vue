<template>
    <div class="navbar bg-base-100">
        <div class="flex-1">
            <a class="btn btn-ghost normal-case text-xl">daisyUI</a>
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
                        <ToggleMode></ToggleMode>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<style scoped></style>
<script lang="ts">
import ToggleMode from '../buttons/ToggleMode.vue'
import { WalletMultiButton } from 'solana-wallets-vue'

export default {
    components: { WalletMultiButton, ToggleMode },
}
</script>