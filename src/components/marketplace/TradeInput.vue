<template>
    <div class="flex flex-col space-y-2">
        <TextBox ref="price" text="Price" type="number" />
        <TextBox ref="size" text="Size" type="number" />
        {{ price }}
        {{ useGlobalStore().user_order_params.price }}
    </div>
</template>

<script setup lang="ts">
import { ref, watch, watchEffect } from 'vue'
import TextBox from '../buttons/TextBox.vue'
import { useGlobalStore } from '../../stores/GlobalStore'

const price = ref(0.0)
const size = ref(0)

const globalStore = useGlobalStore()

watchEffect(async () => {
    price.value = globalStore.user_order_params.price
})
defineExpose({ price, size })
</script>
