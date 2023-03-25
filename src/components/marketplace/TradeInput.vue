<template>
    <div class="flex flex-col space-y-2">
        <TextBox ref="price" text="Price" type="number" />
        <TextBox ref="size" text="Size" type="number" />
    </div>
</template>

<script setup lang="ts">
import { ref, watch, watchEffect } from 'vue'
import TextBox from '../buttons/TextBox.vue'
import { useGlobalStore } from '../../stores/GlobalStore'

const price = ref(0.0)
const size = ref(0)

defineExpose({ price, size })
</script>
