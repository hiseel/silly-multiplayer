import axios from "axios";
import router from "@/router/index.js";
import Cookies from "js-cookie";
import {ref} from "vue";
import {GET, POST} from "@/composables/api.js";

let secret = null;

export function setSecret(key) {
    secret = key;
    console.log("secret stored: " + key);
    // console.log("cookiesecret stored: " + Cookies.get(key));
}

export function getSecret() {
    // console.log("RETURNING SECRET SET TO " +  JSON.stringify(secret.value));
    return secret;
}

export async function logOut(endSecret) {
    if (secret) {
        Cookies.remove('secret');
        await POST('/api/users/logout', {params: {secret: endSecret}});
        await router.replace('/login');
        window.location.reload();
    }
    else {
        return !secret;
    }
}



let UUID = ref(null)

export async function getUserInf() {
    try {
        if (!secret.value) {
            console.error("GETUSER RETURNED cookie not found");
        }
        const res = await GET("/api/users/active");

        if (!res) {
            console.error("returning null Inf" + JSON.stringify(res));
            return null;
        }
        else if (res.success === true) {
            console.log("getInf retuned success  ??")
            UUID = res.data
            console.log(UUID, "data")
            return UUID
        }
        else if (res.response === 403) {
            console.error("end cookie not found");
        }
        else {
            return new Error("Could not find user information");
         }
    }
    catch (err) {
        console.error(err);
    }
}


export default {
};
