import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Contexts/AuthContext";

export default function useIsLoggedIn() {
    const navigateTo = useNavigate();
    const { state } = useAuth();
    React.useEffect(() => {
        if (state.accessToken) {
            navigateTo("/");
        }
    }, []);
}
