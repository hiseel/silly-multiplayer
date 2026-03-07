<script setup>
import {onMounted, ref, computed} from 'vue'
import ChatBox from "@/components/ChatBox.vue";
import dayjs from "dayjs";
import {RouterLink, useRoute} from "vue-router";
import { GET, POST } from "@/composables/api.js"
import {getSecret, GetUserUUID} from "@/composables/login.js";
import {openSocket} from "@/composables/socket.js";
const { isReady } = openSocket()

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

const sentmessages = ref([])
const getMessageData = async () => {
  try {
    const res = await GET(`/api/secure/userchats`)
    sentmessages.value = res.data
  }
  catch (err) {
    console.error(err)
    sentmessages.value = []
  }
}
onMounted(() => getMessageData())

const activeRoomID = computed(() => route.params.roomId)

const filter = computed(() => {
  return {
    passRoomID: activeRoomID.value,
    message: sentmessages.value.filter(message => message.room_id === activeRoomID.value).toSorted((a, b) => dayjs(a.timestamp) - dayjs(b.timestamp)),
  }
})

const currentInput = ref(null)

const sendMessage = async (event) => {
  if (!event || !event.shiftKey) {
    try {
      const postResponse = await POST(`/api/secure/userchats`, {user_id: UUID.value, message: currentInput.value, room_id: activeRoomID.value})
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
          <ChatBox v-if="activeRoomID"
                   :roomID="activeRoomID"
                   :message="filter.message"
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