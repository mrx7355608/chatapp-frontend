import { redirect } from "react-router-dom";

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
        if (!apiResponse.ok) {
            const apiData = await apiResponse.json();
            errors.apiError = apiData.message;
            return errors;
        }
        return redirect("/");
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
