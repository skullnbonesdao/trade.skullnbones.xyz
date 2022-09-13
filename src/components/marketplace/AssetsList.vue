
<template>
  <h1>Asset list</h1>
  <div>
    <p v-for="asset in allAssets" :key="asset._id" @click="staratlasGmStore.getOpenOrdersForAsset(asset.mint)">
      {{ asset.name }}
    </p>
  </div>
</template>

<script lang="ts" setup>
  import {useAssetsStore} from "../../stores/AssetsStore";
  import {useStaratlasGmStore} from "../../stores/StaratlasGmStore";
  import { storeToRefs } from 'pinia'
  const { allAssets } = storeToRefs(useAssetsStore())

  const staratlasGmStore = useStaratlasGmStore();

  const assetsStore = useAssetsStore();
  assetsStore.init();
</script>

