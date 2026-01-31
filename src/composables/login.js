import axios from "axios";
import router from "@/router/index.js";
import Cookies from "js-cookie";
import {ref} from "vue";
import {GET, POST} from "@/composables/api.js";

const secret = ref(null);

export function setSecret(key) {
    secret.value = key;
    console.log("secret stored: " + key);
    // console.log("cookiesecret stored: " + Cookies.get(key));
}

export async function getSecret() {
    try {
        if (!secret.value) {
            console.error("Secret not found.");
            // await router.push("/login");
            return null
        }
        else {
            console.log("RETURNING SECRET SET TO " +  JSON.stringify(secret.value));
            return secret.value;
        }
    }
    catch (error) {
        console.error(error);
    }
}

export async function logOut(endSecret) {
    if (!!secret) {
        Cookies.remove('secret');
        await POST('/api/users/logout', {params: {secret: endSecret}});
        await router.replace('/login');
        window.location.reload();
    }
    else {
        return !secret;
    }
}

export async function checkLoginState() {
    try {
        const secretCookie = Cookies['get']('secret')
        // secret = secretCookie;

        console.log('secretCookie ' + JSON.stringify(secretCookie));
        if (secretCookie) {
            const cookieResponse = await axios.get("/api/checkcookie", {params: {cookie: secretCookie}});
            console.log("cookieResponse: " + JSON.stringify(cookieResponse.data));
            if (cookieResponse.data?.valid === true) {
                console.log("continue session");
                setSecret(secretCookie);
                await router.replace("/");
            }
            else {
                // Cookies.remove('secret');
                console.error("cookie not valid");
                await router.push("/login");
            }
        }
        else{
            // Cookies.remove('secret');
            console.error("cookie not found");
            await router.push("/login");
        }
    }
    catch (err) {
        console.error(err)
    }
}

let UUID = ref(null)

export async function getUserInf() {
    try {
        const res = await GET("/api/users/active");
        if (!secret.value) {
            console.error("GETUSER RETURNED cookie not found");
        }
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
            await router.push("/login");
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
