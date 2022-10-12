<template>
    <h2>Asset list</h2>
    <div>
        <p v-for="asset in allAssets" :key="asset._id" @click="onAssetClick(asset.mint)">
            {{ asset.name }}
        </p>
    </div>
</template>

<script lang="ts" setup>
import { useAssetsStore } from '../../stores/AssetsStore'
import { useStaratlasGmStore } from '../../stores/StaratlasGmStore'
import { storeToRefs } from 'pinia'

const { allAssets } = storeToRefs(useAssetsStore())

const staratlasGmStore = useStaratlasGmStore()
const assetsStore = useAssetsStore()
assetsStore.init()

const onAssetClick = (assetMint: string) => {
    // staratlasGmStore.getOpenOrdersForAsset(assetMint).then(() => {});

    console.log('NOT-IMPLEMENTED')
    //assetsStore.setCurrentAsset(assetMint);
}
</script>
