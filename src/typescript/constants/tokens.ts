import { PublicKey } from '@solana/web3.js'

export enum E_CURRENCIES {
    USDC,
    ATLAS,
    POLIS,
    SOL,
}

export const CURRENCIES = [
    {
        type: E_CURRENCIES.USDC,
        name: 'USDC',
        mint: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
    },
    {
        type: E_CURRENCIES.USDC,
        name: 'ATLAS',
        mint: 'ATLASXmbPQxBUYbxPsV97usA3fPQYEqzQBUHgiFCUsXx',
    },
]
