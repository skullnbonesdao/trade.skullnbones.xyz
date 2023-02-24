import { PublicKey } from '@solana/web3.js'

export enum E_CURRENCIES {
    USDC,
    ATLAS,
    POLIS,
    SOL,
}

export interface I_CURRENCY {
    type: E_CURRENCIES
    name: string
    mint: string
    char: string
    image_path: string
}

export const CURRENCIES: Array<I_CURRENCY> = [
    {
        type: E_CURRENCIES.USDC,
        name: 'USDC',
        mint: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
        char: '$',
        image_path: 'tokens/usdc.png',
    },
    {
        type: E_CURRENCIES.ATLAS,
        name: 'ATLAS',
        mint: 'ATLASXmbPQxBUYbxPsV97usA3fPQYEqzQBUHgiFCUsXx',
        char: 'A',
        image_path: 'tokens/atlas.png',
    },
]
