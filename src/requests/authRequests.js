import axios from "axios";
import { getAccessToken } from "../accessToken";

const API_URL = import.meta.env.VITE_API_URL;

const fetchUser = async () => {
    const url = `${API_URL}/user`;
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

const refreshToken = async () => {
    const url = `${API_URL}/auth/refresh-token`;
    const options = {
        method: "POST",
        mode: "cors",
        credentials: "include",
    };
    const response = await fetch(url, options);
    if (!response.ok) return null;
    const data = await response.json();
    return data;
};

const logoutUser = async () => {
    const url = `${API_URL}/auth/logout`;
    const options = {
        method: "POST",
        mode: "cors",
        credentials: "include",
    };
    const response = await fetch(url, options);
    if (!response.ok) return false;
    return true;
};

export { fetchUser, refreshToken, logoutUser };
