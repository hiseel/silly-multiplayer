<script setup>
import Chat from "@/components/Chat.vue";
import {RouterLink, RouterView, useRoute} from 'vue-router'
import {onMounted} from "vue";

import myheader from "@/components/myheader.vue";
import {checkLoginState, getUserInf} from "@/composables/login.js";

const route = useRoute();


onMounted(() => {
  document.documentElement.setAttribute('data-theme', 'luxury')
  checkLoginState()
  // getUserInf()
})
</script>

<template>
  <myheader v-if="!route.meta.hideHeader"></myheader>
<!--  <Chat />-->
  <main>
    <router-view />
<!--    <testView />-->
  </main>
</template>

<style scoped>

</style>
