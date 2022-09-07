import {defineStore} from "pinia";
import {SERUMAPIWEBSOCKET} from "../typescript/constants/serum";
import {Convert} from "../typescript/websockets/MarketLevel1";

export const useTokenPriceStore = defineStore({
    id: "tokenPriceStore",
    state: () => ({
        ws: {} as WebSocket,
        btc: "0.0",
        sol: "0.0",
        atlas: "0.0",
        polis: "0.0",
    }),

    actions: {
        init() {
            this.ws = new WebSocket(SERUMAPIWEBSOCKET);
            const sub_btc_L1 = {
                op: "subscribe",
                channel: "level1",
                markets: ["BTC/USDC"],
            };
            const sub_sol_L1 = {
                op: "subscribe",
                channel: "level1",
                markets: ["SOL/USDC"],
            };
            const sub_polis_L1 = {
                op: "subscribe",
                channel: "level1",
                markets: ["POLIS/USDC"],
            };
            const sub_atlas_L1 = {
                op: "subscribe",
                channel: "level1",
                markets: ["ATLAS/USDC"],
            };

            this.ws.onopen = () => {
                this.ws.send(JSON.stringify(sub_btc_L1));
                this.ws.send(JSON.stringify(sub_sol_L1));
                this.ws.send(JSON.stringify(sub_polis_L1));
                this.ws.send(JSON.stringify(sub_atlas_L1));
                console.info("Created MarketWebsockets");
            };

            this.ws.onmessage = (event: MessageEvent) => {
                const new_market_data = Convert.toMarketLevel1(event.data);
                if (new_market_data.type === "quote") {
                    switch (new_market_data.market) {
                        case "BTC/USDC":
                            this.btc = new_market_data.bestBid[0];
                            console.info("{ws-message} BTC/USDC");
                            break;
                        case "SOL/USDC":
                            this.sol = new_market_data.bestBid[0];
                            console.info("{ws-message} SOL/USDC");
                            break;
                        case "ATLAS/USDC":
                            this.atlas = new_market_data.bestBid[0];
                            console.info("{ws-message} ATLAS/USDC");
                            break;
                        case "POLIS/USDC":
                            this.polis = new_market_data.bestBid[0];
                            console.info("{ws-message} POLIS/USDC");
                            break;
                    }


                }
            };
        },
    },
});
