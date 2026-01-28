import axios from "axios";
import router from "@/router/index.js";


export let secret = null;

const upassPassed = async (username) => {
    try {
        if (username) {
            // if (!upassCompare) {
            try {
                const postResponse = await axios.post(`/api/users/register`, {
                    username: uusername.value,
                    password: upassword.value,
                })
                console.log(postResponse.data)
                if (postResponse.data) {
                    await router.push("/main");
                }
                else {
                    console.error("user already exists");
                }
            } catch (err) {
                console.error(err)
            }
        } else {
            console.error("Passwords don't match")
        }
        // }
        // else {
        //   console.error("username not provided")
        // }
    }
    catch (error) {
        console.error(error)
    }
}

export default {
    upassPassed,
};
