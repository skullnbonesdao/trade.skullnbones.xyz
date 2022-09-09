<template>
  <div class="">
    <InfoFeed />
    <div class="grid grid-cols-4 gap-4">
      <div><TradingViewChart /></div>
      <div><Orderbook /></div>
      <div><OrderSetter /></div>
      <div><AssetsList /></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import InfoFeed from "../components/feeds/InfoFeed.vue";
import Orderbook from "../components/trading/Orderbook.vue";
import OrderSetter from "../components/trading/OrderSetter.vue";
import TradingViewChart from "../components/charts/tradingview/TradingViewChart.vue";
import AssetsList from "../components/marketplace/AssetsList.vue";
</script>