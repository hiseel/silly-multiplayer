<script setup>
import HelloWorld from './components/HelloWorld.vue'
import MoreDb from './components/MoreDB.vue'
import Test from "@/components/test.vue"
import Chat from "@/components/Chat.vue";
import Header from "@/components/Header.vue";
import DBLoader from "@/components/DBLoader.vue";
import { RouterLink, RouterView } from 'vue-router'

import {onMounted} from "vue";
import testView from "@/views/testView.vue";
import RoomView from "@/views/roomView.vue";

onMounted(() => {
  // Force the theme on mount
  document.documentElement.setAttribute('data-theme', 'luxury')
})
</script>

<template>
  <header>
    <nav>
      <RouterLink to="/about">About</RouterLink>
      <RouterLink to="/settings">Settings</RouterLink>
    </nav>
    <Header />
  </header>

  <main>
<!--    <router-view  />-->

    <Chat />
    <testView />

  </main>

</template>

<style scoped>

</style>
