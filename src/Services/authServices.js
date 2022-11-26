import axios from "axios";

const BASE_URL = `${import.meta.env.VITE_API_URL}/auth`;
const authServices = {};

authServices.refreshToken = async () => {
    const url = `${BASE_URL}/refresh-token`;
    const response = await axios.post(url, null, { withCredentials: true });
    return response;
};

export default authServices;
