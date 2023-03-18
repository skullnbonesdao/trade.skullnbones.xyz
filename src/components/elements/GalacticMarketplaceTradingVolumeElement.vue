<script>
/* eslint-disable */
import BeatLoader from 'vue-spinner/src/BeatLoader.vue'
import SelectBox from '../buttons/SelectBox.vue'
import { Api } from '../../typescript/skullnbones_api/skullnbones_api'
import { CURRENCIES, E_CURRENCIES } from '../../typescript/constants/currencies'

export default {
    name: 'LineExample',
    components: { SelectBox, BeatLoader },
    data: function () {
        return {
            selected_timeframe: '1Y',
            show_chart: false,
            chartOptions: {
                xaxis: {
                    type: 'text',
                    categories: [
                        '01/01/2003',
                        '02/01/2003',
                        '03/01/2003',
                        '04/01/2003',
                        '05/01/2003',
                        '06/01/2003',
                        '07/01/2003',
                        '08/01/2003',
                    ],
                },
            },
            series: [
                {
                    name: 'Series A',
                    data: [],
                },
                {
                    name: 'Series B',
                    data: [],
                },
            ],
        }
    },
    methods: {
        async fetchAPItoChart() {
            console.log('fetchAPItoChart()')
            this.show_chart = false

            const api = new Api({ baseUrl: 'https://api2.skullnbones.xyz' })
            let series = [
                { name: 'ATLAS', data: [] },
                { name: 'USDC', data: [] },
            ]
            await api.trades
                .getVolume({ currency_mint: CURRENCIES.find((c) => c.type === E_CURRENCIES.ATLAS).mint })
                .then((resp) => resp.data)
                .then((data) => {
                    series[0].data = data.flatMap((d) => d.volume)
                })

            await api.trades
                .getVolume({ currency_mint: CURRENCIES.find((c) => c.type === E_CURRENCIES.ATLAS).mint })
                .then((resp) => resp.data)
                .then((data) => {
                    series[1].data = data.flatMap((d) => d.volume)
                    this.chartOptions.xaxis.categories = []
                    this.chartOptions.xaxis.categories = data.flatMap((d) => d.time)
                    console.log(data)
                })
            this.series = series
            this.show_chart = true
        },
    },
    mounted() {
        this.fetchAPItoChart().then(() => {})
    },
}
</script>
<template>
    <div class="flex flex-col w-full">
        <BeatLoader class="flex w-full justify-center" :loading="!show_chart" color="#ff150c" />

        <apexchart v-if="show_chart" height="350" type="line" :options="chartOptions" :series="series"></apexchart>

        <SelectBox
            class="flex w-full justify-end"
            @selected="
                (value) => {
                    selected_timeframe = value
                    fetchAPItoChart().then(() => {})
                }
            "
            text="timeframe"
            :options="['1W', '1M', '1Y']"
            :selected_in="selected_timeframe"
        />
    </div>
</template>
