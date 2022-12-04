import React from "react";
import { Outlet } from "react-router-dom";

// Components
import Navbar from "./Components/Main/Navbar";
import MySpinner from "./Components/Custom/MySpinner";

// Hooks
import useGetNewAccessToken from "./Hooks/useGetNewAccessToken";
import useRefreshToken from "./Hooks/useRefreshToken";
import useFetchUser from "./Hooks/useFetchUser";

function App() {
    const [loading, setLoading] = React.useState(true);

    // Refresh token on page reload
    useRefreshToken(setLoading);
    // Fetch user data
    useFetchUser(setLoading);
    // set timeout to get access token
    useGetNewAccessToken(setLoading);

    if (loading) return <MySpinner />;

    return (
        <>
            <Navbar />
            <React.Suspense fallback={<MySpinner />}>
                <Outlet />
            </React.Suspense>
        </>
    );
}

export default App;
