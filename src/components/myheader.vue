<script setup>

import DrawerMenu from "@/components/drawerMenu.vue";
import {RouterLink} from "vue-router";
</script>

<template>
  <drawer-menu>
    <nav>
      <RouterLink to="/about">About</RouterLink>
      <RouterLink to="/settings">Settings</RouterLink>
      <RouterLink :to="{name:'rooms'}">Rooms</RouterLink>
    </nav>
    <DrawerMenu />
  </drawer-menu>
</template>

<style scoped>

</style>