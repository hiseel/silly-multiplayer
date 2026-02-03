import axios from "axios";

const baseURL = "http://localhost:8184";

export async function GET(url) {
    try {
        const response = await axios.get(baseURL + url);
        if (response.status === 200) {
            return {
                success: true,
                data: response.data,
            }
        }
        else {
            return {
                success: false,
            }
        }
    }
    catch (error) {
        return {
            data: "response error " + error,
        }
    }
}

export async function POST(url, data) {
    try {
        const response = await axios.post(baseURL + url, data);
        if (response.status >= 200 && response.status < 300) {
            return {
                success: true,
                data: response.data,
            }
        }
        else {
            return {
                success: false,
            }
        }
    }
    catch (error) {
        return {
            success: false,
        }
    }
}

export async function PUT(url, data) {
    try {
        const response = await axios.put(baseURL + url, data);
        if (response.status >= 200 && response.status < 300) {
            return {
                success: true,
                data: response.data,
            }
        }
        else {
            return {
                success: false,
            }
        }
    }
    catch (error) {
        return {
            success: false,
        }
    }
}

export async function DELETE(url) {
    try {
        const response = await axios.delete(baseURL + url);
        if (response.status >= 200 && response.status < 300) {
            return {
                success: true,
                data: response.data,
            }
        }
        else {
            return {
                success: false,
            }
        }
    }
    catch (error) {
        return {
            success: false,
        }
    }
}

export default {

}