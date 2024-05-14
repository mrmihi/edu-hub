import axios from "axios";
import Cookies from "js-cookie";

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_SERVER_URL,
    headers :{
        "Content-Type": "application/json",
    },
});

export const FeedbackApi = async (request) => {
    try {
        const token = Cookies.get("token");
        const response = await axiosInstance.post(`/api/v1/feedback/create`, request,{
            headers: {
                Authorization: `jwt=${token}`,
            },
        });
        if (response.status === 201) {
            return { success: true };
        } else {
            return { success: false, error: response.data.error };
        }
    } catch (error) {
        return { success: false, error: error.message };
    }
}