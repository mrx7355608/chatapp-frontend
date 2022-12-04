import React from "react";
import { useAuth } from "../Contexts/AuthContext";
import authServices from "../Services/authServices";

export default function useRefreshToken(setLoading) {
    const { dispatch } = useAuth();

    React.useEffect(() => {
        // eslint-disable-next-line
        (async function () {
            try {
                // Fetch new access token
                const response = await authServices.refreshToken();
                // If access token is not sent by the server then return;
                // It means that the user is not logged in
                // or the refresh token is  not present or invalid
                if (!response.data.accessToken) return setLoading(false);
                // Update auth state
                dispatch({
                    type: "REFRESHED_TOKEN",
                    token: response.data.accessToken,
                    error: {},
                });
            } catch (err) {
                setLoading(false);
            }
        })();
    }, []);
}
