// stores/counter.js
import { defineStore } from 'pinia'

export enum Side {
    SELL = 'sell',
    BUY = 'buy',
}

export const useGlobalStore = defineStore('globalStore', {
    state: () => {
        return {
            symbol: 'FOODATLAS',
            side: {} as Side,
        }
    },
    actions: {
        init() {
            this.side = Side.BUY
        },
    },
})
