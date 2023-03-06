<template>
    <div>
        <span
            v-if="props.asset_class === Rarity.Uncommon"
            class="rarity bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
            >Uncommon</span
        >
        <span
            v-if="props.asset_class === Rarity.Common"
            class="rarity bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
            >Common</span
        >
        <span
            v-if="props.asset_class === Rarity.Rare"
            class="rarity bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
            >Rare</span
        >
        <span
            v-if="props.asset_class === Rarity.Epic"
            class="rarity bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
            >Epic</span
        >
        <span
            v-if="props.asset_class === Rarity.Legendary"
            class="rarity bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
            >Legendary</span
        >
        <span
            v-if="props.asset_class === Rarity.Anomaly"
            class="rarity bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300"
            >Anomaly</span
        >
    </div>
</template>
<script setup lang="ts">
import { PropType } from 'vue'
import { Rarity } from '../../stores/AssetsStore'

const props = defineProps({
    asset_class: Object as PropType<Rarity>,
})
</script>

<style scoped>
.rarity {
    @apply text-xs font-medium mr-2 px-2.5 py-0.5 rounded d uppercase;
}
</style>
