<script setup>
import { useDark, useToggle } from '@vueuse/core'

const isDark = useDark()
const toggleDark = useToggle(isDark)
</script>

<template>
    <button class="px-4 py-2 text-white bg-gray-600 dark:bg-purple-700" @click="toggleDark()">Dark Toggle</button>
</template>