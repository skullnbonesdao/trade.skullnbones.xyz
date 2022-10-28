<template>
    <div>
        <div>{{ useGlobalStore().symbol }}</div>
    </div>

    <h1>Asset ingo</h1>
</template>

<script setup lang="ts">
import { useGlobalStore } from '../../stores/GlobalStore'
</script>

<style scoped></style>
