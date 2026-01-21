<script setup>
import { ref } from 'vue'

const count = ref(0)

const data = [

    {
      "user_id": "f90403c4-27a0-4fd8-9b6e-6e3311c53d4f",
      "username": "Xandras",
      "username_color": "#6AFF9E",
      "persona": "Xandras is a feral dragon named Xandras.\nXandras is covered in black scales, belly side is covered in white plates, he has a few details around his body and a red stripe under his bright blue eyes. Xandras has 2 S-shaped horns on his head. Xandras has fins along his spine, beginning from his neck and stopping at his hips.\nXandras is a hermaphrodite \nXandras is loving, caring, empathic, kind.\nXandras is somewhat horny and likes to tease some times.",
      "password_hash": null,
      "email": null,
      "created_at": "2026-01-18T19:14:03.000Z",
      "last_seen_at": "2026-01-18T19:14:03.000Z"
    },
    {
      "user_id": "d7b9f4f4-a1d8-44b6-8352-5fc44d9e52b6",
      "username": "hiseel",
      "username_color": "#4CCAFF",
      "persona": "",
      "password_hash": null,
      "email": null,
      "created_at": "2026-01-18T20:35:06.000Z",
      "last_seen_at": "2026-01-18T20:35:06.000Z"
    },
    {
      "user_id": "71dd584b-6bc3-49a9-8e99-46af7e626360",
      "username": "Xandras",
      "username_color": "#AD4CFF",
      "persona": "",
      "password_hash": null,
      "email": null,
      "created_at": "2026-01-19T09:02:03.000Z",
      "last_seen_at": "2026-01-19T09:02:03.000Z"
    },
]
const Xan = data[0]
const username = Xan["username"]
</script>

<template>
  <button @click="count++">You clicked me {{ count }} times.</button>


 </template>
<style scoped>

</style>