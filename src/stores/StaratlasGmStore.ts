import { defineStore } from 'pinia'
import { GmClientService, Order } from '@staratlas/factory'
import { Connection, PublicKey } from '@solana/web3.js'
import { TRADE_PROGRAM } from '../typescript/constants/staratlas'
import { TOKEN_ATLAS, TOKEN_USDC } from '../typescript/constants/tokens'
import { SERUMRPC } from '../typescript/constants/solana'

export const useStaratlasGmStore = defineStore({
    id: 'staratlasGmStore',

    state: () => ({
        client: new GmClientService(),
        connection: new Connection(SERUMRPC),
        orders: [] as Order[],
        atlasOrders: {
            buyOrders: [] as Order[],
            sellOrders: [] as Order[],
        },
        usdcOrders: {
            buyOrders: [] as Order[],
            sellOrders: [] as Order[],
        },
    }),

    actions: {
        async fetchALLOrders() {
            console.info('{getOrders} called!')
            const client = new GmClientService()
            await client
                .getAllOpenOrders(this.connection, TRADE_PROGRAM)
                .then((response) => {
                    this.orders = response
                })
                .catch((err) => console.log('{getOrders}: ' + err))
        },

        async getOpenOrdersForAsset(assetMint: string) {
            await this.client
                .getOpenOrdersForAsset(this.connection, new PublicKey(assetMint), TRADE_PROGRAM)
                .then((response) => {
                    this.orders = response

                    this.atlasOrders.buyOrders = response
                        .filter((order) => order.orderType === 'buy' && order.currencyMint === TOKEN_ATLAS.toString())
                        .sort((a, b) => a.uiPrice - b.uiPrice)

                    this.atlasOrders.sellOrders = response
                        .filter((order) => order.orderType === 'sell' && order.currencyMint === TOKEN_ATLAS.toString())
                        .sort((a, b) => a.uiPrice - b.uiPrice)

                    this.usdcOrders.buyOrders = response
                        .filter((order) => order.orderType === 'buy' && order.currencyMint === TOKEN_USDC.toString())
                        .sort((a, b) => a.uiPrice - b.uiPrice)

                    this.usdcOrders.sellOrders = response
                        .filter((order) => order.orderType === 'sell' && order.currencyMint === TOKEN_USDC.toString())
                        .sort((a, b) => a.uiPrice - b.uiPrice)
                })
                .catch((err) => console.log('{getOpenOrdersForAssetError}: ' + err))
        },
    },
})
