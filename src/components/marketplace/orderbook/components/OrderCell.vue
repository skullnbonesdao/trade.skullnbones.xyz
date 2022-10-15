<template>
    <p>{{ props.text }}</p>
    <div :class="props.color">{{ props.children }}</div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps({
    text: {
        type: String,
        default: 'RowName',
    },
    color: {
        type: String,
        required: false,
        default: 'red',
    },
    children: {
        type: Object,
        required: false,
        default: 'no child',
    },
})
</script>

<style scoped></style>
