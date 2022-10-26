// stores/counter.js
import { defineStore } from 'pinia'
import { Connection, PerfSample } from '@solana/web3.js'
import { ref } from 'vue'
import { GENESYSGO } from '../typescript/constants/solananetwork'
import { useGlobalStore } from './GlobalStore'

export const useSolanaNetworkStore = defineStore('solanaNetwork', {
    state: () => {
        return {
            ws: {} as WebSocket,
            connection: {} as Connection,
            transactions_per_second: ref(0),
        }
    },
    // could also be defined as
    // state: () => ({ count: 0 })
    actions: {
        init() {
            this.connection = new Connection(useGlobalStore().rpc.url, 'confirmed')
        },

        async run_tps() {
            while (true) {
                let tps: PerfSample[] = await this.connection.getRecentPerformanceSamples(5)

                this.transactions_per_second = 0
                tps.forEach((t) => {
                    this.transactions_per_second += t.numTransactions / t.samplePeriodSecs
                })
                this.transactions_per_second = this.transactions_per_second / tps.length

                await new Promise((r) => setTimeout(r, 10000))
            }
        },
    },
})
