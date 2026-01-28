<script setup>

import router from "@/router/index.js";
</script>

<template>

  <div class="home-buttons-container flex flex-row h-screen items-center justify-center">
    <h1>Home Page</h1>
    <p>Welcome page.</p>

    <button class="btn"
            @click="router.push('/registration')"
    >Register</button>
    <button class="btn"
            @click="router.push('/login')"
    >login</button>
  </div>
</template>

<style scoped>
.home-buttons-container {
  display: flex;
  min-height: 70vh;
  flex-direction: column;
}
</style>