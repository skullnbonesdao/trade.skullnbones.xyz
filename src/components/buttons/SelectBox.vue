<template>
    <div class="text-md flex w-full">
        <span
            class="flex w-32 border p-2 uppercase bg-gray-300 dark:bg-gray-800 dark:text-gray-400 border-r border-black"
            >{{ props.text }}</span
        >
        <select
            @click="$emit('selected', selected)"
            class="flex w-full border p-2 dark:bg-gray-700 dark:text-gray-400"
            v-model="selected"
        >
            <option v-for="(option, idx) in props.options" :key="idx" :value="option">
                {{ option }}
            </option>
        </select>
    </div>
</template>

<script setup lang="ts">
import { defineProps, ref } from 'vue'

const props = defineProps({
    text_width: String,
    selected_in: String,
    text: {
        type: String,
        default: 'notext',
    },
    options: {
        type: Array,
        default: ['0', '1', '2'],
    },
})

const selected = ref(props.selected_in)
</script>

<style scoped></style>
