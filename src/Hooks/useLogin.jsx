import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Contexts/AuthContext";

export default function useLogin() {
    const { dispatch } = useAuth();
    const navigateTo = useNavigate();

    // eslint-disable-next-line consistent-return
    const login = (loginData) => {
        // Shows loading state
        dispatch({ type: "MAKE_REQUEST" });

        const { username, password } = loginData;
        // Invalid data error handling
        if (!username) {
            return dispatch({
                type: "LOGIN",
                accessToken: undefined,
                error: { type: "username", message: "Enter a valid username" },
            });
        }
        if (!password) {
            return dispatch({
                type: "LOGIN",
                accessToken: undefined,
                error: { type: "password", message: "Enter a valid password" },
            });
        }

        // Making request
        axios
            .post("http://localhost:4000/auth/login", loginData, {
                withCredentials: true,
            })
            .then((resp) => {
                // If request is successfull then update token
                dispatch({
                    type: "LOGIN",
                    token: resp.data.accessToken,
                    error: {},
                });

                return navigateTo("/");
            })
            .catch((err) => {
                const dispatchAction = {
                    type: "LOGIN",
                    accessToken: undefined,
                };

                // If api returns an error
                if (err.response) {
                    const { message } = err.response.data;
                    return dispatch({
                        ...dispatchAction,
                        error: { type: "api", message },
                    });
                }

                // If there is some server related error
                const message = "It seems that the server is down";
                return dispatch({
                    ...dispatchAction,
                    error: { type: "api", message },
                });
            });
    };

    return login;
}
