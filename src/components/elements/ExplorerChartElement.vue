<script>
/* eslint-disable */
import BeatLoader from 'vue-spinner/src/BeatLoader.vue'
import SelectBox from '../buttons/SelectBox.vue'
import { Api } from '../../typescript/skullnbones_api/skullnbones_api'
import { CURRENCIES, E_CURRENCIES } from '../../typescript/constants/currencies'
import { useGlobalStore } from '../../stores/GlobalStore'

export default {
    name: 'ExplorerChartElement',
    props: {
        x_values: Array,
        y_values: Array,
    },
    components: { SelectBox, BeatLoader },
    data: function () {
        return {
            selected_timeframe: '1M',
            show_chart: true,
            chartOptions: {
                chart: {
                    background: useGlobalStore().is_dark ? '' : '',
                    foreColor: useGlobalStore().is_dark ? 'Gray' : '',
                    type: 'area',
                    toolbar: {
                        show: false,
                    },
                },
                tooltip: {
                    theme: useGlobalStore().is_dark ? 'dark' : 'false',
                },
                stroke: {
                    curve: 'smooth',
                },
                colors: ['#1F6EFFFF', '#9e5315'],

                xaxis: {
                    type: 'datetime',
                    categories: this.y_values,
                },
                yaxis: [
                    {
                        seriesName: 'USDC',

                        min: 0,
                        labels: {
                            formatter: this.label_formatter,
                        },
                    },
                    {
                        seriesName: 'ATLAS',
                        opposite: true,
                        min: 0,
                        labels: {
                            formatter: this.label_formatter,
                        },
                    },
                ],
            },
            series: [
                {
                    type: 'line',
                    name: 'USDC',
                    data: this.x_values[1],
                },
                {
                    type: 'line',
                    name: 'ATLAS',
                    data: this.x_values[0],
                },
            ],
        }
    },
    methods: {
        label_formatter(value) {
            return value?.toFixed(7)
        },
    },
}
</script>
<template>
    <div class="flex flex-col w-full">
        <BeatLoader class="elementcontainer flex w-full justify-center" :loading="!show_chart" color="#ff150c" />

        <apexchart
            class="elementcontainer"
            v-if="show_chart"
            height="350"
            type="line"
            :options="chartOptions"
            :series="series"
        ></apexchart>
    </div>
</template>
