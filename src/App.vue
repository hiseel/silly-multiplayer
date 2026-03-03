<script setup>
import {RouterView, useRoute} from 'vue-router'
import {onMounted, watch} from "vue";
import {openSocket} from '@/composables/socket.js'

import myheader from "@/components/myheader.vue";
import {getSecret} from "@/composables/login.js";

const route = useRoute();

watch(getSecret, function() {
  console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA', getSecret());
  if (getSecret()) {
    openSocket()
  }
})

onMounted(async () => {
  document.documentElement.setAttribute('data-theme', 'luxury')



})
</script>

<template>

    <myheader v-if="!route?.meta.hideHeader" />
<!--  <Chat />-->
  <main >
    <router-view />
<!--    <testView />-->
  </main>
</template>

<style scoped>

</style>
