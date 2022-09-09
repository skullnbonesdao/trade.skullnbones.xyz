<template>
  <div class="">
    <InfoFeed />
    <div class="flex">
      <div class="basis-1/2">
        <trading-view-chart />
      </div>
      <div class="basis-1/2 flex">
        <orderbook />
        <order-setter />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import InfoFeed from "../components/feeds/InfoFeed.vue";
import Orderbook from "../components/trading/Orderbook.vue";
import OrderSetter from "../components/trading/OrderSetter.vue";
import TradingViewChart from "../components/charts/tradingview/TradingViewChart.vue";
</script>