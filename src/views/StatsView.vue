<template>
    <div class="">
        <div class="content-box">
            <div class="flex justify-center">
                <h1 class="text-4xl">Stats</h1>
            </div>
        </div>
        <div class="grid grid-cols-2 gap-2 content-box">
            <div v-if="api_atlas">
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
            <div v-if="api_polis">
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
            <div v-if="api_atlas">
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
            <div v-if="api_polis">
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
    </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import DonutChart from '../components/charts/apexcharts/DonutChart.vue'
import { StaratlasToken } from '../typescript/interfaces/StarAtlasTokenAPI'
import TreeMap from '../components/charts/apexcharts/TreeMap.vue'

const api_atlas = ref<StaratlasToken>()
const api_polis = ref<StaratlasToken>()

onMounted(() => {
    fetch('https://galaxy.staratlas.com/tokens/atlas')
        .then((res) => res.json())
        .then((json) => (api_atlas.value = json))

    fetch('https://galaxy.staratlas.com/tokens/polis')
        .then((res) => res.json())
        .then((json) => (api_polis.value = json))
})
</script>
