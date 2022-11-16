let accessToken = "";

const getAccessToken = () => accessToken;
const setAccessToken = (token) => {
    accessToken = token;
};

export { setAccessToken, getAccessToken };
