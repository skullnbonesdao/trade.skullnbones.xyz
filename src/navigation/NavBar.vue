<template>
    <header class="sticky top-0 z-50 shadow-xl">
        <nav
            class="bg-white p-3 space-y-3 dark:text-gray-200 dark:bg-gray-900 w-full z-20 border-b border-gray-200 dark:border-gray-600"
        >
            <div class="flex flex-wrap justify-between items-center mx-auto">
                <div>
                    <a href="#" class="avatar flex flex-row space-x-2">
                        <div class="w-10 mask mask-hexagon">
                            <img src="../assets/logo.png" alt="logo" />
                        </div>
                        <span class="self-center text-xl font-semibold whitespace-nowrap text-black dark:text-white"
                            >RogueMarket</span
                        >
                    </a>
                </div>

                <div id="navbar-sticky" class="hidden justify-between items-center w-full md:flex md:w-auto md:order-0">
                    <ul
                        class="flex flex-col p-4 mt-4 bg-gray-50 rounded-lg items-center md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700"
                    >
                        <li>
                            <RouterLink to="/">Home </RouterLink>
                        </li>
                        <li>
                            <RouterLink to="/marketplace">Marketplace </RouterLink>
                        </li>
                        <li>
                            <RouterLink to="/explorer">Explorer </RouterLink>
                        </li>
                        <li>
                            <RouterLink to="/orders">Orders </RouterLink>
                        </li>
                        <li>
                            <RouterLink to="/portfolio">Portfolio </RouterLink>
                        </li>
                        <li>
                            <RouterLink to="/stats">Stats </RouterLink>
                        </li>
                        <li>
                            <RouterLink to="/about">About </RouterLink>
                        </li>
                        <li>
                            <wallet-multi-button dark />
                        </li>
                        <li>
                            <toggle-mode></toggle-mode>
                        </li>
                    </ul>
                </div>

                <div
                    class="md:hidden"
                    @click="
                        () => {
                            mobile_menue_shown = !mobile_menue_shown
                        }
                    "
                >
                    <div class="dark:text-white i-carbon:text-indent-more"></div>
                </div>
            </div>
            <div
                v-if="mobile_menue_shown"
                class="md:hidden flex flex-row border-2 border-gray-200 dark:border-gray-600 p-2 justify-between items-center"
            >
                <RouterLink class="i-carbon:home" to="/"> </RouterLink>

                <RouterLink class="i-carbon:shopping-bag" to="/marketplace"> </RouterLink>

                <RouterLink class="i-carbon:explore" to="/explorer"> </RouterLink>

                <RouterLink class="i-carbon:border-full" to="/orders"> </RouterLink>

                <RouterLink class="i-carbon:block-storage-alt" to="/portfolio"> </RouterLink>

                <RouterLink class="i-carbon:weather-station" to="/stats"> </RouterLink>

                <RouterLink class="i-carbon:information" to="/about"> </RouterLink>

                <toggle-mode></toggle-mode>
            </div>
        </nav>
    </header>
</template>

<style scoped></style>
<script setup lang="ts">
import { WalletMultiButton } from 'solana-wallets-vue'
import ToggleMode from '../components/buttons/ToggleMode.vue'
import { Navbar, NavbarLogo, NavbarCollapse, NavbarLink } from 'flowbite-vue'
import { ref } from 'vue'

const mobile_menue_shown = ref(false)
</script>

<style scoped>
.router-link-active {
    @apply text-red-500;
}
</style>
