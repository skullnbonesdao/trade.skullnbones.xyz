<template>
    <div class="flex flex-col static place-items-center">
        <div class="avatar">
            <div class="w-12 rounded">
                <img class="rounded-md" :src="'/sa_images/webp/' + props.mint + '.webp'" alt="asset_image" />
            </div>
        </div>
        <div class="absolute pt-8">
            <div class="bg-black text-xs p-1 rounded-md">{{ symbol }}</div>
        </div>
        <div class="absolute pt-0 pr-7">
            <CurrencyIcon class="w-6" :currency="props.pair" />
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
    symbol: String,
})
</script>

<style scoped>
.hexagon {
    width: 190px;
    --webkit-clip-path: polygon(50% 0, 100% 25%, 100% 75%, 50% 100%, 0 75%, 0 25%);
    clip-path: polygon(50% 0, 100% 25%, 100% 75%, 50% 100%, 0 75%, 0 25%);
}
</style>
