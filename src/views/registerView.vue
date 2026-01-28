<script setup>
import {computed, onMounted, ref, useTemplateRef} from 'vue';
import axios from "axios";
import router from "@/router/index.js";
import {RouterLink} from "vue-router";
import { secret }  from "@/composables/login.js";


const text1 = ref(null);
const text2 = ref(null);
const text3 = ref(null);
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

const showModal = ref(false);

function setModal(value) {
  showModal.value = value;
}

const upassPassed = async (username) => {
  try {
    if (username) {
      // if (!upassCompare) {
        try {
          const postResponse = await axios.post(`/api/users/register`, {
            username: uusername.value,
            password: upassword.value,
          })
          console.log(postResponse.data)
          if (postResponse.data) {
            await router.push("/");
          }
          else {
            console.error("user already exists");
            setModal(true)
          }
        } catch (err) {
          console.error(err)
        }
      } else {
        console.error("Passwords don't match")
      }
    // }
    // else {
    //   console.error("username not provided")
    // }
  }
  catch (error) {
    console.error(error)
  }
}



</script>

<template>
  <header >
    <RouterLink to="/welcome">Home</RouterLink>
  </header>
  <div class="flex h-screen items-center justify-center">

    <div class="register-container">
      <fieldset class="fieldset">
        <legend class="fieldset-legend">register</legend>
        <legend class="fieldset-legend">already have an account?</legend>
        <RouterLink :to="{name: 'login'}"> click to login existing user</RouterLink>

        <input type="text" class="input validator" required placeholder="Username"
               pattern="[A-Za-z][A-Za-z0-9\-]*" minlength="3" maxlength="30" title="Only letters, numbers or dash"
               ref="text1"
               v-model="uusername"
               @keyup.enter="gotonext(text2); console.log(uusername);"
        />
        <p class="validator-hint hidden">
          Must be 3 to 30 characters
          <br/>containing only letters, numbers or dash
        </p>

        <input type="password" class="input validator" required placeholder="Password" minlength="8"
               pattern="[A-Za-z\d]{8,32}"
               title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
               ref="text2"
               v-model="upassword"
               @keyup.enter="gotonext(text3); console.log(upassword);"
        />
        <p class="validator-hint hidden">
          Must be more than 8 characters, including
          <br/>At least one number
          <br/>At least one lowercase letter
          <br/>At least one uppercase letter
        </p>

        <input type="password" class="input validator" required placeholder="Repeat password" minlength="8"
               pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
               title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
               ref="text3"
               v-model="upasswordControl"
               @keyup.enter="gotonext(text3); console.log(upassword);"
        />
        <p class="validator-hint hidden" v-if="!upassCompare">
          passwords don't match
        </p>

      </fieldset>
      <button class="btn "
              @click="upassPassed(uusername, upassword)"
      >register</button>
      <dialog ref="my_modal_1" class="modal" :class="{ 'modal-open': showModal }">
        <div class="modal-box">
          <h3 class="text-lg font-bold">Hello!</h3>
          <p class="py-4">Username taken.</p>
          <div class="modal-action">
            <form method="dialog">
              <!-- if there is a button in form, it will close the modal -->
              <button class="btn" @click="setModal(false)">Close</button>
            </form>
          </div>
        </div>
      </dialog>
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