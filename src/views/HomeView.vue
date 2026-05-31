<script setup>

import router from "@/router/index.js";
import {RouterLink} from "vue-router";
</script>

<template>

  <div class="home-buttons-container flex flex-row h-screen items-center justify-center">
    <h1>Home Page</h1>
    <p>Welcome page.</p>

    <RouterLink class="btn" to="/login"> login</RouterLink>

    <RouterLink class="btn" to='/registration'> register</RouterLink>

  </div>
</template>

<style scoped>
.home-buttons-container {
  display: flex;
  min-height: 70vh;
  max-height: max-content;
  flex-direction: column;
}
</style>