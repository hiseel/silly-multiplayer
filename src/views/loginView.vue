<script setup>
import {computed, ref} from 'vue';
import axios from "axios";

const text1 = ref(null);
const text2 = ref(null);
const flag = ref(null);
const uusername = ref(null);
const upassword = ref(null);

function gotonext(nextField) {
  if (nextField) {
    nextField.focus();
  }
}

const submit = async () => {
  try {
    const postResponse = await axios.post(`/api/users`, {
      username: uusername.value,
      password: upassword.value,
      flag: flag.value
    })
    console.log(postResponse.data)
  } catch (err) {
    console.error(err)
  }
}

</script>

<template>
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
               @keyup.enter="gotonext(text2); flag = register; console.log(uusername);"
        />
        <p class="label">sus passWort</p>

        <label class="label">password</label>
        <input type="text"
               ref="text2"
               class="input"
               placeholder="Password"
               v-model="upassword"
               @keyup.enter=" console.log(upassword);"
        />
        <p class="label">sus passWort</p>
      </fieldset>
      <button class="btn "
              @click="flag = 'login'; submit(); console.log(uusername, upassword)"
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