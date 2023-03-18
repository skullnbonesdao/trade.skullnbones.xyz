<template>
    <footer
        class="mt-3 bottom-0 z-50 dark:text-gray-200 dark:bg-gray-900 w-full z-20 border-t border-gray-200 dark:border-gray-600"
    >
        <div class="flex flex-col p-2 space-y-3">
            <div class="flex w-full items-center space-x-2">
                <a class="hover:text-blue-600" href="https://github.com/skullnbonesdao">
                    <div class="i-carbon:logo-github"></div>
                </a>
                <a class="hover:text-blue-600" href="https://discord.gg/eQZQaF5Qk6">
                    <div class="i-carbon:logo-discord"></div>
                </a>
                <SelectBox
                    class="flex w-full justify-end pr-2"
                    text="RPC"
                    :selected_in="useGlobalStore().rpc.name"
                    :options="endpoints_list.flatMap((e) => e.name)"
                    @selected="(value) => (useGlobalStore().rpc = endpoints_list.find((e) => e.name === value))"
                ></SelectBox>
            </div>
            <div class="flex w-full justify-center">{{ version }}</div>
            <div class="flex w-full justify-center">© [2022 S&B + HEIM] All Rights Reserved.</div>
        </div>
    </footer>
</template>

<script setup lang="ts">
import { useGlobalStore, endpoints_list } from '../stores/GlobalStore'
import SelectBox from '../components/buttons/SelectBox.vue'
const version = __APP_VERSION__
</script>

<style scoped></style>
