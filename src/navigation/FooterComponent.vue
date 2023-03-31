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
                <div class="flex w-full justify-end">
                    <SelectBox
                        class="flex max-w-5xl pr-2"
                        text="RPC"
                        :selected_in="useGlobalStore().rpc.name"
                        :options="endpoints_list.flatMap((e) => e.name)"
                        @selected="
                            (value) =>
                                (useGlobalStore().rpc =
                                    endpoints_list.find((e) => e.name === value) ?? useGlobalStore().rpc)
                        "
                    ></SelectBox>
                </div>
            </div>

            <div class="flex w-full justify-center text-center">Support us:</div>
            <div class="flex w-full text-sm justify-center text-center">
                FULRbdyHJ7AzRCNVjA6NZoUD19EQ5a9swWdyaN4d9d7P
            </div>

            <div class="flex w-full justify-center text-center">© [2022 S&B + HEIM] All Rights Reserved.</div>
            <div class="flex w-full justify-center">{{ version }}</div>
        </div>

        <div class="p-2">
            <div class="flex justify-between">
                <span class="text-base font-medium text-blue-700 dark:text-white">Sync-Status:</span>
                <span class="text-sm font-medium text-blue-700 dark:text-white"
                    >{{ fetched_percentage.toFixed(1) }}%</span
                >
            </div>
            <div class="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                <div class="bg-blue-600 h-2.5 rounded-full" :style="'width: ' + fetched_percentage + '%'"></div>
            </div>
        </div>
    </footer>
</template>

<script setup lang="ts">
import { useGlobalStore, endpoints_list } from '../stores/GlobalStore'
import SelectBox from '../components/buttons/SelectBox.vue'
import { onMounted, ref, watch } from 'vue'
import { Api, Cursor } from '../typescript/skullnbones_api/skullnbones_api'
const version = __APP_VERSION__

const fetched_percentage = ref(0.1)

onMounted(async () => {
    const api = new Api({ baseUrl: 'https://api2.skullnbones.xyz' })
    await api.stats.getRanges().then((resp) => {
        let cursors: Cursor[] = resp.data

        let total_range = (cursors[0].start_block ?? 0) - (cursors.at(-1)?.start_block ?? 0)
        let fetched_range = 0
        cursors.forEach((cursor) => {
            if (cursor.end_block !== 0) {
                fetched_range += (cursor?.block ?? 0) - (cursor?.start_block ?? 0)
            }
        })
        fetched_percentage.value = (fetched_range / total_range) * 100
        console.log('t:' + total_range.toString())
        console.log('f:' + fetched_range.toString())
    })
})
</script>

<style scoped></style>
