<script setup>
import { useDark, useToggle } from '@vueuse/core'

const isDark = useDark()
const toggleDark = useToggle(isDark)
</script>

<template>
    <div class="flex hover:op80 justify-center m2 op30 text-2xl" @click="toggleDark(!isDark)">
        <div class="color-black i-carbon-sun dark:i-carbon-asleep dark:color-white"></div>
    </div>
</template>