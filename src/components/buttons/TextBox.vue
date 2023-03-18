<template>
    <div class="flex items-center">
        <span
            class="border px-2 w-24 uppercase bg-gray-300 dark:bg-gray-800 dark:text-gray-400 border-r border-black"
            >{{ props.text }}</span
        >
        <input
            v-model="text_box_value"
            name="text_box_value"
            :type="props.type"
            class="flex-grow border px-2 dark:bg-gray-700 dark:text-gray-400"
        />
    </div>
</template>

<script setup lang="ts">
import { defineProps, ref } from 'vue'

const text_box_value = ref()

defineExpose({ text_box_value })

const props = defineProps({
    type: {
        type: String,
        default: 'text',
    },
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
