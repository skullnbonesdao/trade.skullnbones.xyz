export interface FTXMarketsInfo {
    name: string
    enabled: boolean
    postOnly: boolean
    priceIncrement: number
    sizeIncrement: number
    minProvideSize: number
    last: number
    bid: number
    ask: number
    price: number
    type: string
    futureType: null
    baseCurrency: string
    isEtfMarket: boolean
    quoteCurrency: string
    underlying: null
    restricted: boolean
    highLeverageFeeExempt: boolean
    largeOrderThreshold: number
    change1h: number
    change24h: number
    changeBod: number
    quoteVolume24h: number
    volumeUsd24h: number
    priceHigh24h: number
    priceLow24h: number
}
