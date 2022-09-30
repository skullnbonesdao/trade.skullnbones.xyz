<template>
  <div>
        <div class="flex order-input-group">
            <label for="price" class="w-12 flex-none flex items-center justify-center">Price</label>
            <input v-model="price" name="price" type="number" class="flex-auto"/>
        </div>
        <div class="flex order-input-group">
            <label for="size" class="w-12 flex-none flex items-center justify-center">Size</label>
            <input v-model="size" name="size" type="number" class="flex-auto"/>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const price = ref(0);
const size = ref(0);
defineExpose({ price, size });
</script>
