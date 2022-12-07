import { useToast } from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Contexts/AuthContext";

export default function useIsLoggedIn() {
    const toast = useToast();
    const navigateTo = useNavigate();
    const { state } = useAuth();

    React.useEffect(() => {
        if (state.accessToken) {
            toast({
                title: "Where are you going my friend 👀",
                isClosable: true,
                duration: 5000,
                status: "info",
                variant: "subtle",
            });
            navigateTo("/");
        }
    }, []);
}
