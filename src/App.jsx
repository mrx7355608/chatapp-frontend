/* eslint-disable react/jsx-no-constructed-context-values */
import React from "react";
import { Outlet } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
// Contexts
import { useAuth } from "./Contexts/AuthContext";
// Components
import Navbar from "./Components/Navbar";
import OutletErrorBoundary from "./Components/Errors/OutletErrorBoundary";
import MySpinner from "./Components/Custom/MySpinner";

function App() {
    const { state, dispatch } = useAuth();

    React.useEffect(() => {
        // TODO: Fetch user
        console.log("Fetching user...");
    }, [state.accessToken]);

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
