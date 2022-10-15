export type Orientation = 'VERTICAL' | 'HORIZONTAL'

export type ProductId = 'PI_XBTUSD' | 'PI_ETHUSD'

export type SocketState = 'DISCONNECTED' | 'CONNECTING' | 'CONNECTED'

export type Delta = [number, number]

export type DeltaType = 'asks' | 'bids'

export type SocketMessage = {
    bids: Delta[]
    asks: Delta[]
}

export type State = {
    bids: Delta[]
    asks: Delta[]
    productId: ProductId
    socketState: SocketState
}
