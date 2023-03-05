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
            display: false, // This hides all text in the legend and also the labels.
        },
    },
    scales: {
        x: {
            type: 'time',
            display: false,
        },
    },
}
</script>
<style scoped></style>
