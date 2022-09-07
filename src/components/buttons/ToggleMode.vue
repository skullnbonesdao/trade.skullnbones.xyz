<template>
  <button
    class="btn btn-secondary btn-circle"
    data-act-class="ACTIVECLASS"
    data-toggle-theme="business,corporate"
    @click="theme_change"
  >
    <i v-if="theme === 'corporate'" class="bi bi-sun"></i>
    <i v-if="theme === 'business'" class="bi bi-moon"></i>
  </button>
  {{ theme }}
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";

const theme = ref();

onMounted(() => {
  if (localStorage.getItem("theme")) {
    theme.value = localStorage.getItem("theme");
  } else {
    theme.value = "corporate";
  }
});

async function theme_change() {
  theme.value = localStorage.getItem("theme");
}
</script>