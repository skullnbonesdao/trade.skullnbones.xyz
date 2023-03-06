import { PublicKey } from '@solana/web3.js'

export enum E_CURRENCIES {
    USDC,
    ATLAS,
    POLIS,
    SOL,
    BTC,
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
        image_path: 'tokens/USDC.webp',
    },
    {
        type: E_CURRENCIES.ATLAS,
        name: 'ATLAS',
        mint: 'ATLASXmbPQxBUYbxPsV97usA3fPQYEqzQBUHgiFCUsXx',
        char: 'A',
        image_path: 'tokens/ATLAS.webp',
    },
    {
        type: E_CURRENCIES.POLIS,
        name: 'POLIS',
        mint: 'poLisWXnNRwC6oBu1vHiuKQzFjGL4XDSu4g9qjz9qVk',
        char: 'P',
        image_path: 'tokens/POLIS.webp',
    },
    {
        type: E_CURRENCIES.BTC,
        name: 'BTC',
        mint: '9n4nbM75f5Ui33ZbPYXn59EwSgE8CGsHtAeTH5YFeJ9E',
        char: 'b',
        image_path: 'tokens/BTC.webp',
    },
    {
        type: E_CURRENCIES.SOL,
        name: 'SOL',
        mint: 'So11111111111111111111111111111111111111112',
        char: 'S',
        image_path: 'tokens/SOL.webp',
    },
]
