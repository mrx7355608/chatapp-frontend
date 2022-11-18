import { setAccessToken } from "../accessToken";
import { fetchUser } from "../requests/authRequests";

const loginAction = async ({ request }) => {
    const formData = await request.formData();
    const username = formData.get("username");
    const password = formData.get("password");

    const errors = {};

    if (typeof username !== "string" || username.length < 1) {
        errors.username = "Enter a valid username";
    } else if (typeof password !== "string" || password.length < 1) {
        errors.password = "Enter a valid password";
    }
    if (Object.keys(errors).length) return errors;

    // Login api call
    const url = `${import.meta.env.VITE_API_URL}/auth/login`;
    const options = {
        method: "POST",
        mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
    };
    try {
        // Login user
        const apiResponse = await fetch(url, options);
        const apiData = await apiResponse.json();
        if (!apiResponse.ok) {
            errors.apiError = apiData.message;
            return errors;
        }
        setAccessToken(apiData.accessToken);

        // If everything goes right, then fetch user
        const apiRes = await fetchUser();
        return { user: apiRes.data };
    } catch (err) {
        if (err.name === "TypeError" || err.name === "NetworkError") {
            throw new Response("It seems that the server is down!", {
                status: 503,
            });
        }
        throw new Response("Something went wrong!", { status: 500 });
    }
};

export default loginAction;
