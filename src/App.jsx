/* eslint-disable react/jsx-no-constructed-context-values */
import React from "react";
import { Outlet } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
// Contexts
import { AuthProvider } from "./Contexts/AuthContext";
// Components
import Navbar from "./Components/Navbar";
import OutletErrorBoundary from "./Components/Errors/OutletErrorBoundary";
// Requests functions
import MySpinner from "./Components/Custom/MySpinner";

function App() {
    return (
        <AuthProvider>
            <Navbar />
            <ErrorBoundary FallbackComponent={OutletErrorBoundary}>
                <React.Suspense fallback={<MySpinner />}>
                    <Outlet />
                </React.Suspense>
            </ErrorBoundary>
        </AuthProvider>
    );
}

export default App;
