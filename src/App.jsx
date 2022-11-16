/* eslint-disable react/jsx-no-constructed-context-values */
import React from "react";
import { Outlet } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import { setAccessToken } from "./accessToken";
// Contexts
import UserContext from "./Contexts/UserContext";
// Components
import Navbar from "./Components/Navbar";
// Requests functions
import { fetchUser, refreshToken } from "./requests/authRequests";
import MySpinner from "./Components/Custom/MySpinner";

function App() {
    const [user, setUser] = React.useState(null);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        // Refresh token
        // eslint-disable-next-line wrap-iife, consistent-return
        (async function setup() {
            const data = await refreshToken();
            if (!data) return setLoading(false);
            setAccessToken(data.accessToken);
            // TODO: fetch user
            const response = await fetchUser();
            setUser(response.data);
            setLoading(false);
        })();
    }, []);

    if (loading) return <MySpinner />;
    return (
        <Box>
            <UserContext.Provider value={{ user, setUser }}>
                <Navbar />
                <React.Suspense fallback={<MySpinner />}>
                    <Outlet />
                </React.Suspense>
            </UserContext.Provider>
        </Box>
    );
}

export default App;
