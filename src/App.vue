<script lang="ts" setup>
import NavBar from './components/navigation/NavBar.vue'
import FooterComponent from './components/navigation/FooterComponent.vue'
</script>

<template>
    <div class="flex flex-col h-screen justify-between bg-gray-200 dark:bg-gray-900">
        <NavBar class=" bg-gray-200 dark:bg-gray-900"></NavBar>
        <RouterView class=" bg-gray-200 dark:bg-gray-900"></RouterView>
        <footer-component class="bg-gray-200 dark:bg-gray-900"></footer-component>
    </div>
</template>

<style scoped></style>