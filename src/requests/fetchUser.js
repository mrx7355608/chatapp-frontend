import { getAccessToken } from "../accessToken";

const fetchUser = async () => {
    const url = `${import.meta.env.VITE_API_URL}/user`;
    const options = {
        mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getAccessToken()}`,
        },
    };
    const response = await fetch(url, options);
    if (!response.ok) return null;
    const data = await response.json();
    return data;
};

export default fetchUser;
