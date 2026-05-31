import {getSecret, logOut} from "@/composables/login.js";
import {onUnmounted, ref} from "vue";

export function openSocket() {
    if (isReady()) {
        return;
    }
    // socket.addEventListener('open', (event) => {
    //     console.log('socket opened');
    //     socket.send('open confirmed');
    // });

    // socket.addEventListener('auth', (event) => {
    //     console.log('socket auth success');
    // })

    // socket.addEventListener("message", async (event) => {
    //     const text = event.data instanceof Blob
    //         ? await event.data.text()
    //         : event.data;
    //     console.log("Message from server ", JSON.parse(text));
    // });

    // socket.addEventListener('close', () => {
    //     console.log('socket closed');
    //     // logOut()
    // })
    socket = new WebSocket('ws://localhost:8181?client-secret=' + encodeURIComponent(getSecret()));
    console.log('attemtping to open ws')
    // socket = new WebSocket(url)


    socket.onopen = function () {
        status.value = 'connected';
        console.log('open ws')
    }

    socket.onmessage = ({ data }) => {
        // console.log('raw received:', data)
        let msg
        try {
            msg = JSON.parse(data)
        } catch {
            console.error('failed to parse msg: ' + data)
        }
        switch (msg.type) {
            case 'usermsg':
                if (userListener) {
                    userListener(msg)
                }
                // messages.value.push(msg)
                break
            case 'error':
                console.error('msg error ', msg.error)
                break
            case 'auth':
                console.log('auth is in')
                //TODO handle auth errors
                break
        }
    }
    socket.onclose = function () {
        status.value = 'disconnected'
        reconnectTimer = setTimeout(openSocket, 9000)
    }
    socket.onerror = (e) => {
        console.error('websocket throws an error', e)
    }
}



export const status = ref('connecting')
// const error = ref(null)
let socket = null
let userListener = null
let reconnectTimer = null

export function setUserListener(listener) {
    userListener = listener
}

export function send(content) {
    if (!isReady()) {
        console.error('no connection')
        return
    }
    socket.send(JSON.stringify( content ))
}

export function isReady() {
    return socket?.readyState === WebSocket.OPEN
}

export function disconnect() {
    clearTimeout(reconnectTimer)
    socket?.close()
}

