<script setup>
import {computed, ref} from 'vue';
import axios from "axios";
import router from "@/router/index.js";

const text1 = ref(null);
const text2 = ref(null);
const text3 = ref(null);
const flag = ref("register");
const uusername = ref(null);
const upassword = ref(null);
const upasswordControl = ref(null);
const upassCompare = computed(() => {
  return upasswordControl.value === upassword.value;
});

function gotonext(nextField) {
  if (nextField) {
    nextField.focus();
  }
}


const upassPassed = async (username) => {
  try {
    if (username) {
      if (upassCompare) {
        try {
          const postResponse = await axios.post(`/api/users/register`, {
            username: uusername.value,
            password: upassword.value,
            flag: flag.value,
          })
          console.log(postResponse.data)
          await router.push("/main");
        } catch (err) {
          console.error(err)
        }
      } else {
        console.error("Passwords don't match")
      }
    }
    else {
      console.error("username not provided")
    }
  }
  catch (error) {
    console.error(error)
  }
}

</script>

<template>
  <div class="flex h-screen items-center justify-center">

    <div class="register-container">
      <fieldset class="fieldset">
        <legend class="fieldset-legend">register</legend>

        <label class="label">name</label>
        <input type="text"
               ref="text1"
               class="input"
               placeholder="nickname"
               v-model="uusername"
               @keyup.enter="gotonext(text2); console.log(uusername);"
        />
        <p class="label">sus passWort</p>

        <label class="label">password</label>
        <input type="text"
               ref="text2"
               class="input"
               placeholder="Password"
               v-model="upassword"
               @keyup.enter="gotonext(text3); console.log(upassword);"
        />
        <p class="label">sus passWort</p>

        <label class="label">password</label>
        <input type="text"
               ref="text3"
               class="input"
               placeholder="Password"
               v-model="upasswordControl"
               @keyup.enter="upassPassed(uusername, upassword); console.log(upasswordControl);"
        />
        <legend class="fieldset-legend">already have an account?</legend>
        <RouterLink :to="{name: 'login'}"> click to login existing user</RouterLink>
      </fieldset>
      <button class="btn "
              @click="upassPassed(uusername, upassword)"
      >register</button>
    </div>
  </div>
</template>

<style scoped>
.register-container {
  min-height: 50vh;
  max-height: 100vh;
  margin: 10px;
  display: flex;
  flex-direction: column;
}
</style>