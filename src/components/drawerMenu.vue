<script setup>

import {RouterLink} from "vue-router";
</script>

<template>
  <div class="drawer">
    <input id="menu" type="checkbox" class="drawer-toggle" />
    <div class="drawer-content">
      <!-- Page content here -->

      <label for="menu" class="btn btn-ghost drawer-button">Menu</label>
    </div>
    <div class="drawer-side">
      <label for="menu" aria-label="close sidebar" class="drawer-overlay"></label>
      <ul class="menu min-h-full bg-base-200 bg-opacity-1 w-80 p-4">
        <!-- Sidebar content here -->
        <RouterLink to="/about">About</RouterLink>
        <RouterLink to="/settings">Settings</RouterLink>
        <RouterLink :to="{name:'rooms'}">Rooms</RouterLink>
      </ul>
    </div>
  </div>
</template>

<style scoped>

</style>