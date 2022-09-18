<script lang="ts" setup>
import NavBar from './components/navigation/NavBar.vue'
import FooterComponent from './components/navigation/FooterComponent.vue'
</script>

<template>
    <NavBar class="bg-gray-200 dark:bg-gray-900"></NavBar>
    <RouterView class="bg-gray-200 dark:bg-gray-900"></RouterView>
    <footer-component class="bg-gray-200 dark:bg-gray-900"></footer-component>
</template>

<style scoped></style>