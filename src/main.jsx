import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import App from "./App";
import "./assets/main.css";
// Contexts
import { AuthProvider } from "./Contexts/AuthContext";
// Theme
import myTheme from "./theme";
// Pages
import RootErrorBoundary from "./Components/Errors/RootErrorBoundary";

const Login = React.lazy(() => import("./Pages/Login"));
const Signup = React.lazy(() => import("./Pages/Signup"));
const Room = React.lazy(() => import("./Pages/Room"));
const Home = React.lazy(() => import("./Pages/Home"));

const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <AuthProvider>
                <App />
            </AuthProvider>
        ),
        errorElement: <RootErrorBoundary />,
        children: [
            {
                element: <Home />,
                index: true,
            },
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/signup",
                element: <Signup />,
            },
            {
                path: "/room",
                element: <Room />,
            },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <ChakraProvider theme={myTheme}>
            <RouterProvider router={router} />
        </ChakraProvider>
    </React.StrictMode>
);
