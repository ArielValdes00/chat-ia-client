import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const createChat = async (userId: number) => {
    try {
        const res = await axios.post(`${API_URL}/chat`, { userId }, {
            withCredentials: true,
        });
        return res.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return error.response?.status;
        } else {
            console.error(error);
            throw error;
        }
    }
};

export const addMessage = async (chatId: number, formData: any) => {
    try {
        const res = await axios.post(`${API_URL}/chat/${chatId}/messages`, formData, {
            withCredentials: true
        });
        return res.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Error response:', error.response);
            return error.response?.status;
        } else {
            console.error(error);
            throw error;
        }
    }
};

export const getChats = async (userId: number) => {
    try {
        const res = await axios.get(`${API_URL}/chat/${userId}`, {
            withCredentials: true
        });

        return res.data;
    } catch (error) {
        console.error(error)
    }
};

export const deleteChats = async (userId: number) => {
    try {
        const res = await axios.delete(`${API_URL}/chat/${userId}`, {
            withCredentials: true
        });

        return res.data;
    } catch (error) {
        console.log(error)
    }
};