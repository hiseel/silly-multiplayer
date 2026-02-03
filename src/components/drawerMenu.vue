<script setup>
import {RouterLink} from "vue-router";
import {logOut, getSecret} from "@/composables/login.js";
import {onMounted, ref} from "vue";
let UUID = ref(null)


onMounted(() => {
  // UUID = getUserInf();
})

</script>

<template>
  <div class="drawer">
    <input id="menu" type="checkbox" class="drawer-toggle" />
    <div class="drawer-content">
      <!-- Page content here -->

      <label for="menu" class="btn btn-ghost drawer-button">Menu</label>
    </div>
    <div class="drawer-side">
      <label for="menu" aria-label="close sidebar" class="drawer-overlay flex flex-col"></label>
      <div class="drawer-container min-h-full bg-base-200 bg-opacity-1 w-80 p-4 justify-end">
        <ul class="menu min-h-full w-80 p-4">
          <RouterLink to="/about">About</RouterLink>
          <RouterLink to="/settings">Settings</RouterLink>
          <RouterLink :to="{name:'rooms'}">Rooms</RouterLink>
        </ul>

        <div >
          Current user uuid:<br> {{UUID}}
        </div>
        <div class="logout-container max-w-2rem">
          <button class="btn btn-ghost" @click="logOut()">Log Out</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.logout-container {
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: left;
  max-height: max-content;
  padding: 0 1rem;
}

.drawer-container {
  display: flex;
  flex-direction: column;
  justify-content: stretch;
  max-height: max-content;
}
</style>