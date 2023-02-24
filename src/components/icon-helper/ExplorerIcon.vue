<script setup lang="ts">
import { PropType } from 'vue'
import { I_EXPLORER } from '../../typescript/constants/explorer'

const props = defineProps({
    explorer: Object as PropType<I_EXPLORER>,
})
</script>

<template>
    <img class="rounded-md" :src="props.explorer?.image_path" alt="explorer_image" />
</template>
