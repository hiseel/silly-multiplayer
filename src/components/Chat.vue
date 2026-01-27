<script setup>

import axios from 'axios'
import {onMounted, ref} from 'vue'

const count = ref(0)


const searchId = ref('')
const DBResults = ref(null)

const search = async () => {
  if (!searchId.value) return

  try {
    const res = await axios.get(`/api/${searchId.value}`)
    DBResults.value = res.data
  }
  catch (err) {
    console.error(err)
    DBResults.value = "null"
  }
}
const messages = ref([])
const getData = async () => {

  try {
    const res = await axios.get(`/api/aichats`)
    messages.value = res.data
  }
  catch (err) {
    console.error(err)
    messages.value = []
  }
}

onMounted(() => getData())
</script>

<template>
  <input v-model.lazy="searchId"
         placeholder="Type here"
         @change="search"
  />
  <div v-if="DBResults">
    <pre style="background: var(--color-base-300); padding: 15px;">{{ JSON.stringify(DBResults, null, 2) }}</pre>
  </div>

<!--  <div style="display:block">-->
<!--    <div v-for="value in messages">-->
<!--      <div> {{ value.username }} </div>-->
<!--      <p> {{ value.message }} </p>-->
<!--    </div>-->
<!--  </div>-->
  <button @click="count++">You clicked me {{ count }} times.</button>
</template>

<style scoped>

</style>