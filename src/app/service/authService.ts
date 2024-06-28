import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const getUser = async () => {
    try {
        const res = await axios.get(`${API_URL}/user`, {
            withCredentials: true
        });
        return res.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return error.response?.status;
        } else {
            console.error(error);
        }
    }
};

export const verifySession = async () => {
    try {
        const res = await axios.get(`${API_URL}/auth/verify`, {
            withCredentials: true
        });
        return res.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return error.response?.status;
        } else {
            console.error(error);
        }
    }
};

export const removeCookie = async () => {
    try {
        const res = await axios.get(`${API_URL}/auth/logout`, {
            withCredentials: true
        });
        return res.data
    } catch (error) {
        console.error(error);
    }
};
