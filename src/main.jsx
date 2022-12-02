import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App";
import "./assets/main.css";
// Contexts
import { AuthProvider } from "./Contexts/AuthContext";
// Pages
import RootErrorBoundary from "./Components/Errors/RootErrorBoundary";
// import GuestRoutes from "./Components/GuestRoute";
// import ProtectedRoutes from "./Components/ProtectedRoutes";
import RoomProvider from "./Contexts/RoomContext";
import SocketProvider from "./Contexts/SocketContext";
import { ChakraProvider } from "@chakra-ui/react";

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
                element: <Login />,
            },
            {
                path: "/signup",
                element: <Signup />,
            },
            {
                path: "/room/:roomid",
                element: (
                    <RoomProvider>
                        <SocketProvider>
                            <Room />
                        </SocketProvider>
                    </RoomProvider>
                ),
            },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <ChakraProvider>
        <AuthProvider>
            <RouterProvider router={router} />
        </AuthProvider>
    </ChakraProvider>
);
