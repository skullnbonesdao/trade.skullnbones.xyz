import { defineStore } from 'pinia'
import { SERUMAPIWEBSOCKET } from '../typescript/constants/serum'
import { Convert } from '../typescript/websockets/MarketLevel1'

export const useTokenPriceStore = defineStore({
    id: 'tokenPriceStore',
    state: () => ({
        ws: {} as WebSocket,
        token_price: {
            bitcoin: '0.0',
            solana: '0.0',
            atlas: '0.0',
            polis: '0.0',
        },
        change24h: {
            bitcoin: 0.0,
            solana: 0.0,
            atlas: 0.0,
            polis: 0.0,
        },
    }),

    actions: {
        async init() {
            initWebSockets(this.ws, this.token_price)
            await init24Change(this.change24h)
        },
    },
})

function initWebSockets(ws: WebSocket, token_price: any) {
    ws = new WebSocket(SERUMAPIWEBSOCKET)
    const sub_btc_L1 = {
        op: 'subscribe',
        channel: 'level1',
        markets: ['BTC/USDC'],
    }
    const sub_sol_L1 = {
        op: 'subscribe',
        channel: 'level1',
        markets: ['SOL/USDC'],
    }
    const sub_polis_L1 = {
        op: 'subscribe',
        channel: 'level1',
        markets: ['POLIS/USDC'],
    }
    const sub_atlas_L1 = {
        op: 'subscribe',
        channel: 'level1',
        markets: ['ATLAS/USDC'],
    }

    ws.onopen = () => {
        ws.send(JSON.stringify(sub_btc_L1))
        ws.send(JSON.stringify(sub_sol_L1))
        ws.send(JSON.stringify(sub_polis_L1))
        ws.send(JSON.stringify(sub_atlas_L1))
        // console.info("Created MarketWebsockets");
    }

    ws.onmessage = (event: MessageEvent) => {
        const new_market_data = Convert.toMarketLevel1(event.data)
        if (new_market_data.type === 'quote') {
            switch (new_market_data.market) {
                case 'BTC/USDC':
                    token_price.bitcoin = new_market_data.bestBid[0]
                    // console.info("{ws-message} BTC/USDC");
                    break
                case 'SOL/USDC':
                    token_price.solana = new_market_data.bestBid[0]
                    // console.info("{ws-message} SOL/USDC");
                    break
                case 'ATLAS/USDC':
                    token_price.atlas = new_market_data.bestBid[0]
                    // console.info("{ws-message} ATLAS/USDC");
                    break
                case 'POLIS/USDC':
                    token_price.polis = new_market_data.bestBid[0]
                    // console.info("{ws-message} POLIS/USDC");
                    break
            }
        }
    }
}

async function init24Change(change24h: any) {
    fetch('/ftx/markets/BTC/USD')
        .then((res) => res.json())
        .then((data: any) => {
            change24h.bitcoin = data.result.change24h
        })

    fetch('/ftx/markets/SOL/USD')
        .then((res) => res.json())
        .then((data: any) => {
            change24h.solana = data.result.change24h
        })

    fetch('/ftx/markets/POLIS/USD')
        .then((res) => res.json())
        .then((data: any) => {
            change24h.polis = data.result.change24h
        })

    fetch('/ftx/markets/ATLAS/USD')
        .then((res) => res.json())
        .then((data: any) => {
            change24h.atlas = data.result.change24h
        })
}
