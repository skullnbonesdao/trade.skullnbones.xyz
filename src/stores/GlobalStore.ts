// stores/counter.js
import { defineStore } from 'pinia'
import { SERUMRPC } from '../typescript/constants/solana'
import { Connection, PublicKey, AccountInfo, ParsedAccountData } from '@solana/web3.js'
import { TOKEN_PROGRAM } from '../typescript/constants/staratlas'
import { Currencies, TOKEN_ATLAS, TOKEN_USDC } from '../typescript/constants/tokens'
import { useDark, useLocalStorage, useToggle } from '@vueuse/core'
import { useAssetsStore } from './AssetsStore'
import { useStaratlasGmStore } from './StaratlasGmStore'
import { RPCEndpoint } from '../typescript/interfaces/RPCEndpoint'

export const endpoints_list: RPCEndpoint[] = [
    { name: 'portal', url: 'https://solana-mainnet.gateway.pokt.network/v1/lb/dd52c2c88c49502ea894b3bb' },
    { name: 'solana-main', url: 'https://api.mainnet-beta.solana.com' },
    { name: 'solana-serum', url: 'https://solana-api.projectserum.com' },
]

export interface TradeAsset {
    name: string
    mint_asset: PublicKey
    mint_pair: PublicKey
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
            symbol: {
                name: 'FOODATLAS',
                mint_asset: new PublicKey('foodQJAztMzX1DKpLaiounNe2BDMds5RNuPC6jsNrDG'),
                mint_pair: new PublicKey('ATLASXmbPQxBUYbxPsV97usA3fPQYEqzQBUHgiFCUsXx'),
            } as TradeAsset,

            side: {} as Side,
            connection: new Connection(SERUMRPC),
            userTokens: [
                {
                    name: 'ATLAS',
                    mint: TOKEN_ATLAS.toString(),
                    data: {
                        pubkey: {} as PublicKey,
                        account: {} as AccountInfo<ParsedAccountData>,
                    },
                },
                {
                    name: 'USDC',
                    mint: TOKEN_USDC.toString(),
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
            this.symbol.mint_asset = new PublicKey(
                useAssetsStore().allAssets.find((asset) => name.includes(asset.symbol))?.mint ?? ''
            )
            this.symbol.mint_pair = new PublicKey(
                Currencies.find((currency) => name.includes(currency.name))?.mint ?? ''
            )
            useStaratlasGmStore().getOpenOrdersForAsset(this.symbol.mint_asset.toString())
            this.symbol.name = name
        },
    },
})
