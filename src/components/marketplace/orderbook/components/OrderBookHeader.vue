<template>
    <div
        class="flex flex-row border-b border-t border-gray-500 order-first"
        :class="reverse_order ? 'flex-row-reverse' : ''"
    >
        <p class="basis-1/3 text-left">TOTAL</p>
        <p class="basis-1/3 text-center">SIZE</p>
        <p class="basis-1/3 text-right">PRICE</p>
    </div>
</template>

<script setup lang="ts">
const props = defineProps({
    reverse_order: {
        type: Boolean,
        default: false,
    },
})
</script>

<style scoped></style>
