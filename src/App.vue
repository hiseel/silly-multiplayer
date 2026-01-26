<script setup>
import HelloWorld from './components/HelloWorld.vue'
import MoreDb from './components/MoreDB.vue'
import Test from "@/components/test.vue"
import Chat from "@/components/Chat.vue";
import DrawerMenu from "@/components/drawerMenu.vue";
import DBLoader from "@/components/DBLoader.vue";
import { RouterLink, RouterView } from 'vue-router'

import {onMounted} from "vue";
import testView from "@/views/testView.vue";
import RoomView from "@/views/roomView.vue";
import myheader from "@/components/myheader.vue";

onMounted(() => {
  document.documentElement.setAttribute('data-theme', 'luxury')
})
</script>

<template>
  <myheader />
  <Chat />

  <main>
    <router-view  />

<!--    <testView />-->

  </main>

</template>

<style scoped>

</style>
