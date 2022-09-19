<template>
    <h2>Order Setter</h2>
    {{ publicKey }}
    <ul class="nav nav-tabs flex flex-col md:flex-row flex-wrap list-none border-b-0 pl-0 mb-4" id="tabs-tabFill" role="tablist">
        <li class="nav-item flex-auto text-center" role="presentation">
            <a href="#tabs-buyFill" class="
            nav-link
            w-full
            block
            font-medium
            text-xs
            leading-tight
            uppercase
            border-x-0 border-t-0 border-transparent
            px-6
            py-3
            my-2
            hover:border-transparent hover:bg-gray-100
            focus:border-transparent
            green
            active
            " id="tabs-buy-tabFill" data-bs-toggle="pill" data-bs-target="#tabs-buyFill" role="tab"
            aria-controls="tabs-buyFill" aria-selected="true">Buy</a>
        </li>
        <li class="nav-item flex-auto text-center" role="presentation">
            <a href="#tabs-sellFill" class="
            nav-link
            w-full
            block
            font-medium
            text-xs
            leading-tight
            uppercase
            border-x-0 border-t-0 border-transparent
            px-6
            py-3
            my-2
            hover:border-transparent hover:bg-gray-100
            focus:border-transparent
            red
            " id="tabs-sell-tabFill" data-bs-toggle="pill" data-bs-target="#tabs-sellFill" role="tab"
            aria-controls="tabs-sellFill" aria-selected="false">Sell</a>
        </li>
    </ul>
    <div class="tab-content" id="tabs-tabContentFill">
        <div class="tab-pane fade show active" id="tabs-buyFill" role="tabpanel" aria-labelledby="tabs-buy-tabFill">
            <TradeInput @price-change="onBuyPriceChange" @size-change="onBuySizeChange"/>
        </div>
        <div class="tab-pane fade" id="tabs-sellFill" role="tabpanel" aria-labelledby="tabs-profile-tabFill">
            <TradeInput @price-change="onSellPriceChange" @size-change="onSellSizeChange"/>
        </div>
    </div>
</template>

<style lang="scss">
    .nav-tabs .nav-item .nav-link{
        color: inherit;
        border-radius: 4px;
    }
    .nav-tabs .nav-link.green.active {
        background: rgb(2, 191, 118);
        border-color: rgb(2, 191, 118);
    }
    .nav-tabs .nav-link.red.active {
        background: rgb(242, 59, 105);
        border-color: rgb(242, 59, 105);
    }
    .order-input-group {
        margin-bottom: 8px;
        > * {
            background-color: rgba(255, 255, 255, 0.04);
            border: 1px solid #434343;
        }
    }
    .order-input-group > :first-child {
        border-right: 0;
        border-top-left-radius: 2px;
        border-bottom-left-radius: 2px;
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
    }
    .order-input-group > :not(:first-child) {
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
        border-top-right-radius: 2px;
        border-bottom-right-radius: 2px;
    }
</style>

<script lang="ts" setup>
import { useWallet } from 'solana-wallets-vue'
import 'tw-elements';
import  TradeInput from './TradeInput.vue'
const { publicKey, sendTransaction } = useWallet();

const onBuyPriceChange = (price: number) => {
    console.log("buy price", price)
}

const onBuySizeChange = (size: number) => {
    console.log("buy size", size)
}

const onSellPriceChange = (price: number) => {
    console.log("sell price", price)
}

const onSellSizeChange = (size: number) => {
    console.log("sell size", size)
}


</script>
