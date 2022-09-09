
<template>
  <h1>Asset list</h1>
  <div>
    <p v-for="asset in allAssets" :key="asset._id">
      {{ asset.name }}
    </p>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from "vue";
  import {useAssetsStore} from "../../stores/AssetsStore";
  import { storeToRefs } from 'pinia'
  const { allAssets } = storeToRefs(useAssetsStore())

  const assetsStore = useAssetsStore();
  assetsStore.init();

  const filters = ref({
    name: { value: "", keys: ["name", "symbol"] },
  });
</script>

