import { defineStore } from 'pinia'
import { GmClientService, Order, OrderSide } from '@staratlas/factory'
import { Connection, PublicKey, Keypair, Transaction } from '@solana/web3.js'
import { TRADE_PROGRAM } from '../typescript/constants/staratlas'
import { TOKEN_ATLAS, TOKEN_USDC } from '../typescript/constants/tokens'
import { SERUMRPC } from '../typescript/constants/solana'
import { BN } from 'bn.js'

type getInitializeOrderTransactionResponse = {
    transaction: Transaction
    signers: Keypair[]
}

export const useStaratlasGmStore = defineStore({
    id: 'staratlasGmStore',

    state: () => ({
        client: new GmClientService(),
        connection: new Connection(SERUMRPC),
        orders: [] as Order[],
        playerOrders: [] as Order[],
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
        /*async fetchALLOrders() {
console.info('{getOrders} called!')
const client = new GmClientService()
await client
.getAllOpenOrders(this.connection, TRADE_PROGRAM)
.then((response) => { 
this.orders = response
})
.catch((err) => console.log('{getOrders}: ' + err))
},*/
        getSumOrders(side: string, pair: PublicKey) {
            const filtered = this.orders
                .filter((order) => order.orderType === side && order.currencyMint === pair.toString())
                .flatMap((order) => order.orderOriginationQty)
            return Math.max.apply(Math, filtered)
        },

        async getOpenOrdersForAsset(assetMint: string) {
            await this.client
                .getOpenOrdersForAsset(this.connection, new PublicKey(assetMint), TRADE_PROGRAM)
                .then((response: any) => {
                    this.orders = response

                    this.atlasOrders.buyOrders = this.orders
                        .filter((order) => order.orderType === 'buy' && order.currencyMint === TOKEN_ATLAS.toString())
                        .sort((a, b) => a.uiPrice - b.uiPrice)

                    this.atlasOrders.sellOrders = this.orders
                        .filter((order) => order.orderType === 'sell' && order.currencyMint === TOKEN_ATLAS.toString())
                        .sort((a, b) => a.uiPrice - b.uiPrice)

                    this.usdcOrders.buyOrders = this.orders
                        .filter((order) => order.orderType === 'buy' && order.currencyMint === TOKEN_USDC.toString())
                        .sort((a, b) => a.uiPrice - b.uiPrice)

                    this.usdcOrders.sellOrders = this.orders
                        .filter((order) => order.orderType === 'sell' && order.currencyMint === TOKEN_USDC.toString())
                        .sort((a, b) => a.uiPrice - b.uiPrice)
                })
                .catch((err: any) => console.log('{getOpenOrdersForAssetError}: ' + err))
        },
        async getOpenOrdersForPlayerAndAsset(playerPublicKey: string, assetMint: string) {
            await this.client
                .getOpenOrdersForPlayerAndAsset(this.connection, new PublicKey(playerPublicKey), new PublicKey(assetMint), TRADE_PROGRAM)
                .then((response: any) => {
                    this.playerOrders = response
                    console.log("this.playerOrders", this.playerOrders)
                })
        },
        async getInitializeOrderTransaction(
            playerPublicKey: PublicKey,
            assetMint: string,
            quoteMint: PublicKey,
            quantity: number,
            price: number,
            orderSide: OrderSide
        ) {
            return await this.client.getInitializeOrderTransaction(
                this.connection,
                new PublicKey(playerPublicKey),
                new PublicKey(assetMint),
                quoteMint,
                quantity,
                new BN(price),
                TRADE_PROGRAM,
                orderSide,
            ).then((response: getInitializeOrderTransactionResponse) => {
                console.log("getInitializeOrderTransaction", response)
                return response;
            })
        },
    },
})
