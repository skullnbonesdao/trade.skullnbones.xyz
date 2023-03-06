<template>
    <div v-if="props.text">
        <span
            class="uppercase bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300"
            >{{ props.text }}</span
        >
    </div>
</template>
<script setup lang="ts">
const props = defineProps({
    text: String || undefined,
})
</script>
