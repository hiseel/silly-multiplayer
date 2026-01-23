<script setup>
import {onMounted, ref, watch} from "vue";
import axios from "axios";

const props = defineProps([ 'roomid' ]);
// defineEmits(['update:ActiveRoomID']);
const result = defineModel();

// async function loadData() {
//   if (!props.roomid) return;
//   const payload = {
//     roomid: props.room_id
//   }
// }


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

result.value = messages

watch(() => props.roomid, () => getMessageData());


</script>

<template>
  <div class="chat-container">
    <div class="message-list h-screen">
      <div v-for="value in messages">
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