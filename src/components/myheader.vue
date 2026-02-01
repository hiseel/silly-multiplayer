<script setup>

import DrawerMenu from "@/components/drawerMenu.vue";
import {RouterLink} from "vue-router";
import {getSecret, logOut} from "@/composables/login.js";
</script>

<template>
  <div class="card flex flex-row">

    <drawer-menu>
      <DrawerMenu v-if="getSecret()"/>
    </drawer-menu>
    <nav>
      <div class="card">activeUser</div>
      <p> Secret is: {{getSecret()}}</p>

      <RouterLink to="/about">About</RouterLink>
      <RouterLink to="/settings">Settings</RouterLink>
      <RouterLink :to="{name:'main'}">Rooms</RouterLink>
<!--      <RouterLink to="/login">Login</RouterLink>-->
<!--      <RouterLink to="/registration">Register user</RouterLink>-->
    </nav>
  </div>
</template>

<style scoped>

</style>