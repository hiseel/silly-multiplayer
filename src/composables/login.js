import router from "@/router/index.js";
import Cookies from "js-cookie";
import {GET, POST} from "@/composables/api.js";
import {ref} from "vue";
import axios from "axios";

let secret = ref(null);

export function setSecret(key) {
    secret.value = key;
    // console.log("secret stored: " + key);
    // console.log("cookiesecret stored: " + Cookies.get(key));
}

export function getSecret() {
    // console.log("RETURNING SECRET SET TO " +  JSON.stringify(secret.value));
    return secret.value;
}

export async function checkLoginState() {
    try {
        const secretCookie = Cookies.get('secret')
        // console.log('secretCookie ' + JSON.stringify(secretCookie));
        if (secretCookie) {
            const cookieResponse = await axios.get("/api/checkcookie", {params: {cookie: secretCookie}});
            console.log("cookieResponse: " + JSON.stringify(cookieResponse.data));
            if (cookieResponse.data?.valid === true) {
                console.log("continue session");
                setSecret(secretCookie);
            }
            else {
                console.error("cookie not valid");
                Cookies.remove("secret");
            }
        }
        else{
            console.error("cookie not found");
        }
    }
    catch (err) {
        console.error(err);
    }
}


export async function logOut() {
    const pepega = await getSecret();
    if (pepega) {
        Cookies.remove('secret');
        await POST('/api/users/logout', {params: {secret: pepega}});
        await router.replace('/login');
        window.location.reload();
    }
}

let UUID = null;

export async function GetUserUUID() {
    try {
        // secret = await checkLoginState();
        // console.log(getSecret());
        if (getSecret() === null) {
            console.error("GETUSER RETURNED cookie not found");
        }
        const res = await GET("/api/secure/users/active");

        if (!res) {
            console.error("returning null Inf" + JSON.stringify(res));

        }
        else if (res.success === true) {
            if (res.data.role === "ADMIN") {
                console.log("admin data triggered ", res.data.role);
                return res.data
            }
            console.log("getUUid retuned success ", JSON.stringify(res));
            UUID = res.data.uuid
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

let isAdmin = false;

export async function checkAdmin() {
    try {
        console.log("admin check triggered");
        const UserData = await GetUserUUID();
            if (UserData.role === "ADMIN") {
                console.log("admin user confirmed");
                return isAdmin = true;
            }
            else {
                return isAdmin;
            }
    }
    catch (err) {
        console.error(err);
    }
}
//TODO can't open more than one connection