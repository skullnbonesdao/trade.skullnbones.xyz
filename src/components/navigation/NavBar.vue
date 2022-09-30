<template>
    <header class="sticky top-0 z-50 bg-base-300 shadow-xl">
        <nav
            class="bg-white dark:bg-black px-2 sm:px-4 py-2.5 dark:bg-gray-900 w-full z-20 border-b border-gray-200 dark:border-gray-600"
        >
            <div class="container flex flex-wrap justify-between items-center mx-auto">
                <a class="flex items-center">
                    <span class="self-center text-xl font-semibold whitespace-nowrap text-black dark:text-white"
                        >RogueMarket</span
                    >
                </a>
                <div class="flex md:order-2">
                    <wallet-multi-button dark />
                    <toggle-mode></toggle-mode>

                    <button
                        aria-controls="navbar-sticky"
                        aria-expanded="false"
                        class="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                        data-collapse-toggle="navbar-sticky"
                        type="button"
                    >
                        <span class="sr-only">Open main menu</span>
                        <svg
                            aria-hidden="true"
                            class="w-6 h-6"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                clip-rule="evenodd"
                                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                                fill-rule="evenodd"
                            ></path>
                        </svg>
                    </button>
                </div>
                <div id="navbar-sticky" class="hidden justify-between items-center w-full md:flex md:w-auto md:order-1">
                    <ul
                        class="flex flex-col p-4 mt-4 bg-gray-50 rounded-lg md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700"
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
                                to="/about"
                                >About
                            </RouterLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </header>
</template>

<style scoped></style>
<script lang="ts">
import { WalletMultiButton } from 'solana-wallets-vue'
import ToggleMode from '../buttons/ToggleMode.vue'

export default {
    components: { ToggleMode, WalletMultiButton },
}
</script>