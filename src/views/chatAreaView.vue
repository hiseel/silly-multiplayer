<script setup>
import {onMounted, ref, computed, watch} from 'vue'
import ChatBox from "@/components/ChatBox.vue";
import dayjs from "dayjs";
import {RouterLink, useRoute} from "vue-router";
import { GET, POST } from "@/composables/api.js"
import {getSecret, GetUserUUID} from "@/composables/login.js";
import {openSocket, setUserListener, isReady} from "@/composables/socket.js";

const route = useRoute();
// const ActiveRoomID = ref([])
const rooms = ref([])

const getData = async () => {
  try {
    const result = await GET(`/api/secure/rooms`)
      rooms.value = result?.data
    console.log('rooms acquired')
  }
  catch (err) {
    console.error(err)
    rooms.value = []
  }
}
onMounted(() => getData())

const activeRoomUsers = ref([]);
const getActiveUsers = async () => {
  try {
    const result = await GET(`/api/secure/room_members`)
    activeRoomUsers.value = result?.data
    console.log('room members acquired', activeRoomUsers.value)
  }
  catch (err) {
    console.error(err)
    activeRoomUsers.value = []
  }
}
onMounted(() => getActiveUsers())

const sentmessages = ref({})
const getMessageData = async (roomId) => {
  try {
    const res = await GET(`/api/secure/userchats/${roomId}`)
    sentmessages.value[roomId] = res.data
  }
  catch (err) {
    console.error(err)
    sentmessages.value = []
  }
}


const filter = ref(null)

watch(() => route.params.roomId, async () => {
filter.value = null
  const activeRoomID = route.params.roomId;
  if (!activeRoomID) {
    console.log("no active room ");
    filter.value = [];
  }

  if (!sentmessages.value[activeRoomID]) {
    await getMessageData(activeRoomID)
  }

  if (!sentmessages.value[activeRoomID]) {
    console.log("no message in room ");
    filter.value = [];
  }

  displayMsg()
})

function displayMsg() {
  filter.value = sentmessages.value[route.params.roomId].toSorted((a, b) => dayjs(a.timestamp) - dayjs(b.timestamp))
}
//TODO optimize toSorted insert

const currentInput = ref(null)

const sendMessage = async (event) => {
  if (!event || !event.shiftKey) {
    try {
      const postResponse = await POST(`/api/secure/userchats/` + route.params.roomId, {user_id: UUID.value, message: currentInput.value})
      console.log(postResponse.data)
    }
    catch (err) {
      console.error(err)
    }

    event?.preventDefault()
    currentInput.value = null
  }
}


const UUID = ref(null);
const secret = getSecret();
onMounted(async() => {
  UUID.value = await GetUserUUID(secret);
  setUserListener(msg => {
    sentmessages.value[msg.content.room_id].push(msg.content)
    if (msg.content.room_id === route.params.roomId) {
      displayMsg()
    }
  })
})

</script>

<template>
  <div class="flex flex-col md:flex-row w-full  min-h-100  gap-2">

    <!--Fixed Width-->
    <div class="w-full md:w-48 flex-none">
      <div class="card bg-base-300 h-full ">
        <div class="card-body">
          <h2 class="card-title">Rooms</h2>
          <ul class="menu  w-full">
            <RouterLink :to="{ name: 'room', params: {roomId: id.room_id}}" v-for="id in rooms" >
              <li><a> {{ id.name }} </a></li>
            </RouterLink>
          </ul>
        </div>
      </div>
    </div>

    <div class="grow">
      <div class="card  h-full w-full">
        <div class="card-body">
          <h2>Chat Chat! {{rooms?.name}} </h2>
            <ChatBox v-if="filter"
                     :roomID="route.params.roomId"
                     :message="filter"
            />
          <div>
            <div class="flex flex-row w-full py-10">
                  <textarea class="textarea w-full "
                            placeholder="Type here"
                            v-model="currentInput"
                            @keydown.enter="sendMessage"
                  />
                  <button
                      class="btn"
                      :disabled="!isReady()"
                      @click="sendMessage()"
                  >Send</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="w-full md:w-48 flex-none">
      <div class="card bg-base-300 h-full ">
        <div class="card-body">
          <h2 class="card-title">Active users</h2>
          <ul class="menu  w-full">
            <RouterLink :to="{ name: 'user', params: {roomId: id.user_id}}" v-for="id in activeRoomUsers" >
              <li><a> {{ id.user_id }} </a></li>
            </RouterLink>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>


<style scoped>

</style>