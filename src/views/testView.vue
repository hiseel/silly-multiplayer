<script setup>
import {onMounted, ref, computed} from 'vue'
import ChatBox from "@/components/ChatBox.vue";
import Chat from "@/components/Chat.vue";
import {RouterLink} from "vue-router";
import axios from "axios";

const ActiveRoomID = ref([])


const roomID = ref([])
const getData = async () => {
  try {
    const result = await axios.get(`/api/db/rooms`)
    roomID.susvalue = result.data
  }
  catch (err) {
    console.error(err)
    roomID.susvalue = []
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

const iscorrect = computed(() => {return susvalue.room_id === ActiveRoomID.value})
</script>

<template>
  <div class="flex flex-col md:flex-row w-full  min-h-100  gap-2">

    <!-- Left Column (Fixed Width) -->
    <div class="w-full md:w-48 flex-none">
      <div class="card bg-base-300 h-full ">
        <div class="card-body">
          <h2 class="card-title">Rooms</h2>
          <ul class="menu  w-full">
            <RouterLink :to="{name: 'room', params: {roomID: roomID.room_id}}">
              <li><a> {{ roomID.room_id }} </a></li>
            </RouterLink>
          </ul>
        </div>
      </div>
    </div>

    <!-- Right Column (Fills remaining space) -->
    <div class="grow">
      <div class="card  h-full w-full">
        <div class="card-body">
          <h2 class="card-title">Chat Chat!</h2>
          <ChatBox v-if="iscorrect"
                   :roomid="sentmessages"
                   v-model="ActiveRoomID"
          />
          <div class="flex flex-col w-full py-10">
                <textarea class="textarea w-full "
                          placeholder="Type here"
                          @change=""
                />
          </div>
        </div>
      </div>
    </div>

  </div>
</template>


<style scoped>

</style>