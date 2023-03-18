<template>
    <apexchart type="area" height="350" :options="chartOptions" :series="props.series"></apexchart>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import { useGlobalStore } from '../../../stores/GlobalStore'
const props = defineProps({
    series: {
        type: Array,
        default: [
            {
                data: [31, 40, 28, 51, 42, 109, 100],
            },
            {
                data: [11, 32, 45, 32, 34, 52, 41],
            },
        ],
    },

    xaxis: {
        type: Object,
        default: {
            type: 'datetime',
            categories: [
                '2018-09-19T00:00:00.000Z',
                '2018-09-19T01:30:00.000Z',
                '2018-09-19T02:30:00.000Z',
                '2018-09-19T03:30:00.000Z',
                '2018-09-19T04:30:00.000Z',
                '2018-09-19T05:30:00.000Z',
                '2018-09-19T06:30:00.000Z',
            ],
        },
    },
})

const chartOptions = {
    chart: {
        annotations: {
            enabled: false,
        },
        height: 350,
        type: 'area',
        //       background: useGlobalStore().is_dark ? '#000000' : '#FFFFFF',
        foreColor: useGlobalStore().is_dark ? '#FFFFFF' : '#000000',
        toolbar: {
            show: false,
        },
    },

    tooltip: {
        theme: useGlobalStore().is_dark ? 'dark' : '',
    },
    dataLabels: {
        enabled: false,
    },
    stroke: {
        curve: 'smooth',
    },
    xaxis: {
        type: props.xaxis?.type,
        categories: props.xaxis?.categories,
    },
    yaxis: [
        {
            title: {
                text: 'ATLAS',
            },
            labels: {
                formatter: function (value: any) {
                    return value.toFixed(2)
                },
            },
        },
        {
            opposite: true,
            title: {
                text: 'USDC',
            },
            labels: {
                formatter: function (value: any) {
                    return value.toFixed(2)
                },
            },
        },
    ],
}
</script>

<style scoped></style>
