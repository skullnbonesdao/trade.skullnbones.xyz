<template>
  <div class="app">
    <header class="app__header">
      <h1 v-once class="app__title">
        TradingView Charting Library and Vue.js Integration Example
        {{ version }}
      </h1>
    </header>
    <t-v-chart-container />
  </div>
</template>

<script lang="ts" setup>
import { version } from "../../../assets/charting_library";
import TVChartContainer from "./TVChartContainer.vue";

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