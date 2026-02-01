<script setup>
import {onMounted, ref} from 'vue';
import axios from "axios";
import {RouterLink} from "vue-router";
import router from "@/router/index.js";
import {setSecret} from "@/composables/login.js";
// @ts-ignore
import Cookies from "js-cookie";


const text1 = ref(null);
const text2 = ref(null);
const uusername = ref(null);
const upassword = ref(null);

function gotonext(nextField) {
  if (nextField) {
    nextField.focus();
  }
}

const submit = async (username, password) => {
  try {
    if (!username || !password) {
      console.error("Username and password are required");
    }
    else {
      const postResponse = await axios.post(`/api/users/login`, {
        username: uusername.value,
        password: upassword.value,
      })
      console.log(postResponse.data);
      if (postResponse.data.success) {
        setSecret(postResponse.data.secret);
        Cookies.set('secret', postResponse.data.secret);
        await router.replace("/");
      }
      else {
        console.error("erororororooror")
        return null
      }
    }
  } catch (err) {
    console.error(err)
  }
}

onMounted(() => {
})

</script>

<template>
  <header >
    <RouterLink to="/welcome">Home</RouterLink>
  </header>
  <div class="flex h-screen items-center justify-center" style="max-height: max-content">

    <div class="login-container">
      <fieldset class="fieldset">
        <legend class="fieldset-legend">login</legend>

        <label class="label">name</label>
        <input type="text"
               ref="text1"
               class="input"
               placeholder="nickname"
               v-model="uusername"
               @keyup.enter="gotonext(text2); console.log(uusername);"
        />

        <label class="label">password</label>
        <div class="join">
          <input type="password"
               ref="text2"
               class="input"
               placeholder="Password"
               v-model="upassword"
               @keyup.enter=" console.log(upassword);"
          />
        </div>
        <p class="label">new user?</p>
        <RouterLink :to="{name: 'registration'}">click here to register</RouterLink>
      </fieldset>
      <button class="btn"
              @click="submit(uusername, upassword); console.log(uusername, upassword)"
      >login</button>
    </div>
  </div>
</template>

<style scoped>
.login-container {
  min-height: 50vh;
  max-height: max-content;
  margin: 10px;
  display: flex;
  flex-direction: column;
}
</style>