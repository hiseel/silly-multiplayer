<script setup>
import drawerMenu from "@/components/drawerMenu.vue";
import {RouterLink} from "vue-router";
import {computed, onBeforeMount, onMounted, ref} from "vue";
import {checkAdmin, getSecret, GetUserUUID} from "@/composables/login.js";
import {status} from "@/composables/socket.js"


const UUID = ref(null);
const secret = getSecret();


const statusColor = computed(() => ({
  'text-green-500': status.value === 'connected',
  'text-yellow-500': status.value === 'connecting',
  'text-red-500':   status.value === 'disconnected'
}))

let isAdmin = false;

onMounted(async() => {
  UUID.value = await GetUserUUID(secret);
  isAdmin = await checkAdmin();
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
        <div :class="statusColor"> {{ status }}</div>


        <RouterLink to="/about">About</RouterLink>
        <RouterLink to="/settings">Settings</RouterLink>
        <RouterLink :to="{name:'main'}">Rooms</RouterLink>
      <RouterLink v-if="isAdmin" to="/admin">Admin</RouterLink>
    </nav>
  </div>
</template>

<style scoped>

</style>