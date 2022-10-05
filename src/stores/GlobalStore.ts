// stores/counter.js
import { defineStore } from 'pinia'
import { SERUMRPC } from '../typescript/constants/solana'
import { Connection, PublicKey, AccountInfo, ParsedAccountData } from '@solana/web3.js'
import { TOKEN_PROGRAM } from '../typescript/constants/staratlas'
import { TOKEN_ATLAS, TOKEN_USDC } from '../typescript/constants/tokens'

export enum Side {
    SELL = 'sell',
    BUY = 'buy',
}

export const useGlobalStore = defineStore('globalStore', {
    state: () => {
        return {
            symbol: 'FOODATLAS',
            selectedCurrency: 'USDC',
            side: {} as Side,
            connection: new Connection(SERUMRPC),
            userTokens: [
                {
                    name: "ATLAS",
                    mint: TOKEN_ATLAS.toString(),
                    data: {
                        pubkey: {} as PublicKey,
                        account: {} as AccountInfo<ParsedAccountData>,
                    },
                },
                {
                    name: "USDC",
                    mint: TOKEN_USDC.toString(),
                    data: {
                        pubkey: {} as PublicKey,
                        account: {} as AccountInfo<ParsedAccountData>,
                    },
                },
            ],
        }
    },
    actions: {
        init() {
            this.side = Side.BUY
        },
        async refreshAccountInfo(accountPublicKey: PublicKey) {
            if (accountPublicKey !== null ) {
                await this.connection.getParsedTokenAccountsByOwner(
                    accountPublicKey,
                    { programId: TOKEN_PROGRAM },
                    "confirmed"
                ).then((response) => {
                    const data = response.value.filter(
                        (value) =>
                        !!value?.account?.data?.parsed?.info?.tokenAmount?.uiAmount
                    )
                    this.userTokens.forEach(userToken => {
                        const searchedToken = data.find((el) => el.account.data.parsed.info.mint === userToken.mint);
                        if (searchedToken !== undefined) userToken.data = searchedToken;
                    });
                })
            }
        },
    },
})
