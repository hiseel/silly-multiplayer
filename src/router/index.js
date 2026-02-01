import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import SettingsView from "@/views/SettingsView.vue";
import AccountView from "@/views/AccountView.vue";
import testView from "@/views/testView.vue";
import loginView from "@/views/loginView.vue";
import registerView from "@/views/registerView.vue";
import mainView from "@/views/mainView.vue";
import {getSecret, setSecret} from "@/composables/login.js";
import Cookies from "js-cookie";
import axios from "axios";


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
})

export async function checkLoginState() {
    try {
        const secret = getSecret()
        if (secret) {
            return secret
        }
        const secretCookie = Cookies.get('secret')
        console.log('secretCookie ' + JSON.stringify(secretCookie));
        if (secretCookie) {
            const cookieResponse = await axios.get("/api/checkcookie", {params: {cookie: secretCookie}});
            console.log("cookieResponse: " + JSON.stringify(cookieResponse.data));
            if (cookieResponse.data?.valid === true) {
                console.log("continue session");
                setSecret(secretCookie);
                return secretCookie;
            }
            else {
                console.error("cookie not valid");
            }
        }
        else{
            console.error("cookie not found");
        }
    }
    catch (err) {
        console.error(err)
    }
}

router.beforeEach(async function (to, from) {
    const secret = await checkLoginState();
    console.log('beforeEach', to.path + ' - Auth: ' + secret);
    if ((to.path === '/login' || to.path === 'login') || (to.path === '/welcome' ||  to.path === 'welcome') || (to.path === '/register' || to.path === 'register')) {
        if (secret) {
            return '/';
        }
        return;
    }
    if (!secret) {
        return '/welcome';
    }
})

export default router