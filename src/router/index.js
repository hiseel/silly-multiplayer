import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import SettingsView from "@/views/SettingsView.vue";
import AccountView from "@/views/AccountView.vue";
import ChatAreaView from "@/views/chatAreaView.vue";
import loginView from "@/views/loginView.vue";
import registerView from "@/views/registerView.vue";
import mainView from "@/views/mainView.vue";

import {checkAdmin, getSecret} from "@/composables/login.js";
import AdminView from "@/views/AdminView.vue";
import adminView from "@/views/AdminView.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'main',
            component: mainView,
        },
        {
            path: '/about',
            name: 'about',
            component: AboutView,
        },
        {
            path: '/settings',
            name: 'settings',
            component: SettingsView,
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
            component: ChatAreaView,
            props: true,
        },
        {
            path: '/room',
            name: 'rooms',
            component: ChatAreaView,
            props: true,
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
            path: '/welcome',
            name: 'welcome',
            component: HomeView,
            props: true,
            meta: { hideHeader: true }
        },
        {
            path: '/admin',
            name: 'admin',
            component: AdminView,
            meta: { requiresAdmin: true },
            children: [

            ]
        },
        {
            path: '/users/:user_id',
            name: 'users',
            component: AccountView,
        },
    ]
});



router.beforeEach(async function (to, from) {
    const secret = getSecret();
    const isadmin = await checkAdmin();
    console.log('beforeEach', to.path + ' - Auth: ' + secret + ' - ' + isadmin);
    if ((to.path === '/login' || to.path === 'login') || (to.path === '/welcome' ||  to.path === 'welcome') || (to.path === '/registration' || to.path === 'registration')) {
        if (secret) {
            console.log('ALL GOOD');
            return;
        }
        return;
    }
    if (to.meta.requiresAdmin && !isadmin) {
        return '/';
    }
    if (!secret) {
        return '/welcome';
    }
})

export default router