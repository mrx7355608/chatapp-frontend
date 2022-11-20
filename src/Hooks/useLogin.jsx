import axios from "axios";
import { useAuth } from "../Contexts/AuthContext";

export default function useLogin() {
    const { dispatch } = useAuth();
    // eslint-disable-next-line consistent-return
    const login = (loginData) => {
        dispatch({ type: "MAKE_REQUEST" });
        const { username, password } = loginData;
        if (!username) {
            return dispatch({
                type: "LOGIN_ERROR",
                error: { type: "username", message: "Enter a valid username" },
            });
        }
        if (!password) {
            return dispatch({
                type: "LOGIN_ERROR",
                error: { type: "password", message: "Enter a valid password" },
            });
        }

        axios
            .post("http://localhost:4000/auth/login", loginData, {
                withCredentials: true,
            })
            .then((resp) => {
                dispatch({
                    type: "LOGIN",
                    token: resp.data.accessToken,
                });
            })
            .catch((err) => {
                if (err.response) {
                    const { message } = err.response.data;
                    return dispatch({
                        type: "LOGIN_ERROR",
                        error: { type: "api", message },
                    });
                }
                return dispatch({
                    type: "LOGIN_ERROR",
                    error: {
                        type: "api",
                        message: "It seems that the server is down",
                    },
                });
            });
    };

    return login;
}
