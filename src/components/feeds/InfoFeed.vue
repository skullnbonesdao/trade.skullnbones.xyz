<template>
  <div class="flex flex-row space-x-2">
    <div class="flex flex-row space-x-1">
      <h2>BTC/USDC</h2>
      <h3>{{ tokenPriceStore.btc }}</h3>
    </div>
    <div class="flex flex-row space-x-1">
      <h2>SOL/USDC</h2>
      <h3>{{ tokenPriceStore.sol }}</h3>
    </div>
    <div class="flex flex-row space-x-1">
      <h2>ATLAS/USDC</h2>
      <h3>{{ tokenPriceStore.atlas }}</h3>
    </div>
    <div class="flex flex-row space-x-1">
      <h2>POLIS/USDC</h2>
      <h3>{{ tokenPriceStore.polis }}</h3>
    </div>
    <div class="flex w-full justify-end flex-row space-x-1">
      <i class="bi bi-speedometer"></i>
      <h3>{{ solanaNetwork.transactions_per_second.toFixed(0) }} TPS</h3>
    </div>
  </div>

</template>

<script lang="ts" setup>
import {useTokenPriceStore} from "../../stores/TokenPriceStore";
import {useSolanaNetworkStore} from "../../stores/SolanaNetworkStore";
import {onMounted} from "vue";

const tokenPriceStore = useTokenPriceStore();
const solanaNetwork = useSolanaNetworkStore();

onMounted(async () => {
  await solanaNetwork.run_tps();
})

</script>

<style scoped>

</style>