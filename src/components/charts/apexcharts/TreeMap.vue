<template>
    <apexchart type="treemap" height="350" :options="chartOptions" :series="props.series"></apexchart>
</template>

<script lang="ts" setup>
import { PropType } from 'vue'

const props = defineProps({
    series: {
        type: Object,
        default: [
            {
                name: 'Desktops',
                data: [
                    {
                        x: 'ABC',
                        y: 10,
                    },
                    {
                        x: 'DEF',
                        y: 60,
                    },
                    {
                        x: 'XYZ',
                        y: 41,
                    },
                ],
            },
            {
                name: 'Mobile',
                data: [
                    {
                        x: 'ABCD',
                        y: 10,
                    },
                    {
                        x: 'DEFG',
                        y: 20,
                    },
                    {
                        x: 'WXYZ',
                        y: 51,
                    },
                    {
                        x: 'PQR',
                        y: 30,
                    },
                    {
                        x: 'MNO',
                        y: 20,
                    },
                    {
                        x: 'CDE',
                        y: 30,
                    },
                ],
            },
        ],
    },
})

const chartOptions = {
    chart: {
        type: 'treemap',
        toolbar: {
            show: false,
        },
    },
    series: {
        type: Object,
        default: {
            data: [
                {
                    x: 'New Delhi',
                    y: 218,
                },
                {
                    x: 'Kolkata',
                    y: 149,
                },
            ],
        },
    },
}
</script>

<style scoped></style>
