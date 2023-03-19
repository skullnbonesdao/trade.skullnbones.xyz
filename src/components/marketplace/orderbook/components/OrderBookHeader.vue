<template>
    <div class="flex flex-row border-b border-t border-gray-500" :class="reverse_order ? 'flex-row-reverse' : ''">
        <p class="basis-1/2" :class="reverse_order ? 'text-right' : 'text-left'">TOTAL</p>
        <!--        <p class="basis-1/3" :class="reverse_order ? 'text-right' : 'text-left'">SIZE</p>-->
        <p class="basis-1/2" :class="reverse_order ? 'text-left' : 'text-right'">PRICE</p>
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
