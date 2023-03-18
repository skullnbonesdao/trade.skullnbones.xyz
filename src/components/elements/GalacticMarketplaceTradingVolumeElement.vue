<script setup lang="ts">
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Color,
    BorderOptions,
    LayoutPosition,
} from 'chart.js'
import { ref } from 'vue'
import { Line } from 'vue-chartjs'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)
const data = ref({
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
        {
            data: [65, 8, 90, 81, 56, 55, 40],
            backgroundColor: 'rgba(52,152,219,0.73)',
            borderColor: 'rgba(136,136,136,0.5)',
            pointBackgroundColor: '#3498db',
            pointBorderColor: '#fff',
            label: '2013',
        },

        {
            data: [21, 48, 40, 19, 96, 27, 100],
            backgroundColor: 'rgba(46,204,112,0.61)',
            borderColor: '#aaaaaa',
            pointBackgroundColor: '#2ecc71',
            pointBorderColor: '#fff',
            label: '2014',
        },
    ],
})

const options = ref({
    layout: { padding: { top: 12, left: 12, bottom: 12 } },
    scales: {
        xAxes: [
            {
                gridLines: { borderDash: [] },
            },
        ],

        yAxes: [
            {
                gridLines: { borderDash: [] },
            },
        ],
    },
    plugins: {
        datalabels: { display: false },
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
</script>
<template>
    <div>Volume</div>
    <Line :data="data" :options="options" />
</template>

<style scoped></style>
