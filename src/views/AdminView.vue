<script setup>
import {onMounted, ref} from "vue";
import {GET} from "@/composables/api.js";

const userList = ref(null);
async function getUsers() {
  const res = await GET("/api/secure/users");
  userList.value = res.data
}
onMounted(async () => {
  await getUsers()
})
</script>

<template>
<div>
  adminer lmao
</div>
  <div class="card flex">
    <table class="table">
      <thead>
        <tr>
          <th>UUID</th>
          <th>name</th>
          <th>color</th>
          <th>creation time</th>
          <th>last seen time</th>
          <th>role</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
      <tr v-for="user in userList">
        <td>{{ user.user_id }}</td>
        <td>{{ user.username }}</td>
        <td>{{ user.username_color }}</td>
        <td>{{ user.created_at }}</td>
        <td>{{ user.last_seen_at }}</td>
        <td>{{ user.role }}</td>
        <td>
          <RouterLink class="btn" :to="{name: 'users', params: {user_id: user.user_id}}">
            Edit
          </RouterLink>
        </td>
      </tr>
      </tbody>
    </table>
  </div>

</template>

<style scoped>

</style>