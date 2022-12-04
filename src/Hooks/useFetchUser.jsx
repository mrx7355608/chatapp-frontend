import React from "react";
import { useAuth } from "../Contexts/AuthContext";
import userServices from "../Services/userServices";

export default function useFetchUser(setLoading) {
    const { state, dispatch } = useAuth();

    React.useEffect(() => {
        if (!state.accessToken) return;
        // eslint-disable-next-line
        (async function () {
            try {
                // Fetch user data
                const response = await userServices.fetchUser(
                    state.accessToken
                );
                // Update state
                dispatch({
                    type: "FETCHED_USER",
                    user: response.data.data,
                });
                setLoading(false);
            } catch (err) {
                setLoading(false);
            }
        })();
    }, [state.accessToken]);
}
