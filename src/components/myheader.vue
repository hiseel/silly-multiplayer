<script setup>
import drawerMenu from "@/components/drawerMenu.vue";
import {RouterLink} from "vue-router";
import {computed, onBeforeMount, onMounted, ref} from "vue";
import {getSecret, GetUserUUID} from "@/composables/login.js";
import {status} from "@/composables/socket.js"


const UUID = ref(null);
const secret = getSecret();


const statusColor = computed(() => ({
  'text-green-500': status.value === 'connected',
  'text-yellow-500': status.value === 'connecting',
  'text-red-500':   status.value === 'disconnected'
}))


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
        <div :class="statusColor"> {{ status }}</div>


        <RouterLink to="/about">About</RouterLink>
        <RouterLink to="/settings">Settings</RouterLink>
        <RouterLink :to="{name:'main'}">Rooms</RouterLink>
    </nav>
  </div>
</template>

<style scoped>

</style>