<script setup>
import drawerMenu from "@/components/drawerMenu.vue";
import {RouterLink} from "vue-router";
import {onBeforeMount, onMounted, ref} from "vue";
import {getSecret, GetUserUUID} from "@/composables/login.js";


const UUID = ref(null);
const secret = getSecret();



onMounted(async() => {
  UUID.value = await GetUserUUID(secret);
})
</script>

<template>
  <div class="card flex flex-row">
    <drawer-menu>
      <drawerMenu/>
    </drawer-menu>
    <nav>
        <p class="card">activeUser: {{UUID}}</p>
        <p> Secret is: {{secret}}</p>


        <RouterLink to="/about">About</RouterLink>
        <RouterLink to="/settings">Settings</RouterLink>
        <RouterLink :to="{name:'main'}">Rooms</RouterLink>
    </nav>
  </div>
</template>

<style scoped>

</style>