<script lang="ts" setup>
import NavBar from './components/navigation/NavBar.vue'
import FooterComponent from './components/navigation/FooterComponent.vue'
</script>

<template>
    <NavBar></NavBar>
    <RouterView></RouterView>
    <footer-component></footer-component>
</template>

<style scoped></style>