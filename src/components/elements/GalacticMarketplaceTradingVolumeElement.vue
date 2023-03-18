<script setup lang="ts">
import SplineChartApexCharts from '../charts/apexcharts/SplineChartApexCharts.vue'
import { onMounted, ref } from 'vue'
import { CURRENCIES, E_CURRENCIES } from '../../typescript/constants/currencies'
import { Api, VolumeData } from '../../typescript/skullnbones_api/skullnbones_api'
import DotLoader from 'vue-spinner/src/DotLoader.vue'
interface ChartSeries {
    name: String
    data: Array<number>
}

interface ChartXAxis {
    type: String
    categories: Array<String>
}
const show_chart = ref(false)
const chart_series = ref<Array<ChartSeries>>([])
const chart_time = ref<ChartXAxis>()

onMounted(async () => {
    fetch_api().then(() => {})
})

async function fetch_api() {
    let atlas_volume: VolumeData[] = []
    let usdc_volume: VolumeData[] = []

    const api = new Api({ baseUrl: 'https://api2.skullnbones.xyz' })
    await api.trades
        .getVolume({
            currency_mint: CURRENCIES.find((c) => c.type == E_CURRENCIES.ATLAS)?.mint ?? 'none',
        })
        .then((resp) => resp.data)
        .then((data) => (atlas_volume = data))
    await api.trades
        .getVolume({
            currency_mint: CURRENCIES.find((c) => c.type == E_CURRENCIES.USDC)?.mint ?? 'none',
        })
        .then((resp) => resp.data)
        .then((data) => (usdc_volume = data))

    chart_time.value = {
        type: 'text',
        categories: [],
    }
    chart_series.value = []

    chart_series.value.push({
        name: 'ATLAS',
        data: [],
    })

    chart_series.value.push({
        name: 'USDC',
        data: [],
    })
    console.log(usdc_volume)
    if (atlas_volume.length > usdc_volume.length) {
        atlas_volume.forEach((element, i) => {
            chart_series.value[0].data.push(atlas_volume[i]?.volume)
            chart_series.value[1].data.push(usdc_volume[i]?.volume)

            chart_time.value?.categories.push(atlas_volume[i].time)
        })
    } else {
    }
    show_chart.value = true
}
</script>
<template>
    <div>
        <DotLoader class="flex w-full justify-center" :loading="!show_chart" color="#ff150c" />
        <SplineChartApexCharts v-if="show_chart" :series="chart_series" :xaxis="chart_time" />
    </div>
</template>

<style scoped></style>
