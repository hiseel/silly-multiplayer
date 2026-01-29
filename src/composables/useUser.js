import { ref } from 'vue'
import {GET} from "@/composables/api.js"

export function useUser() {
    const users = ref(null)
    const loading = ref(false)
    const error = ref(null)

    const fetchUser = async (user_id) => {
        loading.value = true
        try {
            // Calls the "Safe" endpoint
            const res = await GET(`/api/users/${user_id}`)
            users.value = res.data
        } catch (err) {
            error.value = "Could not load user"
        } finally {
            loading.value = false
        }
    }

    return { user: users, loading, error, fetchUser }
}