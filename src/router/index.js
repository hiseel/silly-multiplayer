import { createRouter, createWebHistory } from 'vue-router'

// Import your views
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import SettingsView from "@/views/SettingsView.vue";
import AccountView from "@/views/AccountView.vue";
import testView from "@/views/testView.vue";

const router = createRouter({
    // createWebHistory allows for normal URLs (e.g. example.com/about)
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView
        },
        {
            path: '/about',
            name: 'about',
            component: AboutView
        },
        {
            path: '/settings',
            name: 'settings',
            component: SettingsView, // This component must have its own <RouterView> inside!
            children: [
                {
                    path: 'account',
                    component: AccountView
                }
            ]
        },
        {
            path: '/room/:roomID',
            name: 'room',
            component: testView
        }
    ]
})


export default router