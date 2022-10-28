import { defineStore } from 'pinia'
import { NFTS_URL } from '../typescript/constants/staratlas'

type AssetSlot = {
    type: string
    size: string
    quantity: number
}

type AssetSlots = {
    crewSlots: AssetSlot[]
    componentSlots: AssetSlot[]
    moduleSlots: AssetSlot[]
}

type AssetMedia = {
    qrInstagram: string
    qrFacebook: string
    sketchfab: string
    audio: string
    thumbnailUrl: string
    gallery: string[]
}

type AssetMsrp = {
    value: number
    currencySymbol: string
}

type TradeSettings = {
    saleTime: number
    msrp: AssetMsrp
    vwap: number
}

type AssetMarket = {
    _id: string
    id: string
    quotePair: string
    serumProgramI: string
}

type AssetAirdrops = {
    _id: string
    id: string
    supply: number
}

type AssetPrimarySales = {
    _id: string
    listTimestamp: number
    supply: number
    price: number
    isMinted: boolean
    isListed: boolean
    mintTimestamp: number
    id: string
}

type AssetCollection = {
    name: string
    family: string
}

type Asset = {
    _id: string
    deactivated: boolean
    description: string
    image: string
    attributes: any
    slots: AssetSlots
    symbol: string
    media: AssetMedia
    name: string
    createdAt: string
    updatedAt: string
    mint: string
    markets: AssetMarket[]
    airdrops: AssetAirdrops[]
    primarySales: AssetPrimarySales[]
    collection: AssetCollection
}

export const useAssetsStore = defineStore({
    id: 'assetsStore',
    state: () => {
        return {
            allAssets: [] as Asset[],
        }
    },

    actions: {
        async init() {
            this.allAssets = await fetch(NFTS_URL).then((response) => response.json())
        },
    },
})
