<script setup>
import {computed, ref} from 'vue';
import axios from "axios";
import {RouterLink} from "vue-router";
import router from "@/router/index.js";

const text1 = ref(null);
const text2 = ref(null);
const uusername = ref(null);
const upassword = ref(null);

function gotonext(nextField) {
  if (nextField) {
    nextField.focus();
  }
}

const submit = async () => {
  try {
    const postResponse = await axios.post(`/api/users/login`, {
      username: uusername.value,
      password: upassword.value,
    })
    if (postResponse.data.success) {
      await router.push("/main");
      const user_secret = await postResponse.data.secret
      await axios.get('localhost/api/users', {
        params:{secret: user_secret}
      });
    }
  } catch (err) {
    console.error(err)
  }
}



</script>

<template>
  <header >
    <RouterLink to="/">Home</RouterLink>
  </header>
  <div class="flex h-screen items-center justify-center">

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
        <input type="text"
               ref="text2"
               class="input"
               placeholder="Password"
               v-model="upassword"
               @keyup.enter=" console.log(upassword);"
        />
        <p class="label">new user?</p>
        <RouterLink :to="{name: 'registration'}">click here to register</RouterLink>
      </fieldset>
      <button class="btn"
              @click="submit(); console.log(uusername, upassword)"

      >login</button>
    </div>
  </div>
</template>

<style scoped>
.login-container {
  min-height: 50vh;
  max-height: 100vh;
  margin: 10px;
  display: flex;
  flex-direction: column;
}
</style>