<script setup>
import EditProperty from "@/components/EditProperty.vue";
import {useRoute, useRouter} from "vue-router";
import {onBeforeMount, onMounted, ref} from "vue";
import {GET, PUT} from "@/composables/api.js";

const router = useRouter()
const route = useRoute()
const userinfo = ref(null)

async function getUser() {
  const res = await GET(`/api/secure/users/${route.params.user_id}`);
  userinfo.value = res.data
  console.log(userinfo.value +" userinfo")
}
async function onchange(field, value) {
  let body = {};
  body[field] = value;
  const result = await PUT(`/api/secure/users/${route.params.user_id}`, body)
  if (result.success) userinfo.value[field] = value;
}

onBeforeMount(async () => {
  await getUser();
  console.log(route.params.user_id + " /users");

})
</script>

<template>
  <button class="btn" @click="router.back">Back</button>
  <div class="card flex">
    <h2>Account Details</h2>
    <EditProperty
        :name="'username'"
        :value="userinfo.username"
        :onchange="(update) => onchange('username', update)"
    />
    <EditProperty
        :name="'change color'"
        :value="userinfo.username_color"
        :onchange="(update) => onchange('username_color', update)"
    />
  </div>
</template>

<style scoped>

</style>