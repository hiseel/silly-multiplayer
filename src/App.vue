<script setup>
import {RouterView, useRoute} from 'vue-router'
import {onMounted} from "vue";

import myheader from "@/components/myheader.vue";

const route = useRoute();

onMounted(async () => {
  document.documentElement.setAttribute('data-theme', 'luxury')
})
</script>

<template>
  <myheader v-if="!route?.meta.hideHeader " ></myheader>
<!--  <Chat />-->
  <main >
    <router-view />
<!--    <testView />-->
  </main>
</template>

<style scoped>

</style>
