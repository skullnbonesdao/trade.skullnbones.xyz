<template>
    <div class="p-3 bg-gray-100 dark:bg-gray-800 shadow-xl rounded-box">
        <div class="app">
            <t-v-chart-container />
        </div>
    </div>
</template>

<script lang="ts" setup>
import TVChartContainer from './TVChartContainer.vue'

//const version:  version{}
</script>

<style lang="scss" scoped>
.app {
    text-align: center;

    &__header {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 10px 0;
        background-color: #222;
        color: #fff;
    }

    &__title {
        display: block;
        font-size: 1.5em;
    }
}
</style>