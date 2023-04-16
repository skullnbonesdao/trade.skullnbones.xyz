// stores/counter.js
import { defineStore } from 'pinia'
import { AccountInfo, Connection, ParsedAccountData, PublicKey } from '@solana/web3.js'
import { TOKEN_PROGRAM } from '../typescript/constants/staratlas'
import { useDark, useLocalStorage, useToggle } from '@vueuse/core'
import { useAssetsStore } from './AssetsStore'
import { useStaratlasGmStore } from './StaratlasGmStore'
import { RPCEndpoint } from '../typescript/interfaces/RPCEndpoint'
import { CURRENCIES, E_CURRENCIES } from '../typescript/constants/currencies'
import { useTokenPriceStore } from './TokenPriceStore'

export const endpoints_list: RPCEndpoint[] = [
    { name: 'extrnode', url: 'https://solana-mainnet.rpc.extrnode.com' },
    { name: 'ankr', url: 'https://rpc.ankr.com/solana' },
    { name: 'solana-main', url: 'https://api.mainnet-beta.solana.com/' },
    { name: 'solana-serum', url: 'https://solana-api.projectserum.com/' },
]

export interface TradeAsset {
    redraw_chart: boolean
    name: string
    mint_asset: PublicKey
    mint_pair: PublicKey
}

export interface TokenInfo {
    address: String
    amount: number
    value_usd: number
}

export enum Side {
    SELL = 'sell',
    BUY = 'buy',
}

type UserNft = {
    pubkey: PublicKey
    account: AccountInfo<ParsedAccountData>
}

export const useGlobalStore = defineStore('globalStore', {
    state: () => {
        return {
            is_dark: useDark(),
            rpc: useLocalStorage('rpc_local_store', endpoints_list[0]),
            draw_tv: true,
            symbol: {
                name: 'PX4USDC',
                mint_asset: new PublicKey('foodQJAztMzX1DKpLaiounNe2BDMds5RNuPC6jsNrDG'),
                mint_pair: new PublicKey('ATLASXmbPQxBUYbxPsV97usA3fPQYEqzQBUHgiFCUsXx'),
            } as TradeAsset,
            side: {} as Side,
            connection: {} as Connection,
            userWallet: {
                address: 'none',
                is_web_wallet_connected: false,
                tokens: [] as Array<TokenInfo>,
                history: [],
            },
            userTokens: [
                {
                    name: 'ATLAS',
                    mint: CURRENCIES.find((c) => c.type === E_CURRENCIES.ATLAS)?.mint.toString(),
                    data: {
                        pubkey: {} as PublicKey,
                        account: {} as AccountInfo<ParsedAccountData>,
                    },
                },
                {
                    name: 'USDC',
                    mint: CURRENCIES.find((c) => c.type === E_CURRENCIES.USDC)?.mint.toString(),
                    data: {
                        pubkey: {} as PublicKey,
                        account: {} as AccountInfo<ParsedAccountData>,
                    },
                },
            ],
            userStarAtlasNfts: [] as UserNft[],
        }
    },
    actions: {
        init() {
            this.connection = new Connection(this.rpc.url, { httpHeaders: {} })
            this.side = Side.BUY
        },
        toggleDark() {
            useToggle(!this.is_dark)
            this.is_dark = !this.is_dark
        },
        async refreshAccountInfo(accountPublicKey: PublicKey) {
            if (accountPublicKey !== null) {
                await this.connection
                    .getParsedTokenAccountsByOwner(accountPublicKey, { programId: TOKEN_PROGRAM }, 'confirmed')
                    .then((response) => {
                        this.userStarAtlasNfts = response.value.filter((value) =>
                            useAssetsStore().allAssets.find(
                                (asset) => value?.account?.data?.parsed?.info?.mint === asset.mint
                            )
                        )
                        useAssetsStore().allAssets
                        const data = response.value.filter(
                            (value) => !!value?.account?.data?.parsed?.info?.tokenAmount?.uiAmount
                        )
                        this.userTokens.forEach((userToken) => {
                            const searchedToken = data.find((el) => el.account.data.parsed.info.mint === userToken.mint)
                            if (searchedToken !== undefined) userToken.data = searchedToken
                        })
                    })
            }
        },
        updateSymbol(name: string) {
            useGlobalStore().draw_tv = false
            this.symbol.mint_asset = new PublicKey(
                useAssetsStore().allAssets.find((asset) => name.includes(asset.symbol))?.mint ?? ''
            )
            this.symbol.mint_pair = new PublicKey(
                CURRENCIES.find((currency) => name.includes(currency.name))?.mint ?? ''
            )
            useStaratlasGmStore().getOpenOrdersForAsset(this.symbol.mint_asset.toString())
            this.symbol.name = name
            useGlobalStore().draw_tv = true
        },

        async user_wallet_tokens_fetch() {
            this.userWallet.tokens = []
            //Fetch_sol_token
            this.userWallet.tokens.push({
                amount:
                    (await useGlobalStore().connection.getBalance(new PublicKey(this.userWallet.address))) *
                    Math.pow(10, -9),
                address: 'So11111111111111111111111111111111111111112',
                value_usd: 0,
            })
            this.userWallet.tokens[0].value_usd =
                parseFloat(useTokenPriceStore().token_price.solana) * this.userWallet.tokens[0].amount

            //Fetch other_tokens
            let token_mints = CURRENCIES.flatMap((c) => new PublicKey(c.mint))

            let response_tokenAccounts = await this.connection.getParsedTokenAccountsByOwner(
                new PublicKey(this.userWallet.address),
                { programId: new PublicKey('TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA') }
            )

            for (const token of response_tokenAccounts.value) {
                this.userWallet.tokens.push({
                    amount: await this.connection
                        .getTokenAccountBalance(token.pubkey)
                        .then((result) => result.value.uiAmount ?? 0.0),
                    address: token.pubkey.toString(),
                    value_usd: 0,
                })
            }
        },
    },
})
