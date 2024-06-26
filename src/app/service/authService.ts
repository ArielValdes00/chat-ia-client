import axios from "axios";
import Cookies from 'js-cookie';

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
const jwt = Cookies.get('jwt');

export const getUser = async () => {
    try {

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

