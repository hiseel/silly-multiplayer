<script setup>
import {onMounted, ref, computed} from 'vue'
import ChatBox from "@/components/ChatBox.vue";
import Chat from "@/components/Chat.vue";
import dayjs from "dayjs";
import {RouterLink, useRoute} from "vue-router";
import axios from "axios";

const route = useRoute();
// const ActiveRoomID = ref([])

const rooms = ref([])
const getData = async () => {
  try {
    const result = await axios.get(`/api/db/rooms`)
    rooms.value = result.data
  }
  catch (err) {
    console.error(err)
    rooms.value = []
  }
}
onMounted(() => getData())

const sentmessages = ref([])
const getMessageData = async () => {
  try {
    const res = await axios.get(`/api/db/userchats`)
    sentmessages.value = res.data
  }
  catch (err) {
    console.error(err)
    sentmessages.value = []
  }
}
onMounted(() => getMessageData())

// const is_correct = computed(() =>  rooms?.room_id === ActiveRoomID.value)
const activeRoomID = computed(() => route.params.roomId)

const filter = computed(() => {
  return {
    passRoomID: activeRoomID.value,
    message: sentmessages.value.filter(message => message.room_id === activeRoomID.value).toSorted((a, b) => dayjs(a.timestamp) - dayjs(b.timestamp)),
  }
})

</script>

<template>
  <div class="flex flex-col md:flex-row w-full  min-h-100  gap-2">

    <!-- Left Column (Fixed Width) -->
    <div class="w-full md:w-48 flex-none">
      <div class="card bg-base-300 h-full ">
        <div class="card-body">
          <h2 class="card-title">Rooms</h2>
          <ul class="menu  w-full">
            <RouterLink :to="{ name: 'room', params: {roomId: id.room_id}}" v-for="id in rooms" >
              <li><a> {{id.room_id }} </a></li>
            </RouterLink>
          </ul>
        </div>
      </div>
    </div>

    <!-- Right Column (Fills remaining space) -->
    <div class="grow">
      <div class="card  h-full w-full">
        <div class="card-body">
          <h2>Chat Chat! {{ rooms.room_id }} </h2>
          <ChatBox v-if="activeRoomID"
                   :roomID="activeRoomID"
                   :message="filter.message"
          />
          <div class="flex flex-col w-full py-10">
                <textarea class="textarea w-full "
                          placeholder="Type here"
                />
          </div>
        </div>
      </div>
    </div>

  </div>
</template>


<style scoped>

</style>