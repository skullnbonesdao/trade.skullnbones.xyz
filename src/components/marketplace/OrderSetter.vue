<template>
    <div class="p-3 bg-gray-100 dark:bg-gray-800 shadow-xl rounded-box">
        <div class="font-medium pb-1 text-center text-gray-500 dark:text-gray-400">
            <ul class="flex justify-center flex-wrap -mb-px">
                <li class="mr-2">
                    <a
                        :class="
                            globalStore.side === 'buy'
                                ? 'text-green-600 rounded-t-lg border-b-2 border-green-600 dark:text-green-500 dark:border-green-500'
                                : ''
                        "
                        class="inline-block p-4 border-b-2 active hover:text-green-600 hover:border-green-300 dark:hover:text-green-300"
                        @click="globalStore.side = Side.BUY"
                        >BUY</a
                    >
                </li>
                <li class="mr-2">
                    <a
                        :class="
                            globalStore.side === 'sell'
                                ? 'text-red-600 rounded-t-lg border-b-3 border-red-600 dark:text-red-500 border-red-600 dark:border-red-500'
                                : ''
                        "
                        class="inline-block p-4 border-b-2 active hover:text-red-600 hover:border-red-300 dark:hover:text-red-300"
                        @click="globalStore.side = Side.SELL"
                        >SELL</a
                    >
                </li>
            </ul>
        </div>

        <div class="grid grid-cols-4 input-group gap-1">
            <span class="dark:bg-gray-400">Price</span>
            <input class="col-span-2 input input-bordered input-sm dark:bg-gray-200" placeholder="2" type="text" />
            <span class="dark:bg-gray-400">USD</span>
        </div>
        <div class="pt-1 grid grid-cols-4 input-group gap-1">
            <span class="dark:bg-gray-400">Size</span>
            <input class="col-span-2 input input-bordered input-sm" placeholder="2" type="text" />
            <span class="dark:bg-gray-400">#</span>
        </div>

        <div class="py-2">
            <button
                :class="globalStore.side === 'sell' ? 'bg-red-500 hover:bg-red-400' : 'bg-green-500 hover:bg-green-400'"
                class="w-full text-black btn btn-wide"
            >
                EXECUTE
            </button>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { Side, useGlobalStore } from '../../stores/GlobalStore'

const globalStore = useGlobalStore()
</script>