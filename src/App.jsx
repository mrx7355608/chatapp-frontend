import React from "react";
import { Outlet } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
// Contexts
import { useAuth } from "./Contexts/AuthContext";
// Components
import Navbar from "./Components/Main/Navbar";
import MySpinner from "./Components/Custom/MySpinner";
import authServices from "./Services/authServices";
import userServices from "./Services/userServices";
import OutletErrorBoundary from "./Components/Errors/OutletErrorBoundary";

function App() {
    const { state, dispatch } = useAuth();
    const [loading, setLoading] = React.useState(true);

    // Refresh token
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
                    token: response.data.accessToken || undefined,
                    error: {},
                });
            } catch (err) {
                setLoading(false);
            }
        })();
    }, []);

    // Fetch user data
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
