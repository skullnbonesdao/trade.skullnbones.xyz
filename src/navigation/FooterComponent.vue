<template>
    <footer class="bottom-0 z-50">
        <div class="flex flex-col p-2 space-y-3">
            <div class="flex w-full items-center space-x-2">
                <a class="hover:text-blue-600" href="https://github.com/skullnbonesdao">
                    <div class="i-carbon:logo-github"></div>
                </a>
                <a class="hover:text-blue-600" href="https://discord.gg/eQZQaF5Qk6">
                    <div class="i-carbon:logo-discord"></div>
                </a>
                <label class="flex justify-end input-group">
                    <span class="dark:bg-gray-800 dark:text-gray-400">RPC</span>
                    <select class="select select-xs dark:bg-gray-700 dark:text-gray-400" v-model="useGlobalStore().rpc">
                        <option v-bind:value="{ name: rpc.name, url: rpc.url }" v-for="rpc in endpoints_list">
                            {{ rpc.name }}
                        </option>
                    </select></label
                >
            </div>
            <div class="flex w-full justify-center">© [2022 S&B + HEIM] All Rights Reserved.</div>
        </div>
    </footer>
</template>

<script setup lang="ts">
import { useGlobalStore, endpoints_list } from '../stores/GlobalStore'
</script>

<style scoped></style>
