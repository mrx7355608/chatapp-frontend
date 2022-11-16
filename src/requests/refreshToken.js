const refreshToken = async () => {
    const url = `${import.meta.env.VITE_API_URL}/auth/refresh-token`;
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

export default refreshToken;
