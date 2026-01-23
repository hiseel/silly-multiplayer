<script setup>
import { ref } from 'vue'


</script>

<template>
  <!-- Main Container -->
  <div class="flex flex-col md:flex-row w-full min-h-screen bg-base-200 gap-4">

    <!-- Left Column (Fixed Width) -->
    <div class="w-full md:w-48 flex-none">
      <div class="card bg-base-100 h-full shadow-xl">
        <div class="card-body">
          <h2 class="card-title">Sidebar</h2>
          <ul class="menu bg-base-100 w-full">
            <li><a>Link 1</a></li>
            <li><a>Link 2</a></li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Right Column (Fills remaining space) -->
    <div class="grow">
      <div class="card bg-base-100 h-full shadow-xl">
        <div class="card-body">
          <h2 class="card-title">Main Content</h2>
          <p>This column grows to fill whatever width is left over.</p>
          <div class="flex flex-col w-full border-opacity-50 max-w-3xl mx-auto py-10">

              <div class="card bg-base-300 rounded-box place-items-center p-10">
                <input
                       placeholder="Type here"
                       @change=""
                />
              </div>

          </div>
        </div>
      </div>
    </div>

  </div>
</template>


<style scoped>

</style>