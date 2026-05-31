<script setup>
import {onMounted, ref} from 'vue'
import ChatBox from "@/components/ChatBox.vue";
import Chat from "@/components/Chat.vue";
import {RouterLink} from "vue-router";
import {GET} from "@/composables/api.js"

const roomID = ref([])
const getData = async () => {
  try {
    const res = await GET(`/api/rooms`)
    roomID.value = res.data
  }
  catch (err) {
    console.error(err)
    roomID.value = []
  }
}
onMounted(() => getData())
</script>

<template>
  <div class="flex flex-col md:flex-row w-full  min-h-100  gap-2">

    <div class="w-full md:w-48 flex-none">
      <div class="card bg-base-300 h-full ">
        <div class="card-body">
          <h2 class="card-title">Sidebar</h2>
          <ul class="menu  w-full">
            <RouterLink :to="`/room/${value.room_id}`" v-for="value in roomID">
              <li><a>{{ value.room_id }}</a></li>
            </RouterLink>
          </ul>
        </div>
      </div>
    </div>

    <div class="grow">
      <div class="card  h-full w-full">
        <div class="card-body">
          <h2 class="card-title">Main Content</h2>
          <p>Chat Chat!</p>
          <ChatBox />
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