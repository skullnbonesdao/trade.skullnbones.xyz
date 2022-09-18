<template>
    {{ symbol }}
    <div ref="chartContainer" class="TVChartContainer" />
</template>

<script>
import { widget } from '../../../../public/charting_library'

import { UDFCompatibleDatafeed } from '../../../typescript/tradingview_adapter/udf/lib/udf-compatible-datafeed.js'
import { useGlobalStore } from '../../../stores/GlobalStore'
import { storeToRefs } from 'pinia'

function getLanguageFromURL() {
    const regex = new RegExp('[\\?&]lang=([^&#]*)')
    const results = regex.exec(window.location.search)
    return results === null ? null : decodeURIComponent(results[1].replace(/\+/g, ' '))
}

export default {
    name: 'TVChartContainer',

    tvWidget: null,
    setup() {
        const globalStore = useGlobalStore()
        const { symbol } = storeToRefs(globalStore)
        return {
            symbol,
        }
    },

    mounted() {
        const container = this.$refs.chartContainer
        const widgetOptions = {
            symbol: useGlobalStore().symbol, //assetSelected,
            debug: false,
            // BEWARE: no trailing slash is expected in feed URL
            /*  default: 'http://localhost:3000',*/
            /* default: '/api',*/
            datafeed: new UDFCompatibleDatafeed('https://api2.skullnbones.xyz'),
            interval: '100',
            container: container,
            library_path: '/charting_library/',
            theme: 'dark',

            locale: getLanguageFromURL() || 'en',
            disabled_features: ['use_localstorage_for_settings'],
            /*enabled_features: ["study_templates"],*/
            /*      charts_storage_url: this.chartsStorageUrl,*/
            charts_storage_api_version: '1.1',
            client_id: 'clientID',
            user_id: 'someID',
            fullscreen: false,
            autosize: true,
            studies_overrides: {},
        }

        const tvWidget = new widget(widgetOptions)
        this.tvWidget = tvWidget

        tvWidget.onChartReady(() => {
            tvWidget.headerReady().then(() => {
                const button = tvWidget.createButton()

                button.setAttribute('title', 'Click to show a notification popup')
                button.classList.add('apply-common-tooltip')

                button.addEventListener('click', () =>
                    tvWidget.showNoticeDialog({
                        title: 'Notification',
                        body: 'TradingView Charting Library API works correctly',
                        callback: () => {
                            // eslint-disable-next-line no-console
                            console.log('Noticed!')
                        },
                    })
                )

                button.innerHTML = 'Check API'
            })
            tvWidget
                .activeChart()
                .onSymbolChanged()
                .subscribe(null, () => (useGlobalStore().symbol = tvWidget.activeChart().symbol()))
        })
    },

    destroyed() {
        if (this.tvWidget !== null) {
            this.tvWidget.remove()
            this.tvWidget = null
        }
    },
}
</script>

<style lang="scss" scoped>
.TVChartContainer {
    height: calc(100vh - 80px);
}
</style>