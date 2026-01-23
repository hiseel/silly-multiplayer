<script setup>
import {onMounted, ref, watch} from "vue";
import axios from "axios";

const props = defineProps([ 'passRoomID', 'message', 'roomID' ]);
// const result = defineModel('ActiveRoomID');

const messages = ref([])
const getMessageData = async () => {
  try {
    const res = await axios.get(`/api/db/userchats`)
    messages.value = res.data
  }
  catch (err) {
    console.error(err)
    messages.value = []
  }
}
onMounted(() => getMessageData())


watch(() => props.roomID, getMessageData);


</script>

<template>
  <div class="chat-container">
    <div class="message-list h-screen">
      <div v-for="value in message">
        <div> {{ value.user_id }} </div>
        <p> {{ value.message }} </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.chat-container {
  height: 100%;
  max-height: 100%;
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