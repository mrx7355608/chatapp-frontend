import axios from "axios";
import { useToast } from "@chakra-ui/react";
import { useAuth } from "../Contexts/AuthContext";

export default function useLogout() {
    const toast = useToast();
    const { dispatch } = useAuth();

    const logout = () => {
        const url = `${import.meta.env.VITE_API_URL}/auth/logout`;
        axios
            .post(url, null, { withCredentials: true })
            .then(() => {
                dispatch({
                    type: "LOGOUT",
                });
            })
            .catch(() => {
                // show toast
                toast({
                    title: "There was a problem while logging out",
                    status: "error",
                    isClosable: true,
                    duration: 3000,
                });
            });
    };

    return logout;
}
