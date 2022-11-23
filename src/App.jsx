/* eslint-disable react/jsx-no-constructed-context-values */
import React from "react";
import axios from "axios";
import { Outlet } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
// Contexts
import { useAuth } from "./Contexts/AuthContext";
// Components
import Navbar from "./Components/Navbar";
import MySpinner from "./Components/Custom/MySpinner";
import OutletErrorBoundary from "./Components/Errors/OutletErrorBoundary";

function App() {
    const [loading, setLoading] = React.useState(true);
    const { state, dispatch } = useAuth();

    // Refresh token
    React.useEffect(() => {
        const url = `${import.meta.env.VITE_API_URL}/auth/refresh-token`;
        axios
            .post(url, null, { withCredentials: true })
            .then((resp) => {
                dispatch({
                    type: "REFRESHED_TOKEN",
                    token: resp.data.accessToken || undefined,
                    error: {},
                });
            })
            .catch(() => null);
    }, []);

    // Fetch user data
    // eslint-disable-next-line consistent-return
    React.useEffect(() => {
        if (!state.accessToken) return setLoading(false);
        const url = `${import.meta.env.VITE_API_URL}/user`;
        axios
            .get(url, {
                headers: { authorization: `Bearer ${state.accessToken}` },
            })
            .then((resp) => {
                setLoading(false);
                dispatch({
                    type: "FETCHED_USER",
                    user: resp.data.data,
                });
            })
            .catch(() => null);
    }, [state.accessToken]);

    if (loading) return <MySpinner />;

    return (
        <>
            <Navbar />
            <ErrorBoundary FallbackComponent={OutletErrorBoundary}>
                <React.Suspense fallback={<MySpinner />}>
                    <Outlet />
                </React.Suspense>
            </ErrorBoundary>
        </>
    );
}

export default App;
