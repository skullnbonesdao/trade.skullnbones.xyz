<template>
    <apexchart :options="chartOptions" :series="props.series" type="donut"></apexchart>
</template>

<script lang="ts" setup>
import { PropType } from 'vue'

const props = defineProps({
    series: {
        type: Array as PropType<Array<number>>,
        default: [44, 55, 41, 17, 15],
    },
    lables: {
        type: Array as PropType<Array<String>>,
        default: ['A', 'B', 'C', 'D', 'E'],
    },
})

const chartOptions = {
    chart: {
        type: 'donut',
        toolbar: {
            show: false,
        },
    },
    responsive: [
        {
            breakpoint: 480,
            options: {
                chart: {
                    width: 200,
                },
                legend: {
                    position: 'bottom',
                },
            },
        },
    ],
    plotOptions: {
        radialBar: {
            inverseOrder: false,
            hollow: {
                margin: 5,
                size: '48%',
                background: 'transparent',
            },
            track: {
                show: true,
                background: '#40475D',
                strokeWidth: '10%',
                opacity: 1,
                margin: 3, // margin is in pixels
            },
        },
    },
    legend: {
        show: true,
        position: 'left',
        offsetX: -30,
        offsetY: -10,
    },
    fill: {
        type: 'gradient',
        gradient: {
            shade: 'dark',
            type: 'horizontal',
            shadeIntensity: 0.5,
            inverseColors: true,
            opacityFrom: 1,
            opacityTo: 1,
            stops: [0, 100],
        },
    },

    labels: props.lables,
}
</script>

<style scoped></style>
