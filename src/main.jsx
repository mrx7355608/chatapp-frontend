import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import App from "./App";
import "./assets/main.css";
// Theme
import myTheme from "./theme";
// Components
import MySpinner from "./Components/Custom/MySpinner";
// Pages
import RootErrorBoundary from "./Components/Errors/RootErrorBoundary";
// actions
import signupAction from "./actions/signup";
import loginAction from "./actions/login";

const Login = React.lazy(() => import("./Pages/Login"));
const Signup = React.lazy(() => import("./Pages/Signup"));
const Room = React.lazy(() => import("./Pages/Room"));
const Home = React.lazy(() => import("./Pages/Home"));

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <RootErrorBoundary />,
        children: [
            {
                element: <Home />,
                index: true,
            },
            {
                path: "/login",
                action: loginAction,
                element: (
                    <React.Suspense fallback={<MySpinner />}>
                        <Login />
                    </React.Suspense>
                ),
            },
            {
                path: "/signup",
                action: signupAction,
                element: (
                    <React.Suspense fallback={<MySpinner />}>
                        <Signup />
                    </React.Suspense>
                ),
            },
            {
                path: "/room",
                element: (
                    <React.Suspense fallback={<MySpinner />}>
                        <Room />
                    </React.Suspense>
                ),
            },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    // <React.StrictMode>
    <ChakraProvider theme={myTheme}>
        <RouterProvider router={router} />
    </ChakraProvider>
    // </React.StrictMode>
);
