<script setup>
import HelloWorld from './components/HelloWorld.vue'
import MoreDb from './components/MoreDB.vue'
import Test from "@/components/test.vue"
import Chat from "@/components/Chat.vue";
import Header from "@/components/Header.vue";
import DBLoader from "@/components/DBLoader.vue";
import {onMounted} from "vue";

onMounted(() => {
  // Force the theme on mount
  document.documentElement.setAttribute('data-theme', 'my-forest')
})
</script>

<template>
  <header>
    <Header />
  </header>

  <main>
    <Chat />
    <test />

  </main>
</template>

<style scoped>

</style>
