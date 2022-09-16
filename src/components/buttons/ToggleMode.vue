<template>
    <div class="btn-primary btn-circle" data-act-class="ACTIVECLASS" data-toggle-theme="business,corporate">
        <i v-if="theme === 'corporate'" class="bi bi-sun"></i>
        <i v-if="theme === 'business'" class="bi bi-moon"></i>
    </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'

const theme = ref()

onMounted(() => {
    if (localStorage.getItem('theme')) {
        theme.value = localStorage.getItem('theme')
    } else {
        theme.value = 'corporate'
    }
})

function theme_change() {
    theme.value = localStorage.getItem('theme')
}
</script>