// stores/counter.js
import { defineStore } from 'pinia'

export const useGlobalStore = defineStore('globalStore', {
    state: () => {
        return {
            symbol: 'FOODATLAS',
        }
    },
    actions: {},
})
