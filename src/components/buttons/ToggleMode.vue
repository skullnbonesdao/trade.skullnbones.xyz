<script setup>
import { useDark, useToggle } from '@vueuse/core'
import { useGlobalStore } from '../../stores/GlobalStore'

const globalStore = useGlobalStore()
</script>

<template>
    <div class="" @click="globalStore.toggleDark()">
        <div class="color-black i-carbon-sun dark:i-carbon-asleep dark:color-white"></div>
    </div>
</template>
