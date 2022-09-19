<template>
  <div>
        <div class="flex order-input-group">
            <label for="price" class="w-10 flex-none flex items-center justify-center">Price</label>
            <input v-model="price" name="price" type="number" class="flex-auto"/>
        </div>
        <div class="flex order-input-group">
            <label for="size" class="w-10 flex-none flex items-center justify-center">Size</label>
            <input v-model="size" name="size" type="number" class="flex-auto"/>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { computed } from 'vue'

const emit = defineEmits<{
  (e: 'priceChange', price: number): void
  (e: 'sizeChange', size: number): void
}>()

interface Props {
  price?: number
  size?: number
}

const props = withDefaults(defineProps<Props>(), {
    price: 0,
    size: 0
})

const price = computed({
  get () {
    return props.price
  },

  set (value) {
    return emit('priceChange', value)
  }
})

const size = computed({
  get () {
    return props.size
  },

  set (value) {
    return emit('sizeChange', value)
  }
})

</script>