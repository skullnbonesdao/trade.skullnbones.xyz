<template>
    <div class="flex flex-col static items-center">
        <div class="avatar bg-gray-200 dark:bg-gray-600 rounded-md p1">
            <div class="w-12">
                <img class="rounded-full" :src="'/sa_images/webp/' + props.mint + '.webp'" alt="asset_image" />
            </div>
        </div>

        <div class="absolute pt-1 pr-6">
            <CurrencyIcon class="w-7" :currency="props.pair" />
        </div>
    </div>
</template>
<script setup lang="ts">
import CurrencyIcon from '../icon-helper/CurrencyIcon.vue'
import { I_CURRENCY } from '../../typescript/constants/currencies.js'
import { PropType } from 'vue'

const props = defineProps({
    mint: String,
    pair: Object as PropType<I_CURRENCY>,
})
</script>

<style scoped>
.hexagon {
    width: 190px;
    --webkit-clip-path: polygon(50% 0, 100% 25%, 100% 75%, 50% 100%, 0 75%, 0 25%);
    clip-path: polygon(50% 0, 100% 25%, 100% 75%, 50% 100%, 0 75%, 0 25%);
}
</style>
