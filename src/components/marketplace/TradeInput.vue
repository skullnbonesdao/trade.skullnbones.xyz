<template>
  <div>
        <div class="flex order-input-group">
            <label for="price" class="w-10 flex-none flex items-center justify-center">Price</label>
            <input v-model="values.price" name="price" type="number" class="flex-auto"/>
        </div>
        <div class="flex order-input-group">
            <label for="size" class="w-10 flex-none flex items-center justify-center">Size</label>
            <input v-model="values.size" name="size" type="number" class="flex-auto"/>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const values = ref({
    price: 0,
    size: 0,
});
defineExpose({ values });
</script>

<style lang="scss">
    .order-input-group {
        margin-bottom: 8px;
        > * {
            background-color: rgba(255, 255, 255, 0.04);
            border: 1px solid #434343;
        }
    }
    .order-input-group > :first-child {
        border-right: 0;
        border-top-left-radius: 2px;
        border-bottom-left-radius: 2px;
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
    }
    .order-input-group > :not(:first-child) {
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
        border-top-right-radius: 2px;
        border-bottom-right-radius: 2px;
    }
</style>