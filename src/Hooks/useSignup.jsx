import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function useSignup() {
    const navigateTo = useNavigate();

    const signup = (e, signupData, setLoading, setError) => {
        e.preventDefault();
        // eslint-disable-next-line operator-linebreak
        const { fname, lname, username, password, confirmPassword } =
            signupData;
        if (!fname) {
            setLoading(false);
            return setError({
                type: "fname",
                message: "First name cannot be empty",
            });
        }
        if (!lname) {
            setLoading(false);
            return setError({
                type: "lname",
                message: "Last name cannot be empty",
            });
        }
        if (!username) {
            setLoading(false);
            return setError({
                type: "username",
                message: "Username cannot be missing",
            });
        }
        if (!password) {
            setLoading(false);
            return setError({
                type: "password",
                message: "Invalid password",
            });
        }
        if (!confirmPassword) {
            setLoading(false);
            return setError({
                type: "confirmPassword",
                message: "Please confirm your password",
            });
        }

        // Make api call
        const url = `${import.meta.env.VITE_API_URL}/auth/signup`;
        axios
            .post(url, signupData)
            .then(() => navigateTo("/login"))
            .catch((err) => {
                setLoading(false);
                if (err.response) {
                    return setError({
                        type: "api",
                        message: err.response.data.message,
                    });
                }
                setError({ type: "api", message: "Soemthing went wrong!" });
            });
        return true;
    };
    return signup;
}
