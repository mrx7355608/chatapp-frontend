/* eslint-disable react/jsx-no-constructed-context-values */
import React from "react";
import { Outlet } from "react-router-dom";
// Contexts
import { AuthProvider } from "./Contexts/AuthContext";
// Components
import Navbar from "./Components/Navbar";
// Requests functions
import MySpinner from "./Components/Custom/MySpinner";

function App() {
    return (
        <AuthProvider>
            <Navbar />
            <React.Suspense fallback={<MySpinner />}>
                <Outlet />
            </React.Suspense>
        </AuthProvider>
    );
}

export default App;
