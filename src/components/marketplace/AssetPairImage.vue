<template>
    <div>
        <div class="w-16 relative">
            <img
                class="object-cover aspect-square hexagon"
                :src="'/sa_images/webp/' + props.mint + '.webp'"
                alt="asset_image"
            />

            <div class="absolute -top-1 -left-1">
                <CurrencyIcon class="rounded-md w-9" :currency="props.pair" />
            </div>
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
