<script setup>

</script>

<template>
  <div class="drawer">
    <input id="menu" type="checkbox" class="drawer-toggle" />
    <div class="drawer-content">
      <!-- Page content here -->

      <label for="menu" class="btn btn-ghost drawer-button">Open drawer</label>
    </div>
    <div class="drawer-side">
      <label for="menu" aria-label="close sidebar" class="drawer-overlay"></label>
      <ul class="menu bg-base-200 min-h-full w-80 p-4">
        <!-- Sidebar content here -->
        <li><a>Sidebar Item 1</a></li>
        <li><a>Sidebar Item 2</a></li>
      </ul>
    </div>
  </div>
</template>

<style scoped>

</style>