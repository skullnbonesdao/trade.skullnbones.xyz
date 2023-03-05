<template>
    <Line :data="chartData" :options="chartOptions" />
</template>

<script setup>
import 'chartjs-adapter-moment'
import { Line } from 'vue-chartjs'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
    TimeScale,
} from 'chart.js'
import { computed, watch } from 'vue'
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler, TimeScale)

const props = defineProps(['data', 'labels'])

const chartData = computed(() => {
    return {
        labels: props.labels,
        datasets: props.data,
        //     [
        //     {
        //         label: 'Data One',
        //
        //         radius: 4,
        //         fill: true,
        //
        //         backgroundColor: (ctx) => {
        //             const canvas = ctx.chart.ctx
        //             const gradient = canvas.createLinearGradient(0, 0, 0, 160)
        //
        //             gradient.addColorStop(1, 'rgba(80,18,128,0.46)')
        //             gradient.addColorStop(0.5, 'rgba(0,142,255,0.5)')
        //
        //             return gradient
        //         },
        //
        //         data: props.data,
        //     },
        // ],
    }
})

const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            display: true, // This hides all text in the legend and also the labels.
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
        x: {
            type: 'time',
            display: true,
        },
    },
}
</script>
<style scoped></style>
