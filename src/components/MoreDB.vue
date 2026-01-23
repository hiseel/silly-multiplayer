<script setup>
import loading from "@/components/DBLoader.vue";
import fetchData from "@/components/DBLoader.vue";
import error from "@/components/DBLoader.vue";
import {ref} from "vue";


const serverUrl = ref();
const selectedTable = ref(null);
const data = ref([]);
const tables = ref([]);
const columns = ref([]);

</script>

<template>
<div id="app" class="container">
  <h1>STMP Database Viewer</h1>

  <div class="controls">
    <label>Server URL:</label>
    <input v-model="serverUrl" placeholder="http://localhost:5000">

    <label>Select Table:</label>
    <select v-model="selectedTable" @change="fetchData">
      <option value="" disabled>-- Choose Table --</option>
      <option v-for="table in tables" :key="table" :value="table">{{ table }}</option>
    </select>

    <button @click="fetchData">Refresh Data</button>
  </div>

  <div v-if="loading" class="loading">Loading data...</div>
  <div v-if="error" class="error">{{ error }}</div>

  <div v-if="data && data.length > 0" class="table-wrapper">
    <table>
      <thead>
      <tr>
        <th v-for="col in columns" :key="col">{{ col }}</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(row, idx) in data" :key="idx">
        <td v-for="col in columns" :key="col">
                            <span v-if="isObject(row[col])">
                                <pre>{{ formatJson(row[col]) }}</pre>
                            </span>
          <span v-else>{{ row[col] }}</span>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
  <div v-else-if="!loading && selectedTable" class="no-data">
    No data found in table "{{ selectedTable }}"
  </div>
</div>

</template>

<!--<style>-->
<!--    body {-->
<!--      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;-->
<!--      padding: 20px;-->
<!--      background: #1a1a1a;-->
<!--      color: #eee;-->
<!--    }-->

<!--    .container {-->
<!--      max-width: 1200px;-->
<!--      margin: 0 auto;-->
<!--    }-->

<!--    h1 {-->
<!--      color: #4CCAFF;-->
<!--    }-->

<!--    /* Controls */-->
<!--    .controls {-->
<!--      margin-bottom: 20px;-->
<!--      padding: 15px;-->
<!--      background: #2d2d2d;-->
<!--      border-radius: 8px;-->
<!--    }-->

<!--    select,-->
<!--    input,-->
<!--    button {-->
<!--      padding: 8px 12px;-->
<!--      margin-right: 10px;-->
<!--      border-radius: 4px;-->
<!--      border: 1px solid #444;-->
<!--      background: #333;-->
<!--      color: white;-->
<!--    }-->

<!--    button {-->
<!--      cursor: pointer;-->
<!--      background: #4CCAFF;-->
<!--      color: #000;-->
<!--      font-weight: bold;-->
<!--      border: none;-->
<!--    }-->

<!--    button:hover {-->
<!--      background: #7cd5ff;-->
<!--    }-->

<!--    /* Table Styles */-->
<!--    .table-wrapper {-->
<!--      overflow-x: auto;-->
<!--      background: #2d2d2d;-->
<!--      border-radius: 8px;-->
<!--      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);-->
<!--    }-->

<!--    table {-->
<!--      width: 100%;-->
<!--      border-collapse: collapse;-->
<!--      min-width: 800px;-->
<!--    }-->

<!--    th,-->
<!--    td {-->
<!--      padding: 12px 15px;-->
<!--      text-align: left;-->
<!--      border-bottom: 1px solid #444;-->
<!--    }-->

<!--    th {-->
<!--      background-color: #333;-->
<!--      color: #4CCAFF;-->
<!--      position: sticky;-->
<!--      top: 0;-->
<!--      font-weight: 600;-->
<!--      white-space: nowrap;-->
<!--    }-->

<!--    tr:hover {-->
<!--      background-color: #383838;-->
<!--    }-->

<!--    .loading {-->
<!--      color: #888;-->
<!--      font-style: italic;-->
<!--      margin: 20px 0;-->
<!--    }-->

<!--    .error {-->
<!--      color: #FF5C5C;-->
<!--      background: #3d1a1a;-->
<!--      padding: 10px;-->
<!--      border-radius: 4px;-->
<!--      border-left: 4px solid #FF5C5C;-->
<!--    }-->

<!--    .no-data {-->
<!--      padding: 20px;-->
<!--      color: #888;-->
<!--      text-align: center;-->
<!--    }-->

<!--    pre {-->
<!--      white-space: pre-wrap;-->
<!--      word-break: break-all;-->
<!--      margin: 0;-->
<!--      font-family: monospace;-->
<!--      font-size: 0.9em;-->
<!--    }-->
<!--  </style>-->