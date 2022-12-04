import React from "react";
import { useAuth } from "../Contexts/AuthContext";
import authServices from "../Services/authServices";

export default function useGetNewAccessToken() {
    const { dispatch } = useAuth();

    React.useEffect(() => {
        setTimeout(async () => {
            console.log("new");
            const response = await authServices.refreshToken();
            if (!response.data.accessToken) return;
            dispatch({
                type: "REFRESHED_TOKEN",
                token: response.data.accessToken,
                error: {},
            });
        }, 40000);
    }, []);
}
