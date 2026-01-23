<script setup>
import HelloWorld from './components/HelloWorld.vue'
import MoreDb from './components/MoreDB.vue'
import Test from "@/components/test.vue"
import Chat from "@/components/Chat.vue";
import Header from "@/components/Header.vue";
import DBLoader from "@/components/DBLoader.vue";
import { RouterLink, RouterView } from 'vue-router'

import {onMounted} from "vue";

onMounted(() => {
  // Force the theme on mount
  document.documentElement.setAttribute('data-theme', 'my-forest')
})
</script>

<template>
  <header>
    <nav>
      <!-- Use 'to' instead of 'href' -->
      <RouterLink to="/">Home</RouterLink> |
      <RouterLink to="/about">About</RouterLink>
      <RouterLink to="/settings">Settings</RouterLink>
    </nav>
    <Header />
  </header>

  <main>
    <router-view  />
    <Chat />
    <test />

  </main>
</template>

<style scoped>

</style>
