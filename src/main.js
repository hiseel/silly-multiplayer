import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import {checkLoginState} from "@/composables/login.js";

const app = createApp(App)

await checkLoginState()

app.use(router)
app.mount('#app')
