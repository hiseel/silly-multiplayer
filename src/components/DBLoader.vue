<script setup>
import axios from "axios";
import {onMounted, ref} from 'vue'

const items = ref([])      // Store the SQLite data here
const error = ref(null)    // Store error messages here
const loading = ref(false)
const rawData = ref(null)

const test = ref(null)

const fetchData = async () => {
  loading.value = true
  try {
    const response = await axios.get('/api/db/users')

    items.value = response.data

    console.log("Data received:", items.value)
  } catch (err) {
    console.error(err)
    error.value = "Could not fetch data. Is the server running?"
  } finally {
    loading.value = false
  }
}

// Fetch automatically when component loads
onMounted(() => {
  fetchData()
})

onMounted(async () => {
  try {
    // 2. Fetch the data (Using your proxy path from the previous step)
    const response = await axios.get('/api/db/users')

    // 3. Store the data
    rawData.value = response.data
  } catch (err) {
    error.value = err.message
  }
})

</script>

<template>
  <div class="container">
    <h2>SQLite Data from Port 8181</h2>

    <div v-if="loading">Loading...</div>
    <div v-if="error" style="color: red">{{ error }}</div>

    <!-- Display the data -->
    <ul v-if="items.length">
      <li v-for="item in items" :key="item.id">
        <!-- Replace .name with whatever columns you have in SQLite -->
        {{ item.name }}
      </li>
    </ul>
    <pre style="background: var(--color-base-300); padding: 15px; border-radius: 5px;">{{ JSON.stringify(rawData, null, 2) }}</pre>
    <button @click="fetchData">Refresh Data</button>
  </div>
</template>

<style scoped>

</style>