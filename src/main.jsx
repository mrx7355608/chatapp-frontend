import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import App from "./App";
import "./assets/main.css";
// Pages
import Home from "./Pages/Home";
// Theme
import myTheme from "./theme";

const Login = React.lazy(() => import("./Pages/Login"));
const Signup = React.lazy(() => import("./Pages/Signup"));

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: "",
        children: [
            {
                element: <Home />,
                index: true,
            },
            {
                path: "/login",
                element: (
                    <React.Suspense fallback={<h1>Loading.....</h1>}>
                        <Login />
                    </React.Suspense>
                ),
            },
            {
                path: "/signup",
                element: (
                    <React.Suspense fallback={<h1>Loading.....</h1>}>
                        <Signup />
                    </React.Suspense>
                ),
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
