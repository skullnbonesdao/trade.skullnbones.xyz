<template>
    <header class="sticky top-0 z-50 bg-base-300 shadow-xl">
        <nav
            class="bg-white p-3 space-y-3 dark:bg-black dark:bg-gray-900 w-full z-20 border-b border-gray-200 dark:border-gray-600"
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
                            <RouterLink
                                class="block py-2 pr-4 pl-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white"
                                to="/"
                                >Home
                            </RouterLink>
                        </li>
                        <li>
                            <RouterLink
                                class="block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                                to="/marketplace"
                                >Marketplace
                            </RouterLink>
                        </li>
                        <li>
                            <RouterLink
                                class="block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                                to="/explorer"
                                >Explorer
                            </RouterLink>
                        </li>
                        <li>
                            <RouterLink
                                class="block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                                to="/orders"
                                >Orders
                            </RouterLink>
                        </li>
                        <li>
                            <RouterLink
                                class="block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                                to="/portfolio"
                                >Portfolio
                            </RouterLink>
                        </li>
                        <li>
                            <RouterLink
                                class="block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                                to="/stats"
                                >Stats
                            </RouterLink>
                        </li>
                        <li>
                            <RouterLink
                                class="block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                                to="/about"
                                >About
                            </RouterLink>
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
                <RouterLink
                    class="i-carbon:home block py-2 pr-4 pl-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white"
                    to="/"
                >
                </RouterLink>

                <RouterLink
                    class="i-carbon:shopping-bag block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                    to="/marketplace"
                >
                </RouterLink>

                <RouterLink
                    class="i-carbon:explore block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                    to="/explorer"
                >
                </RouterLink>

                <RouterLink
                    class="i-carbon:border-full block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                    to="/orders"
                >
                </RouterLink>

                <RouterLink
                    class="i-carbon:block-storage-alt block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                    to="/portfolio"
                >
                </RouterLink>

                <RouterLink
                    class="i-carbon:weather-station block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                    to="/stats"
                >
                </RouterLink>

                <RouterLink
                    class="i-carbon:information block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                    to="/about"
                >
                </RouterLink>

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
