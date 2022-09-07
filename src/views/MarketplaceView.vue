<template>
  <div class="">
    <InfoFeed/>
    <div class="flex">
      <div class="basis-1/2">
        <SimplePriceHistory/>
      </div>
      <div class="basis-1/2 flex">
        <Orderbook/>
        <OrderSetter/>
      </div>
    </div>

  </div>
</template>

<script lang="ts" setup>
import SimplePriceHistory from "../components/charts/apexcharts/SimplePriceHistory.vue";
import InfoFeed from "../components/feeds/InfoFeed.vue";
import Orderbook from "../components/trading/Orderbook.vue";
import OrderSetter from "../components/trading/OrderSetter.vue";</script>