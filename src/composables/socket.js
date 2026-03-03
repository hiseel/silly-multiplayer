import {getSecret} from "@/composables/login.js";

let socket = null;

export function openSocket() {
    // console.log('testtest')
    socket = new WebSocket('ws://localhost:8181?client-secret=' + encodeURIComponent(getSecret()));
    // console.log("socket connected");
    socket.addEventListener('open', (event) => {

        console.log('sus');
        socket.send('abobus');
    });

    socket.addEventListener("message", (event) => {
        console.log("Message from server ", event.data);
    });
}
