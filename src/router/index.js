import { createRouter, createWebHistory } from 'vue-router'

// Import your views
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import SettingsView from "@/views/SettingsView.vue";
import AccountView from "@/views/AccountView.vue";
import testView from "@/views/testView.vue";
import roomView from "@/views/roomView.vue";
import loginView from "@/views/loginView.vue";
import registerView from "@/views/registerView.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView,
            meta: { hideHeader: true }
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
            path: '/room/:roomId',
            name: 'room',
            component: testView,
            props: true
        },
        {
            path: '/room',
            name: 'rooms',
            component: testView,
            props: true
        },
        {
            path: '/login',
            name: 'login',
            component: loginView,
            props: true,
            meta: { hideHeader: true }
        },
        {
            path: '/registration',
            name: 'registration',
            component: registerView,
            props: true,
            meta: { hideHeader: true }
        },
        {
            path: '/main',
            name: 'main',
            component: testView,
            props: true
        },
        // {
        //     path: '/home',
        //     name: 'home',
        //     component: HomeView,
        //     props: true
        // }
    ]
})


export default router