<template>
    <header class="sticky top-0 z-50 bg-base-300 shadow-xl">
        <nav
            class="bg-white dark:bg-black px-2 sm:px-4 py-2.5 dark:bg-gray-900 w-full z-20 border-b border-gray-200 dark:border-gray-600"
        >
            <div class="container flex flex-wrap justify-between items-center mx-auto">
                <div
                    aria-controls="navbar-sticky"
                    aria-expanded="false"
                    class="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                    data-collapse-toggle="navbar-sticky"
                    type="button"
                >
                    <div class="dropdown">
                        <label class="btn btn-ghost btn-circle" tabindex="0">
                            <svg
                                class="h-5 w-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M4 6h16M4 12h16M4 18h7"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                />
                            </svg>
                        </label>
                        <ul
                            class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
                            tabindex="0"
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
                        </ul>
                    </div>
                </div>

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
                        class="flex flex-col p-4 mt-4 bg-gray-50 rounded-lg md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700"
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
                    </ul>
                </div>

                <wallet-multi-button dark />
                <toggle-mode></toggle-mode>
            </div>
        </nav>
    </header>
</template>

<style scoped></style>
<script lang="ts">
import { WalletMultiButton } from 'solana-wallets-vue'
import ToggleMode from '../components/buttons/ToggleMode.vue'

export default {
    components: { ToggleMode, WalletMultiButton },
}
</script>
