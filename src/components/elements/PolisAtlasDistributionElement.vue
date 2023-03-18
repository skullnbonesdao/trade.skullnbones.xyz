<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { StaratlasToken } from '../../typescript/interfaces/StarAtlasTokenAPI'
import DonutChart from '../../components/charts/apexcharts/DonutChart.vue'
import BeatLoader from 'vue-spinner/src/BeatLoader.vue'
import TreeMap from '../../components/charts/apexcharts/TreeMap.vue'
const is_loading = ref(true)

const api_atlas = ref<StaratlasToken>()
const api_polis = ref<StaratlasToken>()

onMounted(() => {
    fetch('https://galaxy.staratlas.com/tokens/atlas')
        .then((res) => res.json())
        .then((json) => (api_atlas.value = json))

    fetch('https://galaxy.staratlas.com/tokens/polis')
        .then((res) => res.json())
        .then((json) => (api_polis.value = json))
    is_loading.value = false
})
</script>
<template>
    <BeatLoader class="elementcontainer flex w-full justify-center" :loading="!api_atlas" color="#ff150c" />

    <div v-if="api_atlas" class="grid grid-cols-2 gap-2">
        <div class="elementcontainer">
            <h2>ATLAS</h2>
            <donut-chart
                :series="[
                    api_atlas?.circulating,
                    api_atlas?.lockedSupply,

                    api_atlas?.totalSupply - api_atlas?.circulating - api_atlas?.lockedSupply,
                ]"
                :lables="['circulating', 'locked', 'remaining']"
            />
        </div>
        <div class="elementcontainer">
            <h2>POLIS</h2>
            <donut-chart
                :series="[
                    api_polis?.circulating,
                    api_polis?.lockedSupply,
                    api_polis?.totalSupply - api_polis?.circulating - api_polis?.lockedSupply,
                ]"
                :lables="['circulating', 'locked', 'remaining']"
            />
        </div>
        <div class="elementcontainer">
            <tree-map
                :series="[
                    {
                        name: 'ATLAS',
                        data: [
                            {
                                x: 'circulating',
                                y: api_atlas?.circulating,
                            },
                            {
                                x: 'locked',
                                y: api_atlas?.lockedSupply,
                            },
                            {
                                x: 'remaining',
                                y: api_atlas?.totalSupply - api_atlas?.circulating - api_atlas?.lockedSupply,
                            },
                        ],
                    },
                ]"
            />
        </div>
        <div class="elementcontainer">
            <tree-map
                :series="[
                    {
                        name: 'POLIS',
                        data: [
                            {
                                x: 'circulating',
                                y: api_polis?.circulating,
                            },
                            {
                                x: 'locked',
                                y: api_polis?.lockedSupply,
                            },
                            {
                                x: 'remaining',
                                y: api_polis?.totalSupply - api_polis?.circulating - api_polis?.lockedSupply,
                            },
                        ],
                    },
                ]"
            />
        </div>
    </div>
</template>
