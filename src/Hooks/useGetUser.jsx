/* eslint-disable wrap-iife */
import React from "react";
import { refreshToken, fetchUser } from "../requests/authRequests";
import { setAccessToken } from "../accessToken";

export default function useGetUser(dispatch) {
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(null);

    React.useEffect(() => {
        // Get refresh token
        // eslint-disable-next-line consistent-return
        (async function setup() {
            try {
                // Refresh token
                const data = await refreshToken();
                if (!data) return setLoading(false);
                setAccessToken(data.accessToken);

                // Fetch user
                const response = await fetchUser();
                dispatch({ type: "LOGIN", user: response.data });
                setLoading(false);
            } catch (err) {
                setError(err);
            }
        })();
    }, []);

    return { loading, error };
}
