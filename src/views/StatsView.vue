<template>
    <div class="p-2">
        <div class="px-4 py-2 flex flex-col justify-center bg-gray-200 dark:bg-gray-800 shadow-xl rounded-box">
            <div class="flex justify-center">
                <h1 class="text-4xl">Stats</h1>
            </div>
        </div>
        {{ api_atlas }}
        {{ api_polis }}
    </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'

const api_atlas = ref()
const api_polis = ref()

onMounted(() => {
    fetch('https://galaxy.staratlas.com/tokens/atlas')
        .then((res) => res.json())
        .then((json) => (api_atlas.value = json))

    fetch('https://galaxy.staratlas.com/tokens/polis')
        .then((res) => res.json())
        .then((json) => (api_polis.value = json))
})
</script>