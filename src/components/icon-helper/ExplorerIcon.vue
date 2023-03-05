<script setup lang="ts">
import { PropType } from 'vue'
import { I_EXPLORER } from '../../typescript/constants/explorer'
import { EXPLORER } from '../../typescript/constants/explorer'

const props = defineProps({
    explorer: Object as PropType<I_EXPLORER>,
    signature: String,
})
</script>

<template>
    <a :href="EXPLORER.find((e) => e.type === explorer?.type)?.url + '/tx/' + props.signature">
        <img class="rounded-md" :src="props.explorer?.image_path" alt="explorer_image" />
    </a>
</template>
