import axios from "axios";
import Cookies from 'js-cookie';

const API_URL = process.env.NEXT_PUBLIC_FRONTEND_URL;

export const getUser = async () => {
    try {
        const jwt = Cookies.get('jwt');

        const res = await axios.get(`${API_URL}/user`, {
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        });
        return res.data;
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            return error.response?.status;
        } else {
            console.error(error);
        }
    }
};

