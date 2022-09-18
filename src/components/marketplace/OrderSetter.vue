<template>
    <h2>Order Setter</h2>
    <div
        class="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700"
    >
        <ul class="flex justify-center flex-wrap -mb-px">
            <li class="mr-2">
                <a
                    :class="
                        globalStore.side === 'buy'
                            ? 'text-green-600 rounded-t-lg border-b-2 border-green-600 dark:text-green-500 dark:border-green-500'
                            : ''
                    "
                    class="inline-block p-4 border-b-2 active border-transparent hover:text-green-600 hover:border-green-300 dark:hover:text-green-300"
                    @click="globalStore.side = Side.BUY"
                    >BUY</a
                >
            </li>
            <li class="mr-2">
                <a
                    :class="
                        globalStore.side === 'sell'
                            ? 'text-red-600 rounded-t-lg border-b-2 border-red-600 dark:text-red-500 dark:border-red-500'
                            : ''
                    "
                    class="inline-block p-4 border-b-2 active border-transparent hover:text-red-600 hover:border-red-300 dark:hover:text-red-300"
                    @click="globalStore.side = Side.SELL"
                    >SELL</a
                >
            </li>
        </ul>
    </div>

    <div class="grid grid-cols-4 input-group gap-1">
        <span>Price</span>
        <input class="col-span-2 input input-bordered input-sm" placeholder="2" type="text" />
        <span>USD</span>

        <span>Size</span>
        <input class="col-span-2 input input-bordered input-sm" placeholder="2" type="text" />
        <span>USD</span>
    </div>

    <button class="w-full mt-2 btn btn-wide">EXECUTE</button>
</template>

<script lang="ts" setup>
import { Side, useGlobalStore } from '../../stores/GlobalStore'

const globalStore = useGlobalStore()
</script>