<template>
    <h2>Asset list</h2>
    <div>
        <p
            v-for="asset in allAssets"
            :key="asset._id"
            @click="staratlasGmStore.getOpenOrdersForAsset(asset.mint).then(() => {})"
        >
            {{ asset.name }}
        </p>
    </div>
</template>

<script lang="ts" setup>
import { useAssetsStore } from '../../stores/AssetsStore'
import { useStaratlasGmStore } from '../../stores/StaratlasGmStore'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'

const { allAssets } = storeToRefs(useAssetsStore())

const assset_selected = ref()

const staratlasGmStore = useStaratlasGmStore()

const assetsStore = useAssetsStore()
assetsStore.init()
</script>