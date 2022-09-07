<script lang="ts" setup>
import NavBar from "./components/navigation/NavBar.vue";
import {useTokenPriceStore} from "./stores/TokenPriceStore";
import {useSolanaNetworkStore} from "./stores/SolanaNetworkStore";

const tokenPriceWebsocket = useTokenPriceStore();
tokenPriceWebsocket.init();

const solanaNetworkWebsocket = useSolanaNetworkStore();
solanaNetworkWebsocket.init();

</script>

<template>
  <NavBar></NavBar>
  <RouterView></RouterView>
</template>


<style scoped></style>
