<script setup lang="ts">
import {
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip,
} from 'chart.js'
import { computed, onMounted, ref } from 'vue'
import { Line } from 'vue-chartjs'
import { Api, VolumeData } from '../../typescript/skullnbones_api/skullnbones_api'
import { CURRENCIES, E_CURRENCIES } from '../../typescript/constants/currencies'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)
const show_chart = ref(false)

const chartData = computed(() => {
    return {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
            {
                data: [65, 8, 90, 81, 56, 55, 40],
                backgroundColor: 'rgba(52,152,219,0.73)',
                borderColor: 'rgba(136,136,136,0.5)',
                pointBackgroundColor: '#3498db',
                pointBorderColor: '#fff',
                label: 'ATLAS',
            },

            {
                data: [21, 48, 40, 19, 96, 27, 100],
                backgroundColor: '#bf7c0a',
                borderColor: '#aaaaaa',
                pointBackgroundColor: '#2ecc71',
                pointBorderColor: '#fff',
                label: 'USDC',
            },
        ],
    }
})

const data = ref({
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
        {
            yAxisID: 'Left',
            data: [65, 8, 90, 81, 56, 55, 40],
            backgroundColor: 'rgba(52,152,219,0.73)',
            borderColor: 'rgba(136,136,136,0.5)',
            pointBackgroundColor: '#3498db',
            pointBorderColor: '#fff',
            label: 'ATLAS',
        },

        {
            yAxisID: 'Right',
            data: [21, 48, 40, 19, 96, 27, 100],
            backgroundColor: '#bf7c0a',
            borderColor: '#aaaaaa',
            pointBackgroundColor: '#2ecc71',
            pointBorderColor: '#fff',
            label: 'USDC',
        },
    ],
})

const options = ref({
    layout: { padding: { top: 12, left: 12, bottom: 12 } },
    legend: {
        labels: {
            usePointStyle: true,

            generateLabels: function (chart: any) {
                return chart.data.datasets.map(function (dataset: any, i: any) {
                    return {
                        text: dataset.label,
                        lineCap: dataset.borderCapStyle,
                        lineDash: [],
                        lineDashOffset: 0,
                        lineJoin: dataset.borderJoinStyle,
                        pointStyle: 'circle',
                        fillStyle: dataset.backgroundColor,
                        strokeStyle: dataset.borderColor,
                        lineWidth: dataset.pointBorderWidth,
                    }
                })
            },
        },
    },
    scales: {
        Left: {
            type: 'linear',
            position: 'left',
            ticks: { beginAtZero: true, color: '#0f86ff' },
            // Hide grid lines, otherwise you have separate grid lines for the 2 y axes
            grid: { display: false },
        },
        Right: {
            type: 'linear',
            position: 'right',
            ticks: { beginAtZero: true, color: '#816223' },
            grid: { display: false },
        },
    },
    plugins: {
        legend: { display: false },
    },
    title: {
        display: true,
        text: 'Chart Title',
        fontColor: '#3498db',
        fontSize: 32,
        fontStyle: ' bold',
    },
    elements: {
        arc: {},
        point: {},
        line: { tension: 0.4 },
        rectangle: {},
    },
    tooltips: {},
    hover: {
        mode: 'nearest',
        animationDuration: 400,
    },
})

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
    chartData.value.datasets[0].data = []
    chartData.value.datasets[1].data = []
    chartData.value.labels = []
    console.log(usdc_volume)
    if (atlas_volume.length > usdc_volume.length) {
        atlas_volume.forEach((element, i) => {
            chartData.value.datasets[0].data.push(atlas_volume[i]?.volume)
            chartData.value.datasets[1].data.push(usdc_volume[i]?.volume)
            chartData.value.labels.push(atlas_volume[i]?.time)
        })
    } else {
    }
    show_chart.value = true
}
</script>
<template>
    <div>Volume</div>
    <Line v-if="show_chart" ref="chart" :data="chartData" :options="options" />
</template>

<style scoped></style>
