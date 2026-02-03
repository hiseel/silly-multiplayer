import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import SettingsView from "@/views/SettingsView.vue";
import AccountView from "@/views/AccountView.vue";
import testView from "@/views/testView.vue";
import loginView from "@/views/loginView.vue";
import registerView from "@/views/registerView.vue";
import mainView from "@/views/mainView.vue";

import {getSecret} from "@/composables/login.js";

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
            component: testView,
            props: true,
        },
        {
            path: '/room',
            name: 'rooms',
            component: testView,
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
        }
    ]
});



router.beforeEach(async function (to, from) {
    const FUNsecret = getSecret();
    console.log('beforeEach', to.path + ' - Auth: ' + FUNsecret);
    if ((to.path === '/login' || to.path === 'login') || (to.path === '/welcome' ||  to.path === 'welcome') || (to.path === '/register' || to.path === 'register')) {
        if (FUNsecret) {
            return '/';
        }
        return;
    }
    if (!FUNsecret) {
        return '/welcome';
    }
})

export default router