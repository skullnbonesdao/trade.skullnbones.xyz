<template>
<div>
    <div class="container mx-auto">
      <ul class="nav nav-tabs flex flex-col md:flex-row flex-wrap list-none border-b-0 pl-0 mb-4">
        <li class="nav-item flex-auto text-center">
          <button
            @click="currentTab(1)"
            v-bind:class="tab === 1 ? 'active' : ''"
            class="nav-link
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
            green"
          >
            Buy
          </button>
        </li>
        <li class="nav-item flex-auto text-center">
          <button
            @click="currentTab(2)"
            v-bind:class="tab === 2 ? 'active' : ''"
            class="nav-link
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
            red"
          >
            Sell
          </button>
        </li>
      </ul>
      <div class="p-3 mt-6 text-center">
        <div v-if="tab === 1">
            <TradeInput @price-change="onBuyPriceChange" @size-change="onBuySizeChange"/>
        </div>
        <div v-if="tab === 2">
            <TradeInput @price-change="onSellPriceChange" @size-change="onSellSizeChange"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import TradeInput from './TradeInput.vue'

const tab = ref(1);
const currentTab = (tabNumber: number) => (tab.value = tabNumber);

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
</style>