<template>
    <div v-if="props.asset_class">
        <span
            class="uppercase bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300"
            >{{ props.asset_class.toString() }}</span
        >
    </div>
</template>
<script setup lang="ts">
import { PropType } from 'vue'
import { ItemType } from '../../stores/AssetsStore'

const props = defineProps({
    asset_class: Object as PropType<ItemType>,
})
</script>
