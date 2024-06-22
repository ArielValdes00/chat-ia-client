import axios from "axios";
import Cookies from 'js-cookie';

const API_URL = "http://localhost:4000";
const jwt = Cookies.get('jwt');

export const createChat = async (userId: number) => {
    try {
        const res = await axios.post(`${API_URL}/chat`, { userId }, {
            headers: {
                Authorization: `Bearer ${jwt}`
            },
        });
        return res.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Error response:', error.response);
            return error.response?.status;
        } else {
            console.error('Unknown error:', error);
            throw error;
        }
    }
};

export const addMessage = async (chatId: number, formData: any) => {
    try {
        const res = await axios.post(`${API_URL}/chat/${chatId}/messages`, formData, {
            headers: {
                Authorization: `Bearer ${jwt}`
            },
        });
        return res.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Error response:', error.response);
            return error.response?.status;
        } else {
            console.error('Unknown error:', error);
            throw error;
        }
    }
};

export const getChats = async (userId: number) => {
    try {
        const res = await axios.get(`${API_URL}/chat/${userId}`, {
            headers: {
                Authorization: `Bearer ${jwt}`
            },
        });
        
        return res.data;
    } catch (error) {
        console.log(error)
    }
};

export const deleteChats = async (userId: number) => {
    try {
        const res = await axios.delete(`${API_URL}/chat/${userId}`, {
            headers: {
                Authorization: `Bearer ${jwt}`
            },
        });
        
        return res.data;
    } catch (error) {
        console.log(error)
    }
};