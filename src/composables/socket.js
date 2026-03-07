import {getSecret, logOut} from "@/composables/login.js";
import {onUnmounted, ref} from "vue";

export function openSocket() {

    const messages = ref([])
    const status = ref('disconnected')
    const currentRoom = ref(null)
    const error = ref(null)
    const members = ref([])
    let socket = null
    let reconnectTimer = null

        function connect() {
            socket = new WebSocket('ws://localhost:8181?client-secret=' + encodeURIComponent(getSecret()));
            // socket = new WebSocket(url)

            socket.onopen = function () {
                status.value = 'connected';
                error.value = null
                if (currentRoom.value) join(currentRoom.value);
            }

            socket.onmessage = ({ data }) => {
                console.log('raw received:', data)
                let msg
                try {
                    msg = JSON.parse(data)
                } catch {
                    console.error('failed to parse msg: ' + data)
                }
                switch (msg.type) {
                    case 'msg':
                        messages.value.push(msg)
                        break
                    case 'joined':
                        currentRoom.value = msg.passRoomID
                        break
                    case 'presence':
                        members.value = msg. members
                        break
                    case 'error':
                        error.value = msg.error
                        break
                    case 'auth':
                        console.log('auth is in')
                        break
                }
            }
            socket.onclose = function () {
                status.value = 'disconnected'
                reconnectTimer = setTimeout(connect, 9000)
            }
            socket.onerror = (e) => {
                error.value = 'connection err'
                console.error('websocket throws an error', e)
            }
        }

    function join(roomID) {
        if (!isReady()) return
        messages.value = []
        members.value = []
        socket.send(JSON.stringify({ type: 'join', roomID }))
    }

    function leave() {
        if (!isReady()) return
        socket.send(JSON.stringify({ type: 'leave' }))
        currentRoom.value = null
        messages.value = []
        members.value = []
    }

    function send(content) {
        if (!isReady()) {
            error.value = 'no connection'
            return
        }
        if (!currentRoom.value) {
            error.value = 'join a room first'
            return
        }
        socket.send(JSON.stringify({ type: 'message', content }))
    }


    function isReady() {
        return socket?.readyState === WebSocket.OPEN
    }

    function disconnect() {
        clearTimeout(reconnectTimer)
        socket?.close()
    }

    connect()
    onUnmounted(disconnect)

    return {
        // state
        messages,
        status,
        currentRoom,
        error,
        members,
        // actions
        join,
        leave,
        send,
        disconnect,
        isReady
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
    //
    // socket.addEventListener('close', () => {
    //     console.log('socket closed');
    //     // logOut()
    // })

}

