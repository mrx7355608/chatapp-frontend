import { setAccessToken } from "../accessToken";
import { fetchUser } from "../requests/authRequests";

const loginAction = async ({ request }) => {
    const formData = await request.formData();
    const username = formData.get("username");
    const password = formData.get("password");

    const errors = {};

    if (typeof username !== "string") {
        errors.username = "Enter a valid username";
    } else if (typeof password !== "string") {
        errors.password = "Enter a valid password";
    }

    if (Object.keys(errors).length) return errors;

    // Login api call
    try {
        const userData = {
            username,
            password,
        };
        const url = `${import.meta.env.VITE_API_URL}/auth/login`;
        const options = {
            method: "POST",
            mode: "cors",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        };
        const apiResponse = await fetch(url, options);
        const apiData = await apiResponse.json();
        if (!apiResponse.ok) {
            errors.apiError = apiData.message;
            return errors;
        }
        setAccessToken(apiData.accessToken);
        const apiRes = await fetchUser();
        return { user: apiRes.data };
    } catch (err) {
        if (err.name === "TypeError") {
            throw new Response("It seems that the server is down!", {
                status: 500,
            });
        }
        throw new Response("Something went wrong!", { status: 500 });
    }
};

export default loginAction;
