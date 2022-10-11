<script setup>
import { useDark, useToggle } from '@vueuse/core'
import { useGlobalStore } from '../../stores/GlobalStore'

const globalStore = useGlobalStore()
</script>

<template>
    <div class="flex hover:op80 justify-center m2 op30 text-2xl" @click="globalStore.toggleDdark()">
        <div class="color-black i-carbon-sun dark:i-carbon-asleep dark:color-white"></div>
    </div>
</template>
