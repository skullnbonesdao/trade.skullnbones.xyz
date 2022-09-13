<template>
  <h1>Orderbook</h1>
  <div>
    <select
      v-model="currency"
    >
      <option>ATLAS</option>
      <option>USDC</option>
    </select>
    <div class="order-type-container">
      <p>Sell orders:</p>
      <p v-for="order in orders.sellOrders" :key="order.id">
        {{ order.uiPrice }}
      </p>
    </div>
    <div class="order-type-container">
      <p>Buy orders:</p>
      <p v-for="order in orders.buyOrders" :key="order.id">
        {{ order.uiPrice }}
      </p>
    </div>
    
  </div>

  
</template>

<script lang="ts" setup>
  import { ref, watch } from "vue";
  import {useStaratlasGmStore} from "../../stores/StaratlasGmStore";
  import { storeToRefs } from 'pinia'
  const { atlasOrders, usdcOrders } = storeToRefs(useStaratlasGmStore())

  const currency = ref("ATLAS");
  const orders = ref(currency.value === "ATLAS" ? atlasOrders : usdcOrders)

  watch(
    () => currency.value,
    (value) => {
      console.log("value",value)
      orders.value = currency.value === "ATLAS" ? atlasOrders.value : usdcOrders.value
    }
  );

</script>

<style>
  .order-type-container {
    border: 1px solid white;
  }
</style>
