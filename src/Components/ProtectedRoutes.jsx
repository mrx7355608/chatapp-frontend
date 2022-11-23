import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../Contexts/AuthContext";

export default function ProtectedRoutes() {
    const { state } = useAuth();
    const navigateTo = useNavigate();
    console.log(state.accessToken);

    return state.accessToken ? <Outlet /> : navigateTo("/login");
}
