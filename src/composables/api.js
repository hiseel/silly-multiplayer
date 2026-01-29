import axios from "axios";
import {getSecret} from "./login.js";

export async function GET(url) {
    try {
        const response = await axios.get(url, {params: {secret: getSecret()}});
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
            success: false,
        }
    }
}

export async function POST(url, data) {
    try {
        const response = await axios.post(url, {secret:getSecret(), ...data});
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
        const response = await axios.put(url, {secret:getSecret(), ...data});
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
        const response = await axios.delete(url, {params: {secret:getSecret()}});
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