import React from "react";
import { setInterval, clearInterval } from "worker-timers";
import { useAuth } from "../Contexts/AuthContext";
import authServices from "../Services/authServices";

export default function useGetNewAccessToken() {
    const { dispatch } = useAuth();

    React.useEffect(() => {
        const time = setInterval(async () => {
            const response = await authServices.refreshToken();
            if (!response.data.accessToken) return;
            dispatch({
                type: "REFRESHED_TOKEN",
                token: response.data.accessToken,
                error: {},
            });
        }, 480000);
        return () => clearInterval(time);
    }, []);
}
