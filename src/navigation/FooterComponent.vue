<template>
    <footer class="bottom-0 z-50">
        <div class="p-4 bg-white rounded-lg shadow md:px-6 md:py-8 dark:bg-gray-900">
            <div class="sm:flex sm:items-center sm:justify-between">
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
                <ul class="flex flex-wrap items-center mb-6 text-sm text-gray-500 sm:mb-0 dark:text-gray-400 space-x-4">
                    <li>
                        <label class="input-group">
                            <span class="dark:bg-gray-800 dark:text-gray-400">RPC</span>
                            <select
                                class="select select-xs dark:bg-gray-700 dark:text-gray-400"
                                v-model="useGlobalStore().rpc"
                            >
                                <option v-bind:value="{ name: rpc.name, url: rpc.url }" v-for="rpc in endpoints_list">
                                    {{ rpc.name }}
                                </option>
                            </select></label
                        >
                    </li>

                    <li>
                        <a class="hover:text-blue-600" href="https://github.com/skullnbonesdao">
                            <div class="i-carbon:logo-github"></div>
                        </a>
                    </li>

                    <li>
                        <a class="hover:text-blue-600" href="https://discord.gg/eQZQaF5Qk6">
                            <div class="i-carbon:logo-discord"></div>
                        </a>
                    </li>
                </ul>
            </div>
            <hr class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
            <span class="block text-sm text-gray-500 sm:text-center dark:text-gray-400"
                >?? [2022 S&B + HEIM] All Rights Reserved.
            </span>
        </div>
    </footer>
</template>

<script setup lang="ts">
import { useGlobalStore, endpoints_list } from '../stores/GlobalStore'
</script>

<style scoped></style>
