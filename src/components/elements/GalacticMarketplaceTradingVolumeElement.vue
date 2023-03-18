<script>
/* eslint-disable */
import BeatLoader from 'vue-spinner/src/BeatLoader.vue'
import SelectBox from '../buttons/SelectBox.vue'
import { Api } from '../../typescript/skullnbones_api/skullnbones_api'
import { CURRENCIES, E_CURRENCIES } from '../../typescript/constants/currencies'
import { useGlobalStore } from '../../stores/GlobalStore'

export default {
    name: 'LineExample',
    components: { SelectBox, BeatLoader },
    data: function () {
        return {
            selected_timeframe: '1M',
            show_chart: false,
            chartOptions: {
                chart: {
                    background: useGlobalStore().is_dark ? '' : '',
                    foreColor: useGlobalStore().is_dark ? 'Grey' : '',
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
                    width: 2,
                },

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
                    data: [],
                },
                {
                    type: 'line',
                    name: 'ATLAS',
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

            let array_1 = []
            let array_2 = []

            let from_param = (Date.now() / 1000).toFixed(0)
            switch (this.selected_timeframe) {
                case '1W':
                    from_param -= 60 * 60 * 24 * 7
                    break
                case '1M':
                    from_param -= 60 * 60 * 24 * 30
                    break
                case '1Y':
                    from_param -= 60 * 60 * 24 * 356
                    break
            }

            await api.trades
                .getVolume({
                    currency_mint: CURRENCIES.find((c) => c.type === E_CURRENCIES.USDC).mint,
                    from: from_param,
                })
                .then((resp) => resp.data)
                .then((data) => {
                    array_1 = data
                })

            await api.trades
                .getVolume({
                    currency_mint: CURRENCIES.find((c) => c.type === E_CURRENCIES.ATLAS).mint,
                    from: from_param,
                })
                .then((resp) => resp.data)
                .then((data) => {
                    array_2 = data
                })
            let array_combined = this.mergeArrays(array_1, array_2)
            this.series[0].data = array_combined.map((el) => el.volume_1)
            this.series[1].data = array_combined.map((el) => el.volume_2)

            this.chartOptions.xaxis.categories = array_combined.map((el) => el.time)
            console.log(array_combined)
            this.show_chart = true
        },
        label_formatter(value) {
            return value.toFixed(2)
        },
        mergeArrays(arr1, arr2) {
            let mergedArr = []

            // iterate over the first array
            for (let i = 0; i < arr1.length; i++) {
                let time = arr1[i].time
                let volume1 = arr1[i].volume
                let volume2 = 0

                // iterate over the second array to find a match
                for (let j = 0; j < arr2.length; j++) {
                    if (arr2[j].time === time) {
                        volume2 = arr2[j].volume
                        break
                    }
                }

                // add the volumes together and push the result to the merged array
                mergedArr.push({
                    time: time,
                    volume_1: volume1,
                    volume_2: volume2,
                })
            }

            // iterate over the second array to find unmatched times
            for (let i = 0; i < arr2.length; i++) {
                let time = arr2[i].time
                let volume1 = 0
                let volume2 = arr2[i].volume

                // iterate over the merged array to check for a match
                let matched = false
                for (let j = 0; j < mergedArr.length; j++) {
                    if (mergedArr[j].time === time) {
                        matched = true
                        break
                    }
                }

                // if there is no match, push the missing data to the merged array
                if (!matched) {
                    mergedArr.push({
                        time: time,
                        volume_1: volume1,
                        volume_2: volume2,
                    })
                }
            }

            return mergedArr
        },
    },
    mounted() {
        this.fetchAPItoChart().then(() => {})
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

        <SelectBox
            class="elementcontainer flex w-full justify-end"
            v-if="show_chart"
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
