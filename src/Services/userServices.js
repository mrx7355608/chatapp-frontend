import axios from "axios";

const BASE_URL = `${import.meta.env.VITE_API_URL}/user`;
const userServices = {};

userServices.fetchUser = async (accessToken) => {
    const url = BASE_URL;
    const response = await axios.get(url, {
        headers: { authorization: `Bearer ${accessToken}` },
    });
    return response;
};

export default userServices;
