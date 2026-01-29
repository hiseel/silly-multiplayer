import axios from "axios";
import router from "@/router/index.js";
import Cookies from "js-cookie";
import {ref} from "vue";

let secret = ref(null);

export function setSecret(key) {
    secret = key;
}

export function getSecret() {
    if (!!secret) {
        return secret;
    }
    else {
        return !secret;
    }
}

export async function checkLoginState() {
    try {
        const secretCookie = Cookies.get('secret')
        if (secretCookie) {
            const cookieResponse = await axios.get("/api/checkcookie", {params: {cookie: secretCookie}})
            console.log(cookieResponse.data);
            if (cookieResponse.data?.valid) {
                setSecret(secretCookie);
            }
            else {
                Cookies.remove('secret');
                console.error("cookie not valid");
                await router.push("/login");
            }
        }
        else{
            console.error("cookie not found");
            await router.push("/login");
        }
    }
    catch (err) {
        console.error(err)
    }
}

export default {
};
