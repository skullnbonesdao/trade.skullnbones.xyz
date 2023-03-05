<template>
    <footer class="bottom-0 z-50">
        <div
            class="flex flex-row p-4 space-x-2 bg-white dark:bg-black dark:bg-gray-900 w-full border-t border-gray-200 dark:border-gray-600"
        >
            <span class="flex w-full text-sm text-gray-500 sm:text-center dark:text-gray-400"
                >© [2022 S&B + HEIM] All Rights Reserved.
            </span>
            <a class="hover:text-blue-600" href="https://github.com/skullnbonesdao">
                <div class="i-carbon:logo-github"></div>
            </a>
            <a class="hover:text-blue-600" href="https://discord.gg/eQZQaF5Qk6">
                <div class="i-carbon:logo-discord"></div>
            </a>
            <div>
                <label class="flex justify-end input-group">
                    <span class="dark:bg-gray-800 dark:text-gray-400">RPC</span>
                    <select class="select select-xs dark:bg-gray-700 dark:text-gray-400" v-model="useGlobalStore().rpc">
                        <option v-bind:value="{ name: rpc.name, url: rpc.url }" v-for="rpc in endpoints_list">
                            {{ rpc.name }}
                        </option>
                    </select></label
                >
            </div>
        </div>
    </footer>
</template>

<script setup lang="ts">
import { useGlobalStore, endpoints_list } from '../stores/GlobalStore'
</script>

<style scoped></style>
