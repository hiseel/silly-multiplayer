import { createRouter, createWebHistory } from 'vue-router'

// Import your views
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import SettingsView from "@/views/SettingsView.vue";
import AccountView from "@/views/AccountView.vue";

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
            component: SettingsView, // This component must have its own <RouterView> inside!
            children: [
                {
                    path: 'profile',
                    component: 'null'
                },
                {
                    path: 'account',
                    component: AccountView
                }
            ]
        }
    ]
})


export default router