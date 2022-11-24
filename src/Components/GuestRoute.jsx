import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../Contexts/AuthContext";

export default function GuestRoutes() {
    console.log("GUEST ROUTE");
    const { state } = useAuth();
    const navigateTo = useNavigate();

    return state.accessToken ? navigateTo("/") : <Outlet />;
}
