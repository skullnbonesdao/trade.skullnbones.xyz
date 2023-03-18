<template>
    <div class="flex flex-col space-y-2">
        <div class="elementcontainer">
            <div class="flex justify-center">
                <h1 class="text-4xl">Stats</h1>
            </div>
        </div>
        <div>
            <div
                class="flex flex-row items-center elementcontainer hover:bg-gray-400 dark:hover:bg-gray-700 border-b-2 border-gray-500"
                @click="show_volume_element = !show_volume_element"
            >
                <h2 class="flex flex-row w-full">Galactic Marketplace Volume</h2>
                {{ selected_timeframe }}
                <div class="flex w-full justify-end items-center">
                    <i class="w-12 h-12 i-carbon:text-indent-more" :class="show_volume_element ? 'rotate-90' : ''"></i>
                </div>
            </div>

            <Transition>
                <div class="elementcontainer shadow-inner flex flex-col items-center">
                    <GalacticMarketplaceTradingVolumeElement
                        :timeframe="selected_timeframe"
                        v-if="show_volume_element"
                    />
                </div>
            </Transition>
        </div>

        <!--        <div>-->
        <!--            <div-->
        <!--                class="flex flex-row items-center elementcontainer hover:bg-gray-400 dark:hover:bg-gray-700 border-b-2 border-gray-500"-->
        <!--                @click="show_distribution_element = !show_distribution_element"-->
        <!--            >-->
        <!--                <h2 class="flex flex-row w-full">Polis/Atlas Distribution</h2>-->
        <!--                <div class="flex w-full justify-end">-->
        <!--                    <i-->
        <!--                        class="w-12 h-12 i-carbon:text-indent-more"-->
        <!--                        :class="show_distribution_element ? 'rotate-90' : ''"-->
        <!--                    ></i>-->
        <!--                </div>-->
        <!--            </div>-->
        <!--            <Transition>-->
        <!--                <PolisAtlasDistributionElement class="elementcontainer" v-if="show_distribution_element" />-->
        <!--      -->
        <!--      -->
        <!--            </Transition>-->
        <!--        </div>-->
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

import PolisAtlasDistributionElement from '../components/elements/PolisAtlasDistributionElement.vue'
import GalacticMarketplaceTradingVolumeElement from '../components/elements/GalacticMarketplaceTradingVolumeElement.vue'
import SelectBox from '../components/buttons/SelectBox.vue'

const selected_timeframe = ref('1W')
const show_volume_element = ref(true)
const show_distribution_element = ref(true)
</script>

<style scoped>
.v-enter-active,
.v-leave-active {
    transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
}
</style>
