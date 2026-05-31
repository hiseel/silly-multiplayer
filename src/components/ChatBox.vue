<script setup>

const props = defineProps(['message']);
// const result = defineModel('ActiveRoomID');
</script>

<template>
  <div class="chat-container">
    <div class="message-list">
      <div v-for="value in message">
        <div> {{ value.username }} </div>
        <p> {{ value.message }} </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.chat-container {
  min-height: 50vh;
  max-height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.message-list {
  flex-grow: 1;
  overflow-y: auto;
  min-height: 0;
}

header, footer {
  flex-shrink: 0;
  padding: 10px;
}
</style>